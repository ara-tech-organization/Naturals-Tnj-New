import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Set on an element once it has been revealed. */
const DONE = "data-revealed";
const PENDING = `[data-reveal]:not([${DONE}])`;

/**
 * Scroll-reveal driver.
 *
 * A single IntersectionObserver watches every `[data-reveal]` element and marks
 * it once, unobserving it immediately — so there is no work left behind after
 * an element has appeared, and no scroll listener at any point.
 *
 * A MutationObserver picks up elements that mount later (the gallery filter,
 * for instance, swaps whole groups in and out). Without it those items would
 * mount already past the fold, never intersect, and stay hidden.
 *
 * The revealed state is a data attribute, NOT a class, and that matters. These
 * elements set `className` from React props, so React owns their `class`
 * attribute outright: any later re-render rewrites `class` from the prop and
 * would wipe a class added here. The element had already been unobserved, so
 * nothing would ever add it back — leaving it stuck hidden forever, which for
 * `data-reveal="clip"` means completely invisible rather than merely faded.
 * React never renders `data-revealed`, so it is not part of its attribute diff
 * and survives every re-render.
 */
export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noIO = typeof IntersectionObserver === "undefined";

    // No IO, or the reader has asked for no motion: show everything and keep
    // showing anything that mounts later.
    if (reduced || noIO) {
      const showAll = () =>
        document.querySelectorAll(PENDING).forEach((n) => n.setAttribute(DONE, ""));

      showAll();
      if (typeof MutationObserver === "undefined") return undefined;
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute(DONE, "");
          io.unobserve(entry.target);
        });
      },
      {
        // Fire a little before the element reaches the fold, so the motion has
        // resolved by the time it is properly in view.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    const scan = () => document.querySelectorAll(PENDING).forEach((n) => io.observe(n));

    scan();

    /**
     * Safety net. Once the page has settled, anything still unrevealed that is
     * already at or above the fold gets revealed outright.
     *
     * The observer should have covered these, but a missed callback, a layout
     * that changed after observation, or an element revealed and then wiped by
     * a re-render would otherwise leave content permanently invisible — and for
     * a clip reveal that means a blank hole where a photograph should be.
     * Losing one animation is a much cheaper failure than losing the content.
     */
    const sweep = () => {
      const fold = window.innerHeight || 0;
      document.querySelectorAll(PENDING).forEach((n) => {
        if (n.getBoundingClientRect().top < fold) n.setAttribute(DONE, "");
      });
    };
    const settle = window.setTimeout(sweep, 1600);

    if (typeof MutationObserver === "undefined") {
      return () => {
        window.clearTimeout(settle);
        io.disconnect();
      };
    }

    // Re-scan on DOM changes. Observing is idempotent, so re-offering an
    // element already being watched is harmless.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(settle);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);
}
