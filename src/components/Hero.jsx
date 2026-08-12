import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND, HERO_MEDIA, HERO_SLIDES, TRUST_POINTS } from "../data/site";
import Icon from "./Icon";
import { Btn } from "./Ui";
import { usePointerDepth, useScrollProgress } from "../hooks/useMotion";

/** Dwell per slide. The dot's progress fill is driven off the same number,
 *  passed down as `--dur`, so the bar and the tick can never drift apart. */
const INTERVAL = 3000;

/** Segment list → text with the keyword phrase marked. */
function Title({ parts }) {
  return parts.map((p, i) => (p.em ? <em key={i}>{p.t}</em> : <span key={i}>{p.t}</span>));
}

/**
 * CINEMATIC HERO
 *
 * A full-viewport photographic stage rather than a copy column beside a
 * picture. The composition is layered, and each layer moves at its own rate:
 *
 *   01  the photography — cross-fading plates, each drifting on a slow scale
 *   02  a warm scrim, weighted to the left so the copy is legible without
 *       darkening the photograph itself (the imagery is the campaign)
 *   03  a soft plum bloom, the brand's own light
 *   04  the editorial typography, which stays put while everything drifts
 *   05  a floating label naming the treatment on screen
 *   06  a hairline and the years mark
 *
 * MOTION. Pointer position moves the plates a few pixels and the decorative
 * layers a few more, which reads as depth rather than as animation. Scroll
 * progress lifts the copy and eases the stage down, so the section below rises
 * out from behind the hero instead of the hero simply scrolling away. Both are
 * CSS custom properties written outside React (see hooks/useMotion), and both
 * stop entirely under `prefers-reduced-motion`.
 *
 * MEDIA. `HERO_MEDIA.video` is the slot for a cinematic loop; while it is null
 * the same composition runs on the salon's photography, which is what the
 * client actually has. Nothing else changes when a film is dropped in.
 *
 * AUTOPLAY. It runs continuously, stopped only by the pause control, a
 * backgrounded tab, or keyboard focus inside the hero — deliberately not by
 * hover, since the hero fills the opening screen and a resting pointer would
 * hold it forever. Choosing a slide by hand restarts the dwell rather than
 * ending the rotation. WCAG 2.2.2 is met by the pause control, which a touch
 * visitor can also reach.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const [index, setIndex] = useState(0);
  // Reduced-motion visitors land on a stopped slider with the controls in
  // reach, never on content that changes under them unasked.
  const [playing, setPlaying] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hidden, setHidden] = useState(false);
  const [focusHeld, setFocusHeld] = useState(false);

  // A transient hold: unlike `playing`, the visitor never chose it, so the
  // rotation resumes by itself once the cause goes away.
  const held = hidden || focusHeld;
  const slide = HERO_SLIDES[index];

  usePointerDepth(stageRef);
  useScrollProgress(heroRef);

  const go = useCallback((i) => {
    setIndex(((i % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay. A timeout re-armed per slide rather than one long-lived
  // interval: `index` is a dependency, so advancing by hand cancels the
  // pending tick and the new slide starts its dwell from zero — which is also
  // what keeps the dot's progress fill honest.
  useEffect(() => {
    if (!playing || held) return undefined;

    const tick = setTimeout(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), INTERVAL);
    return () => clearTimeout(tick);
  }, [playing, held, index]);

  // A rotator running in a background tab is wasted work.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section
      className="chero"
      ref={heroRef}
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      /* Keyboard focus holds the rotation so a visitor tabbing through the
         hero is not chased by it. Checked against :focus-visible because a
         mouse click on an arrow focuses that button too, and stopping there
         would mean one click silently ends the slideshow. */
      onFocusCapture={(e) => {
        if (e.target.matches?.(":focus-visible")) setFocusHeld(true);
      }}
      onBlurCapture={() => setFocusHeld(false)}
    >
      {/* ---- Layers 01–03 · the stage ------------------------------------ */}
      <div className="chero__stage" ref={stageRef} aria-hidden="true">
        {HERO_MEDIA.video ? (
          <video
            className="chero__video"
            src={HERO_MEDIA.video}
            poster={HERO_SLIDES[0].main.src}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        ) : (
          /* All plates stay mounted and cross-fade. Swapping `src` on one
             <img> would flash the browser's empty box on every change. */
          HERO_SLIDES.map((s, i) => (
            <img
              key={s.id}
              className={`chero__plate${i === index ? " is-active" : ""}`}
              src={s.main.src}
              alt=""
              {...(i === 0 ? { fetchPriority: "high", loading: "eager" } : { loading: "lazy" })}
              decoding="async"
            />
          ))
        )}

        <span className="chero__scrim" />
        <span className="chero__glow" />
      </div>

      {/* ---- Layer 04 · the copy ----------------------------------------- */}
      <div className="container chero__inner">
        {/* `key` restarts the entrance stagger on every slide change. No
            aria-live: an unrequested rotation should not interrupt a screen
            reader mid-sentence. */}
        <div
          className="chero__copy"
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${HERO_SLIDES.length}`}
        >
          <p className="chero__eyebrow chero__anim" style={{ "--d": "0.05s" }}>
            <span className="chero__eyebrow-rule" aria-hidden="true" />
            {slide.eyebrow}
          </p>

          <h1 id="hero-title" className="chero__title chero__anim" style={{ "--d": "0.14s" }}>
            <Title parts={slide.title} />
          </h1>

          <p className="chero__text chero__anim" style={{ "--d": "0.3s" }}>
            {slide.text}
          </p>

          <div className="chero__actions chero__anim" style={{ "--d": "0.42s" }}>
            <Btn to={slide.cta.to} size="lg" icon="calendar">
              {slide.cta.label}
            </Btn>
            <Btn to={slide.alt.to} variant="ghost" size="lg">
              {slide.alt.label}
            </Btn>
          </div>

          <ul className="chero__trust chero__anim" style={{ "--d": "0.54s" }}>
            {TRUST_POINTS.map((t) => (
              <li key={t}>
                <Icon name="check" size={13} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Layers 05–06 · floating marks ----------------------------- */}
        <div className="chero__marks" aria-hidden="true">
          {/* A written mark, not the photograph's alt text — see HERO_SLIDES. */}
          <span className="chero__label">
            <span className="chero__label-dot" />
            {slide.mark}
          </span>

          <span className="chero__years">
            <strong>{new Date().getFullYear() - BRAND.since}+</strong>
            years in Thanjavur
          </span>
        </div>

      </div>

      {/* ---- Controls ----------------------------------------------------- */}
      <div className="container chero__controls">
        <div className="chero__progress">
          {/* The mechanism WCAG 2.2.2 asks for, and the only thing that stops
              the rotation for good. */}
          <button
            type="button"
            className="chero__toggle"
            aria-label={playing ? "Pause the slideshow" : "Play the slideshow"}
            onClick={() => setPlaying((p) => !p)}
          >
            <Icon name={playing ? "pause" : "play"} size={14} />
          </button>

          <div className="chero__dots" role="group" aria-label="Choose a hero slide">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-current={i === index}
                aria-label={s.eyebrow}
                className={`chero__dot${i === index ? " is-active" : ""}`}
                onClick={() => go(i)}
              >
                <span
                  className="chero__dot-fill"
                  style={{ "--dur": `${INTERVAL}ms` }}
                  data-run={i === index && playing && !held ? "" : undefined}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <span className="chero__count" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
            <i>/</i>
            {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        <div className="chero__arrows">
          <button
            type="button"
            className="chero__arrow"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
          >
            <Icon name="chevron" size={17} />
          </button>
          <button
            type="button"
            className="chero__arrow chero__arrow--next"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
          >
            <Icon name="chevron" size={17} />
          </button>
        </div>
      </div>

      {/* A button, not an anchor — this only moves the viewport, and an href
          would leave a #welcome fragment behind in the address bar. */}
      <button
        type="button"
        className="chero__scroll"
        aria-label="Scroll to the next section"
        onClick={() => document.getElementById("welcome")?.scrollIntoView({ block: "start" })}
      >
        <span className="chero__scroll-text">Scroll to discover</span>
        <span className="chero__scroll-line" aria-hidden="true" />
      </button>
    </section>
  );
}
