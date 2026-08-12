import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MENS_SERVICES, WOMENS_SERVICES } from "../data/services";
import Icon from "./Icon";
import { ArrowLink, Btn, Chapter } from "./Ui";

/**
 * Both lanes of the catalogue. The gender split is not a design choice — the
 * content document builds its whole keyword strategy on it ("Women's Salon
 * Thanjavur", "Men's Grooming Thanjavur"), and each lane links to the page
 * that ranks for it.
 */
/** Dwell per card before the row advances. */
const INTERVAL = 3000;

const LANES = [
  {
    id: "women",
    label: "Women",
    to: "/womens-services",
    intro:
      "Tailored beauty and hair care designed for every woman, crafted with premium products and modern techniques.",
    list: WOMENS_SERVICES,
  },
  {
    id: "men",
    label: "Men",
    to: "/mens-grooming",
    intro:
      "Complete grooming solutions for the modern man, from sharp cuts and beard work to facials built for men's skin.",
    list: MENS_SERVICES,
  },
];

/**
 * SERVICE DISCOVERY
 *
 * The heading and its controls across the top, then the catalogue as a slider
 * of cards — one card per category, carrying its photograph, what it is, and
 * every treatment inside it.
 *
 * The track is a real scroll container, not a transformed strip. That single
 * decision buys the whole interaction: a swipe on a phone, a trackpad flick on
 * a laptop, arrow keys once focused, and a working scrollbar for anyone who
 * needs one — none of which a translated flex row gives without code. The
 * arrow buttons only call `scrollBy`; the browser does the moving, and CSS
 * scroll-snap decides where it lands.
 */
export default function ServiceDiscovery() {
  const trackRef = useRef(null);
  const [lane, setLane] = useState(0);
  const [rail, setRail] = useState({ start: true, end: false, progress: 0 });
  // Reduced-motion visitors get a stopped slider with the controls in reach,
  // never cards moving under them unasked.
  const [playing, setPlaying] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  // Two independent holds rather than one flag: a backgrounded tab and
  // keyboard focus start and end at different moments, and sharing a single
  // boolean lets whichever fires last wipe the other's hold.
  const [focusHeld, setFocusHeld] = useState(false);
  const [hidden, setHidden] = useState(false);
  const uid = useId();

  const held = focusHeld || hidden;
  const current = LANES[lane];

  /** Reads the track's scroll position and mirrors it into the controls. */
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setRail({
      start: el.scrollLeft <= 2,
      // A couple of pixels of slack: sub-pixel widths mean the end is rarely
      // reached exactly, and a next arrow that never disables reads as broken.
      end: el.scrollLeft >= max - 2,
      progress: max > 0 ? el.scrollLeft / max : 0,
    });
  }, []);

  /** One card per press, measured from the first card so the step is always
   *  the real card width rather than a number that drifts at other widths. */
  const step = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const width = card ? card.getBoundingClientRect().width : el.clientWidth * 0.8;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (width + gap), behavior: "smooth" });
  }, []);

  /**
   * Autoplay: one card every few seconds, returning to the first once the
   * last is reached.
   *
   * It advances with the same relative `scrollBy` the arrows use, so a visitor
   * who has swiped or dragged the row keeps their place — the next tick
   * carries on from wherever they left it instead of snapping back to an index
   * the component thinks it is on. Held by hover, by keyboard focus inside the
   * section, and by a backgrounded tab; stopped for good only by the pause
   * control, which is the mechanism WCAG 2.2.2 asks for.
   */
  useEffect(() => {
    if (!playing || held) return undefined;

    const tick = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      // Nothing to scroll — a wide enough viewport can fit the whole lane, and
      // scrolling a track with no overflow just fires events for no reason.
      if (max <= 0) return;
      if (el.scrollLeft >= max - 2) el.scrollTo({ left: 0, behavior: "smooth" });
      else step(1);
    }, INTERVAL);

    return () => clearInterval(tick);
  }, [playing, held, lane, step]);

  // A slider running in a background tab is wasted work.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const switchLane = (i) => {
    setLane(i);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    setRail({ start: true, end: false, progress: 0 });
  };

  return (
    <section
      className="svc"
      id="services"
      aria-labelledby="services-title"
      aria-roledescription="carousel"
      /* Deliberately no hover hold. This band is over half a screen tall, so a
         pointer parked anywhere near it — which is where a pointer usually is
         while you read — held the row still indefinitely and the slider read
         as broken. Keyboard focus still holds it, checked against
         :focus-visible so that clicking an arrow with a mouse does not
         silently stop the rotation. */
      onFocusCapture={(e) => {
        if (e.target.matches?.(":focus-visible")) setFocusHeld(true);
      }}
      onBlurCapture={() => setFocusHeld(false)}
    >
      <div className="container">
        {/* ---- Heading ----------------------------------------------------- */}
        <header className="svc__head">
          <div className="svc__head-main" data-reveal>
            <Chapter>What We Do</Chapter>
            <h2 id="services-title" className="svc__title">
              Our Premium Salon Services in Thanjavur
            </h2>
            <p className="svc__intro">{current.intro}</p>
          </div>

          <div className="svc__head-aside" data-reveal>
            {/* The audience switch. Two lanes, each labelled with how many
                categories are inside it. */}
            <div className="svc__lanes" role="tablist" aria-label="Service audience">
              {LANES.map((l, i) => (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  id={`${uid}-lane-${l.id}`}
                  aria-selected={i === lane}
                  aria-controls={`${uid}-track`}
                  tabIndex={i === lane ? 0 : -1}
                  className={`svc__lane${i === lane ? " is-active" : ""}`}
                  onClick={() => switchLane(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") switchLane((lane + 1) % LANES.length);
                    if (e.key === "ArrowLeft") switchLane((lane - 1 + LANES.length) % LANES.length);
                  }}
                >
                  {l.label}
                  <span className="svc__lane-count">{l.list.length}</span>
                </button>
              ))}
            </div>

            <div className="svc__arrows">
              {/* The mechanism WCAG 2.2.2 asks for, and the only thing that
                  stops the rotation for good. */}
              <button
                type="button"
                className="svc__toggle"
                aria-label={playing ? "Pause the service slider" : "Play the service slider"}
                onClick={() => setPlaying((p) => !p)}
              >
                <Icon name={playing ? "pause" : "play"} size={14} />
              </button>

              <button
                type="button"
                className="svc__arrow"
                aria-label="Previous services"
                disabled={rail.start}
                onClick={() => step(-1)}
              >
                <Icon name="chevron" size={17} />
              </button>
              <button
                type="button"
                className="svc__arrow svc__arrow--next"
                aria-label="More services"
                disabled={rail.end}
                onClick={() => step(1)}
              >
                <Icon name="chevron" size={17} />
              </button>
            </div>
          </div>
        </header>

        {/* ---- The slider -------------------------------------------------- */}
        {/* Focusable and labelled: a scroll container that can be reached by
            keyboard can be driven with the arrow keys, which is how this is
            operated without a mouse. */}
        <ul
          className="svc__track"
          id={`${uid}-track`}
          ref={trackRef}
          onScroll={onScroll}
          tabIndex={0}
          role="group"
          aria-label={`${current.label}'s service categories`}
        >
          {current.list.map((s) => (
            <li key={s.slug} className="svc-slide" data-reveal="fade">
              <Link className="svc-slide__media" to={`${current.to}/${s.slug}`} tabIndex={-1}>
                <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
                <span className="svc-slide__count">
                  {s.items.length} {s.items.length === 1 ? "treatment" : "treatments"}
                </span>
              </Link>

              <div className="svc-slide__body">
                <h3 className="svc-slide__name">
                  <Link to={`${current.to}/${s.slug}`}>{s.name}</Link>
                </h3>
                <p className="svc-slide__text">{s.summary}</p>

                {/* Three treatments, then a count of the rest. Listing all of
                    them made one card twice the height of its neighbour, and
                    the full list is one press away on the category page. */}
                <ul className="svc-slide__list">
                  {s.items.slice(0, 3).map((item) => (
                    <li key={item}>
                      <Icon name="check" size={12} />
                      {item}
                    </li>
                  ))}
                  {s.items.length > 3 ? (
                    <li className="svc-slide__more">+{s.items.length - 3} more</li>
                  ) : null}
                </ul>

                <div className="svc-slide__actions">
                  <Btn to="/book" size="sm" icon="calendar">
                    Book Your Session
                  </Btn>
                  <ArrowLink to={`${current.to}/${s.slug}`}>Details</ArrowLink>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* ---- Progress + links -------------------------------------------- */}
        <div className="svc__foot">
          <div className="svc__progress" aria-hidden="true">
            <span
              className="svc__progress-fill"
              style={{ "--at": rail.progress, "--of": current.list.length }}
            />
          </div>

          <div className="svc__links">
            <ArrowLink to={current.to}>View the full {current.label}&rsquo;s menu</ArrowLink>
            <ArrowLink to="/services">Browse every service</ArrowLink>
            <ArrowLink to="/pricing">See the rate card</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
