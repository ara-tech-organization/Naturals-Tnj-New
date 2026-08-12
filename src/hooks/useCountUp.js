import { useEffect, useRef, useState } from "react";


/**
 * Counts a number up once, the first time the element scrolls into view.
 * Uses requestAnimationFrame with an ease-out curve so the number decelerates
 * into its final value rather than ticking linearly.
 */
/** True when the counter should not animate — evaluated before first paint. */
function skipsAnimation() {
  if (typeof window === "undefined") return true;
  if (typeof IntersectionObserver === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useCountUp(target, duration = 1800) {
  const ref = useRef(null);
  // Seeded lazily so the reduced-motion case renders its final value on the
  // first paint, with no effect and no second render.
  const [value, setValue] = useState(() => (skipsAnimation() ? target : 0));
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || skipsAnimation()) return undefined;

    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        // easeOutExpo
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setValue(Math.round(target * eased));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          run();
          observer.disconnect();
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { ref, value };
}
