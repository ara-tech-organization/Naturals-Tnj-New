import { useEffect } from "react";

/**
 * SCROLL + POINTER MOTION
 *
 * Both hooks here write CSS custom properties and nothing else — no React
 * state, so no re-render is ever triggered by a mouse move or a scroll frame.
 * The CSS decides what to do with the number, which keeps the motion design in
 * the stylesheet where the rest of the design lives.
 *
 * Both are inert under `prefers-reduced-motion`, and the properties they write
 * default to a neutral value in CSS, so a hook that never runs leaves the
 * section looking exactly like its resting state.
 */

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Writes `--p`: how far the element has travelled through the viewport, from 0
 * (top edge just entering at the bottom) to 1 (bottom edge just leaving at the
 * top). Parallax layers read it as `calc((var(--p) - 0.5) * <distance>)`.
 *
 * The scroll listener is gated behind an IntersectionObserver, so a page with
 * six parallax sections still only computes the one or two on screen.
 */
export function useScrollProgress(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || typeof IntersectionObserver === "undefined") return undefined;

    let frame = 0;
    let visible = false;

    const write = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Guard the divisor: an element taller than any sane page still has a
      // positive height, but a collapsed one would divide by zero.
      const span = vh + rect.height || 1;
      const p = (vh - rect.top) / span;
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    };

    const request = () => {
      if (!frame && visible) frame = requestAnimationFrame(write);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) write();
      },
      { rootMargin: "15% 0px" },
    );

    io.observe(el);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    write();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}

/**
 * Writes `--px` / `--py`: pointer position normalised to -0.5 … 0.5 of the
 * viewport, for layered depth. Does nothing on touch devices, where there is no
 * pointer to follow and the listener would only cost battery.
 */
export function usePointerDepth(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };

    const onMove = (e) => {
      px = e.clientX / window.innerWidth - 0.5;
      py = e.clientY / window.innerHeight - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
