import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CONTACT, HERO_SLIDES, WHY_US } from "../data/site";
import { GALLERY_GROUPS } from "../data/services";
import { IMG } from "../assets";
import Icon from "./Icon";
import { ArrowLink, Btn, Chapter } from "./Ui";
import { useScrollProgress } from "../hooks/useMotion";

/* ==========================================================================
   SIGNATURE — the bridal plate
   ========================================================================== */

/** Bridal work, shown inside the bridal plate itself. High commercial intent,
 *  so it carries its own proof rather than waiting for the gallery. */
const BRIDAL_SHOTS = GALLERY_GROUPS.find((g) => g.id === "bridal")?.images ?? [];

/**
 * The one section on the page built as a campaign rather than a section: a
 * full-bleed photograph, the copy sitting directly on it, and the plate
 * drifting behind the type as the page scrolls.
 *
 * It is bridal because the content document says so — bridal is the highest
 * commercial intent on the site and is given "dedicated prominence" there,
 * with its own page, its own keyword set and its own gallery group.
 */
export function SignatureBridal() {
  const ref = useRef(null);
  useScrollProgress(ref);

  return (
    <section className="signature" ref={ref} aria-labelledby="bridal-title">
      <div className="signature__bg" aria-hidden="true">
        <img
          src={IMG.bridalMakeover}
          alt=""
          loading="lazy"
          decoding="async"
          className="signature__bg-img"
        />
        <span className="signature__scrim" />
      </div>

      <div className="container signature__inner">
        <div className="signature__copy" data-reveal>
          <Chapter>The Signature Experience</Chapter>

          {/* H3, not H2 — bridal is one of the four service lanes under "Our
              Premium Salon Services in Thanjavur" in the content outline, and
              only sits in its own plate because it earns the space. */}
          <h3 id="bridal-title" className="signature__title">
            Bridal Makeup
            <em>Your Perfect Look</em>
          </h3>

          <p className="signature__text">
            As one of Thanjavur&rsquo;s most trusted bridal makeup artists, we craft flawless,
            camera-ready looks tailored to your outfit, skin tone, and style. From engagement to
            wedding day, our bridal packages include personalized trial sessions. Walk down the
            aisle with total confidence.
          </p>

          <div className="signature__actions">
            <Btn to="/bridal-makeover" variant="light">
              Explore Bridal Services
            </Btn>
            <Btn to="/book" variant="ghost" icon="calendar">
              Book Your Session
            </Btn>
            <Btn href={CONTACT.phoneHref} variant="ghost" icon="phone">
              Call Now
            </Btn>
          </div>
        </div>

        <div className="signature__side">
          <div className="signature__proof" data-reveal="right">
            <ul className="signature__shots">
              {BRIDAL_SHOTS.slice(0, 4).map((img) => (
                <li key={img.src}>
                  <Link to="/gallery/bridal">
                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="signature__note">
              <strong>100+</strong> bridal makeovers completed in Thanjavur.{" "}
              <Link className="inline-link" to="/gallery/bridal">
                See the full bridal gallery
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PILLARS — the two service lanes that have no band of their own
   ========================================================================== */

/**
 * The content document names four service pillars under the services H2. Two
 * of them already have a band to themselves further down the page — men's
 * grooming and bridal — and these are the other two.
 *
 * They are here because the document says they belong on the homepage, and
 * both headings are keyword-bearing ("Hair Salon Services in Thanjavur",
 * "Women's Beauty Parlour Services"); an index of category names alone would
 * have left the page without either phrase. Set as two ruled columns rather
 * than cards, so a pair of headings does not become a pair of boxes.
 */
const PILLARS = [
  {
    title: "Hair Salon Services in Thanjavur",
    text: "From precision haircuts to advanced hair spa therapy, keratin treatments, and smoothening — using the latest techniques and salon-grade products.",
    image: IMG.hairStyling,
    alt: "Professional hair styling service at Naturals Thanjavur",
    to: "/services/womens",
    link: "See hair services",
  },
  {
    title: "Women's Beauty Parlour Services",
    text: "A trusted beauty parlour for women in Thanjavur, offering hair spa, skin whitening facials, and full body spa treatments.",
    image: IMG.beautyServices,
    alt: "Beauty parlour services for women at Naturals Thanjavur",
    to: "/services/womens",
    link: "See beauty services",
  },
];

export function ServicePillars() {
  return (
    <section className="pillars" aria-label="Hair and women's beauty services">
      <div className="container">
        <ul className="pillars__list">
          {PILLARS.map((p) => (
            <li key={p.title} className="pillar" data-reveal>
              <div className="pillar__media">
                <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
              </div>
              <div className="pillar__copy">
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__text">{p.text}</p>
                <div className="pillar__actions">
                  <Btn to="/book" size="sm" icon="calendar">
                    Book Your Session
                  </Btn>
                  <ArrowLink to={p.to}>{p.link}</ArrowLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ==========================================================================
   WHY — the reasons, as a narrative
   ========================================================================== */

/**
 * Six reasons, set as a wall of plates.
 *
 * It used to run as a ruled list beside a claim that stayed stuck on screen
 * while the reasons scrolled past it. That reads as an argument unrolling, but
 * the copy promises "six reasons" — a count you should be able to take in at a
 * glance, not one you have to scroll to the end of to confirm. The plates give
 * all six at once, and the sequence still reads through the numerals.
 */
export function WhyNarrative() {
  return (
    <section className="section why-story" aria-labelledby="why-title">
      <div className="container">
        {/* Claim left, the count and the way deeper on the right, closed by the
            rule the plates hang from. */}
        <div className="why-story__head">
          <div data-reveal>
            <Chapter>Why Us</Chapter>
            <h2 id="why-title" className="why-story__title">
              Why Thanjavur Trusts Naturals
            </h2>
          </div>

          <div className="why-story__aside" data-reveal>
            <p className="why-story__text">
              Six reasons thousands of clients across the city keep coming back to us.
            </p>
            <div className="why-story__actions">
              <Btn to="/about" variant="outline" size="sm">
                Our Story
              </Btn>
            </div>
          </div>
        </div>

        <ol className="why-plates stagger">
          {WHY_US.map((item, i) => (
            <li key={item.title} className="why-plate" data-reveal>
              <div className="why-plate__top">
                <span className="why-plate__mark" aria-hidden="true">
                  <Icon name={item.icon} size={19} />
                </span>
                <span className="why-plate__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="why-plate__title">{item.title}</h3>
              <p className="why-plate__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ==========================================================================
   GALLERY — the transformation carousel
   ========================================================================== */

/**
 * Every photograph the homepage has already spent by the time the carousel
 * arrives. Most are derived from the sections that use them, so moving a
 * picture cannot silently put it back in the gallery; the last four are named
 * because they live in Home.jsx rather than here.
 */
const ALREADY_SHOWN = new Set([
  ...HERO_SLIDES.map((s) => s.main.src),
  ...BRIDAL_SHOTS.slice(0, 4).map((i) => i.src),
  ...PILLARS.map((p) => p.image),
  IMG.bridalMakeover, // the signature plate's own background
  IMG.spa, // \
  IMG.reflexology, //  } the spa band's three frames
  IMG.wellness, // /
  IMG.mensGrooming, // the men's split
]);

/**
 * A dozen frames, dealt one group at a time so the row mixes categories
 * rather than running as a block of brides, then a block of beards.
 *
 * Anything the page has already shown is skipped — the same logic the
 * masonry gallery used, kept because the reasoning still holds: showing the
 * pictures the visitor has already scrolled past defeats a section that
 * exists to prove the range of the work.
 */
const CAROUSEL = (() => {
  const flat = [];
  // The longest group holds nine, so nine passes reaches every image.
  for (let i = 0; i < 9; i += 1) {
    for (const group of GALLERY_GROUPS) {
      const img = group.images[i];
      if (img && !ALREADY_SHOWN.has(img.src)) {
        flat.push({ ...img, group: group.id, title: group.title });
      }
    }
  }
  return flat.slice(0, 12);
})();

/**
 * A single scrolling row of large photographs — a filmstrip rather than a
 * wall. Each frame keeps its category as a caption, so the range of the work
 * still reads even without the grid's four-up structure.
 *
 * Native scroll-snap does the paging; the two round buttons are a desktop
 * convenience for anyone without a trackpad or touchscreen, hidden wherever
 * the device doesn't have a fine, hover-capable pointer to click them with.
 *
 * The row also advances itself, one card every few seconds, looping back to
 * the start at the end — so the range of the work is on display even for a
 * visitor who never touches it. It pauses the moment a pointer or keyboard
 * focus enters the strip and only resumes once it leaves, and never starts at
 * all under `prefers-reduced-motion`.
 */
export function TransformationReel() {
  const trackRef = useRef(null);

  const scrollByCard = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".carousel__item");
    const step = card ? card.getBoundingClientRect().width + 20 : 320;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const track = trackRef.current;
    if (!track) return undefined;

    let paused = false;
    const tick = () => {
      if (paused) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    };
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    const id = window.setInterval(tick, 3200);
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("pointerdown", pause);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

    return () => {
      window.clearInterval(id);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, [scrollByCard]);

  return (
    <section className="carousel" aria-labelledby="gallery-title">
      <div className="container">
        <div className="carousel__head" data-reveal>
          <Chapter>Our Work</Chapter>
          <h2 id="gallery-title" className="carousel__title">
            Real Transformations, Real Clients
          </h2>
          <p className="carousel__text">
            Bridal makeovers, precision haircuts, spa sessions and grooming transformations —
            straight from our chairs.
          </p>
          <div className="carousel__actions">
            <Btn to="/gallery" variant="outline" size="sm">
              View Full Gallery
            </Btn>
          </div>
        </div>
      </div>

      <div className="carousel__viewport">
        <ul className="carousel__track" ref={trackRef}>
          {CAROUSEL.map((img) => (
            <li key={img.src} className="carousel__item" data-reveal="fade">
              <Link to={`/gallery/${img.group}`}>
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                <span className="carousel__caption">
                  <span className="carousel__caption-text">{img.title}</span>
                  <Icon name="arrowUpRight" size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        <div className="carousel__foot">
          <p className="carousel__note" data-reveal="fade">
            Ready to be our next transformation story?{" "}
            <Link className="inline-link" to="/book">
              Book your appointment
            </Link>{" "}
            at Naturals Thanjavur today.
          </p>
          <div className="carousel__nav">
            <button
              type="button"
              className="carousel__arrow"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll to previous photos"
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              type="button"
              className="carousel__arrow"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll to more photos"
            >
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
