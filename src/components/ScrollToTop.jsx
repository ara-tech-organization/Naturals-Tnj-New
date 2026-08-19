import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isKnownSection } from "../data/sections";

/**
 * Router pages keep the previous scroll position by default. Reset to the top
 * on navigation — unless the URL names a section, in which case scroll that
 * section into view once it has mounted.
 *
 * Sections travel as a path segment (/services/mens-cuts-styling), not a
 * fragment. Old fragment URLs are rewritten to the path form in place, so a
 * bookmark or an indexed /services#mens-cuts-styling still lands correctly
 * and leaves the canonical URL in the address bar. A hash that is not a known
 * section — the #main skip link — is left alone and simply scrolled to.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const lastBase = useRef(null);

  useEffect(() => {
    const [, base = "", section = ""] = pathname.split("/");
    const fragment = hash ? hash.slice(1) : "";

    if (fragment && isKnownSection(`/${base}`, fragment)) {
      navigate(`/${base}/${fragment}`, { replace: true });
      return undefined;
    }

    const targetId = fragment || section;

    // Moving between sections of the page you are already on should glide;
    // arriving from another route should not animate a page-length scroll.
    const samePage = lastBase.current === base;
    lastBase.current = base;

    if (!targetId) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
      return undefined;
    }

    // Wait a frame so the target element exists before scrolling to it.
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      // Explicit "instant" — html has scroll-behavior: smooth, so "auto" would
      // inherit it and animate the whole page length on arrival.
      if (el) el.scrollIntoView({ block: "start", behavior: samePage ? "smooth" : "instant" });
      else window.scrollTo({ top: 0, left: 0 });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, navigate]);

  return null;
}
