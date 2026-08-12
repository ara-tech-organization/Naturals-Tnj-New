import { useRef } from "react";
import { Link } from "react-router-dom";
import { CONTACT, HERO_SLIDES, WHY_US } from "../data/site";
import { GALLERY_GROUPS, OCCASION_SERVICES } from "../data/services";
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
            Bridal Makeup Artist in Thanjavur
            <em>Your Perfect Wedding Look</em>
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
          {/* Every occasion service the document names, each with what it
              actually is — a list of six names alone would have been the one
              place on the page where a service is named but not explained. */}
          <ul className="signature__services" data-reveal="right">
            {OCCASION_SERVICES.map((s) => (
              <li key={s.name}>
                <span className="signature__service-name">
                  <Icon name="check" size={13} />
                  {s.name}
                </span>
                <span className="signature__service-text">{s.text}</span>
              </li>
            ))}
          </ul>

          <div className="signature__proof" data-reveal="fade">
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
    to: "/womens-services",
    link: "See hair services",
  },
  {
    title: "Women's Beauty Parlour Services",
    text: "A trusted beauty parlour for women in Thanjavur, offering hair spa, skin whitening facials, and full body spa treatments.",
    image: IMG.beautyServices,
    alt: "Beauty parlour services for women at Naturals Thanjavur",
    to: "/womens-services",
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
   GALLERY — the transformation reel
   ========================================================================== */

/**
 * Every photograph the homepage has already spent by the time the reel
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
 * Nine frames, dealt one group at a time so each column mixes categories
 * rather than running as one column of brides and one of beards.
 *
 * Anything the page has already shown is skipped. The gallery was drawing the
 * first image of each group, which is exactly what the hero plates and the
 * bridal proof strip use — so the section that exists to show the range of the
 * work was showing the pictures the visitor had already scrolled past. There
 * are twenty-five photographs in the four groups and eleven are spent by the
 * time the reel appears, which still leaves fourteen to choose nine from.
 */
const REEL = (() => {
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
  return [0, 1, 2].map((c) => flat.slice(c * 3, c * 3 + 3));
})();

/**
 * The gallery, edge to edge.
 *
 * Everything above it is held inside the page's measure, so this one runs the
 * full width of the window and drops the container entirely — the change of
 * frame is what tells you the work has started. The heading is not above the
 * pictures but among them, occupying the first column like a caption plate in
 * a spread, which is also why the pictures can start at the very top edge of
 * the section.
 *
 * The three columns are level and static. They used to start at offset heights
 * and travel at different rates as the section passed, so no two frames lined
 * up across the row — depth, but at the cost of a wall that never resolved and
 * every frame moving against its neighbours. One crop, one baseline, rows that
 * line up.
 */
export function TransformationReel() {
  return (
    <section className="reel" aria-labelledby="gallery-title">
      <div className="reel__inner">
        <div className="reel__intro" data-reveal>
          <Chapter>Our Work</Chapter>
          <h2 id="gallery-title" className="reel__title">
            Real Transformations, Real Clients
          </h2>
          <p className="reel__text">
            Bridal makeovers, precision haircuts, spa sessions and grooming transformations —
            straight from our chairs.
          </p>
          <div className="reel__actions">
            <Btn to="/gallery" variant="outline" size="sm">
              View Full Gallery
            </Btn>
          </div>

          <ul className="reel__index">
            {GALLERY_GROUPS.map((g) => (
              <li key={g.id}>
                <Link to={`/gallery/${g.id}`}>
                  {g.title}
                  <Icon name="arrowUpRight" size={13} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {REEL.map((column, c) => (
          <ul key={c} className={`reel__col reel__col--${c + 1}`}>
            {column.map((img) => (
              <li key={img.src} data-reveal="fade">
                <Link to={`/gallery/${img.group}`}>
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  <span className="reel__caption">
                    <span className="reel__caption-text">{img.title}</span>
                    <Icon name="arrowUpRight" size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="container">
        <p className="reel__foot" data-reveal="fade">
          Ready to be our next transformation story?{" "}
          <Link className="inline-link" to="/book">
            Book your appointment
          </Link>{" "}
          at Naturals Thanjavur today.
        </p>
      </div>
    </section>
  );
}
