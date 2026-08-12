import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServiceExplorer from "../components/ServiceExplorer";
import Icon from "../components/Icon";
import { ArrowLink, Btn, Chapter, Figure, SectionHeading } from "../components/Ui";
import {
  CtaBanner,
  FaqSection,
  LocationSection,
  StatsRow,
  Testimonials,
} from "../components/Blocks";
import { BRAND, CONTACT, FAQS, TRUST_POINTS, WHY_US } from "../data/site";
import { GALLERY_GROUPS, OCCASION_SERVICES, POPULAR_SERVICES } from "../data/services";
import { faqSchema, localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema(CONTACT), faqSchema(FAQS)],
};

/**
 * A flat strip of gallery images for the homepage preview rail. Taken one from
 * each group in turn rather than in order, so the rail opens with a bridal, a
 * hair, a men's and a spa shot instead of six bridal frames.
 */
const RAIL = (() => {
  const out = [];
  for (let i = 0; i < 4; i += 1) {
    for (const group of GALLERY_GROUPS) {
      if (group.images[i]) out.push(group.images[i]);
    }
  }
  return out.slice(0, 10);
})();

/** The three treatments the spa band shows. Kept out of the markup so the
 *  section stays a head and a list. */
const SPA_FRAMES = [
  { src: IMG.spa, alt: "Relaxing spa therapy at Naturals Thanjavur salon", label: "Body Spa" },
  { src: IMG.reflexology, alt: "Reflexology therapy at Naturals Thanjavur", label: "Reflexology" },
  { src: IMG.wellness, alt: "Scalp and hair ritual at Naturals Thanjavur", label: "Hair Ritual" },
];

export default function Home() {
  useSeo({
    title: "Best Unisex Salon for Hair, Bridal & Spa | Naturals Salon Thanjavur",
    description:
      "Experience premium hair styling, bridal makeovers, spa therapies & men's grooming at Naturals Thanjavur. 15+ years of trusted expertise. Book your appointment today!",
    path: "/",
    keywords: PAGE_KEYWORDS.home,
    image: IMG.hairstyle,
    schema: SCHEMA,
  });

  return (
    // `editorial` switches the home page into the magazine register defined in
    // styles/editorial.css — longer section rhythm, display type at full size,
    // hairlines in place of boxes. Scoped, so no other page is affected.
    <div className="editorial">
      <Hero />

      {/* ---- 03 · Trust strip ------------------------------------------- */}
      <section className="trust-strip" aria-label="Why customers trust Naturals Thanjavur">
        <div className="container">
          <ul className="trust-strip__list stagger">
            {TRUST_POINTS.map((t) => (
              <li key={t} data-reveal="fade">
                <Icon name="sparkle" size={16} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- 04 · Welcome / brand story ---------------------------------
           Opens as a spread rather than another two-column split: the title
           and its standfirst run the full measure across the top on a
           hairline, and only below that does the section break into plate and
           column. Sections 09 and 11 are both `.split`, so leaving the welcome
           in the same shape made the first three screens read as one repeating
           pattern — this one earns a different opening because it is the
           page's introduction. */}
      <section className="section welcome" id="welcome" aria-labelledby="welcome-title">
        <div className="container">
          <header className="welcome__head">
            <div className="welcome__head-main" data-reveal>
              <Chapter>The Naturals Experience</Chapter>
              <h2 id="welcome-title" className="welcome__title">
                Welcome to Naturals — Thanjavur&rsquo;s Preferred <em>Unisex Salon</em>
              </h2>
            </div>

            {/* The old opening line, promoted to a standfirst. It is the
                section's thesis, so it sits beside the title rather than
                buried as the first of three paragraphs. */}
            <div className="welcome__head-aside" data-reveal>
              <p className="welcome__standfirst">
                As a leading unisex salon in Thanjavur, Naturals combines global styling expertise
                with a personal touch that keeps thousands of customers coming back.
              </p>
              <p className="welcome__sign">Serving the city since {BRAND.since}</p>
            </div>
          </header>

          <div className="welcome__body">
            {/* A plain div, not a figure: with the caption gone there is no
                caption to associate, and the images already carry their own
                alt text. */}
            <div className="welcome__plate">
              <Figure
                src={IMG.story}
                alt="Inside Naturals Thanjavur, the city's trusted unisex salon"
                ratio="tall"
                className="welcome__plate-lead"
                framed
              />
              <Figure
                src={IMG.saloon}
                alt="Interior of Naturals unisex salon in Thanjavur"
                ratio="square"
                className="welcome__plate-inset"
                reveal="scale"
              />
            </div>

            <div className="welcome__copy">
              <p className="welcome__para" data-reveal>
                Whether you&rsquo;re searching for the best hair salon in Thanjavur for a fresh new
                look, a reliable ladies beauty parlour in Thanjavur for your everyday skincare
                routine, or a dependable makeup artist in Thanjavur for a special occasion, our
                experienced team is here to deliver results you&rsquo;ll love.
              </p>

              <blockquote className="pull-quote" data-reveal>
                Fifteen years in one city, and the same question at every chair: what do you
                actually want it to look like?
                <cite>Naturals Thanjavur, since {BRAND.since}</cite>
              </blockquote>

              <p className="welcome__para welcome__para--sm" data-reveal>
                Certified stylists, hygienic salon standards and one appointment that can cover a
                cut, a facial and a spa session — for women and men alike.
              </p>

              <div className="welcome__actions" data-reveal>
                <Btn to="/about" variant="outline">
                  Our Story
                </Btn>
                <ArrowLink to="/services">All Services</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- 05 · Stats (dark contrast band) ---------------------------- */}
      <section className="section section--tight section--dark" aria-labelledby="numbers-title">
        <div className="container">
          {/* Head sits above the figures rather than beside them: four numbers
              this large need the full measure, and "10,000+" is three times the
              width of "15+", so a narrow column made the row read as ragged. */}
          <div className="numbers">
            <div className="numbers__head" data-reveal>
              <div>
                <Chapter>By The Numbers</Chapter>
                <h2 id="numbers-title" className="numbers__title">
                  Our Success in Numbers
                </h2>
              </div>
              <p className="numbers__text">
                Fifteen years of work in Thanjavur, counted the only way that means anything —
                in the people who came back, and brought someone with them.
              </p>
            </div>
            <StatsRow />
          </div>
        </div>
      </section>

      {/* ---- 06 · Popular services shortcut strip ----------------------- */}
      <section className="section section--tight pops" aria-labelledby="popular-title">
        <div className="container">
          <div className="pops__head" data-reveal>
            <Chapter>Most Booked</Chapter>
            <h2 id="popular-title" className="pops__title">
              Popular Services
            </h2>
            <p className="pops__text">
              Jump straight to what most people come in for — each one opens that category in the
              women&rsquo;s or men&rsquo;s menu.
            </p>
          </div>

          {/* Image-led rather than a text index. This section sits between the
              dark stats band and the photo-led explorer, and a column of plain
              links read as a gap between them — the shortcut is more useful
              when you can see the service you are picking. Each tile carries
              the photograph of the category it opens, resolved in the data. */}
          <ul className="pops__grid stagger">
            {POPULAR_SERVICES.map((s) => (
              <li key={s.to + s.name} data-reveal="fade">
                <Link className="pops__tile" to={s.to}>
                  <span className="pops__media">
                    <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
                  </span>
                  <span className="pops__body">
                    <span className="pops__tag">{s.tag}</span>
                    <span className="pops__name">{s.name}</span>
                  </span>
                  <Icon name="arrowUpRight" size={16} className="pops__icon" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="pops__foot" data-reveal="fade">
            <ArrowLink to="/services">Browse the full service menu</ArrowLink>
          </div>
        </div>
      </section>

      {/* ---- 07 · Service explorer -------------------------------------- */}
      <ServiceExplorer />

      {/* ---- 08 · Bridal campaign --------------------------------------- */}
      {/* A split plate, not a scrim. Copy set over a darkened photograph is the
          same device the hero uses, and it costs the picture its detail while
          holding the text at whatever contrast the image happens to allow. Here
          the two are given a half each: a solid plum panel that owns the words,
          and the photograph uncropped and undimmed beside it. */}
      {/* A poster, not a split. Section 06 below is already two columns side by
          side, and the earlier plum-panel-beside-photo repeated that shape a
          screen earlier. Here the photograph runs full-bleed and a solid card
          overlaps it — the one composition on the page where two planes sit on
          top of each other rather than next to each other. The picture is never
          dimmed, and the copy never depends on it for contrast. */}
      <section className="bridal" aria-labelledby="bridal-title">
        <div className="bridal__frame">
          <img
            src={IMG.bridalPortrait}
            alt="Bridal makeover by Naturals Thanjavur makeup artists"
            loading="lazy"
            decoding="async"
          />
        </div>
      
        <div className="container">
          <div className="bridal__card" data-reveal>
            <Chapter>Glam Up Your Special Day</Chapter>
            {/* H3 for the same reason as the men's lane — bridal is one of the
                four service lanes under the services H2, given its own band. */}
            <h3 id="bridal-title" className="bridal__title">
              Bridal Makeup Artist in Thanjavur
              <em>Your Perfect Wedding Look</em>
            </h3>
            <p className="bridal__text">
              As one of Thanjavur&rsquo;s most trusted bridal makeup artists, we craft flawless,
              camera-ready looks tailored to your outfit, skin tone, and style — with a
              personalised trial session before the day itself.
            </p>
            <div className="bridal__actions">
              <Btn to="/bridal-makeover" variant="light">
                Explore Bridal Services
              </Btn>
              <Btn to="/book" variant="ghost" icon="calendar">
                Book a Trial
              </Btn>
            </div>
          </div>
      
          {/* The six occasion services as their own band under the card, so the
              card stays a statement and the menu stays scannable. */}
          <ul className="bridal__services stagger">
            {OCCASION_SERVICES.map((s, i) => (
              <li key={s.name} data-reveal="fade">
                <Link to="/bridal-makeover">
                  <span className="bridal__services-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="bridal__services-name">{s.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- 09 · Men's grooming ---------------------------------------- */}
      <section className="section" aria-labelledby="mens-title">
        <div className="container">
          <div className="split split--reverse">
            <div className="split__copy">
              <div data-reveal>
                <Chapter>For Him</Chapter>
                {/* H3, not H2 — this lane belongs to "Our Premium Salon
                    Services in Thanjavur" in the content outline, and only sits
                    in its own band because it earns the editorial space. */}
                <h3 id="mens-title" className="h2">
                  Men&rsquo;s Grooming &amp; Salon Services
                </h3>
              </div>
              <p data-reveal className="lead">
                Our unisex salon for men in Thanjavur offers sharp haircuts, expert beard styling
                and trimming, facial treatments, and complete grooming packages for the modern man
                who wants to look effortlessly put-together.
              </p>
              <ul className="tick-list" data-reveal>
                {[
                  "Precision cuts & modern styling",
                  "Beard shaping, colouring & executive shave",
                  "Manly Radiance & detox charcoal facials",
                  "Reflexology, mani-pedi & the Gentlemen's Club combo",
                ].map((t) => (
                  <li key={t}>
                    <Icon name="check" size={15} />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="split__actions" data-reveal>
                <Btn to="/mens-grooming">Explore Men&rsquo;s Grooming</Btn>
                <ArrowLink to="/book">Book Your Session</ArrowLink>
              </div>
            </div>

            <div className="split__media split__media--sm">
              <Figure
                src={IMG.mensGrooming}
                alt="Men's haircut and grooming service in Thanjavur"
                ratio="portrait"
                framed
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- 10 · Why choose Naturals ----------------------------------- */}
      <section className="section section--alt" aria-labelledby="why-title">
        <div className="container">
          {/* Heading to one side rather than centred over the grid: six reasons
              centred read as a brochure, while a held column beside them reads
              as an argument being made. The heading stays put as the reasons
              scroll past it. */}
          <div className="why-split">
            <div className="why-split__head" data-reveal>
              <Chapter>Why Us</Chapter>
              <h2 id="why-title" className="why-split__title">
                Why Thanjavur Trusts Naturals
              </h2>
              <p className="why-split__text">
                Six reasons thousands of clients across the city keep coming back to us.
              </p>
              <div className="why-split__actions">
                <Btn to="/about" variant="outline" size="sm">
                  Our Story
                </Btn>
              </div>
            </div>

            <ul className="why-grid stagger">
              {WHY_US.map((item, i) => (
                <li key={item.title} className="why-card" data-reveal>
                  <span className="why-card__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="why-card__title">{item.title}</h3>
                  <p className="why-card__text">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 06 above is already a copy-beside-media split, so this one
          does not repeat it. The copy is held in one narrow column and the
          photography runs beneath it as a three-frame band — the quietest
          composition on the page, which is the subject. */}
      <section className="section section--dark spa" aria-labelledby="spa-title">
        <div className="container">
          <div className="spa__head">
            <div data-reveal>
              <Chapter>Spa &amp; Wellness</Chapter>
              <h2 id="spa-title" className="spa__title">
                Spa &amp; Wellness Therapies in Thanjavur
              </h2>
            </div>
            <div className="spa__aside">
              <p className="spa__text" data-reveal>
                Unwind with our range of spa treatments, including relaxing body spa therapies
                and skin-nourishing facials — a peaceful escape without leaving the city.
              </p>
              <div className="spa__actions" data-reveal>
                <Btn href={CONTACT.phoneHref} variant="light" icon="phone">
                  Call Now!
                </Btn>
                <ArrowLink to="/womens-services">See Spa Services</ArrowLink>
              </div>
            </div>
          </div>
      
          <ul className="spa__band stagger">
            {SPA_FRAMES.map((f) => (
              <li key={f.label} data-reveal="fade">
                <img src={f.src} alt={f.alt} loading="lazy" decoding="async" />
                <span className="spa__label">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- 12 · Gallery rail ------------------------------------------ */}
      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHeading
            eyebrow={<Chapter>Our Work</Chapter>}
            title="Real Transformations, Real Clients"
            titleId="gallery-title"
            text="Bridal makeovers, precision haircuts, spa sessions and grooming transformations — straight from our chairs."
            split
            aside={
              <Btn to="/gallery" variant="outline" size="sm">
                View Full Gallery
              </Btn>
            }
          />
        </div>

        {/* A composed mosaic rather than a scrolling rail. A rail hides most of
            the work off the right edge and asks to be dragged; a mosaic shows
            the range in one look, with the lead frame carrying the section. */}
        <div className="container">
          <ul className="mosaic stagger">
            {RAIL.slice(0, 7).map((img, i) => (
              <li
                key={`${img.src}-${i}`}
                className={`mosaic__item${i === 0 ? " mosaic__item--lead" : ""}`}
                data-reveal="fade"
              >
                <Link to="/gallery">
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="container rail__foot">
          <p className="form-note" data-reveal="fade">
            Ready to be our next transformation story?{" "}
            <Link className="inline-link" to="/book">
              Book your appointment
            </Link>{" "}
            at Naturals Thanjavur today.
          </p>
        </div>
      </section>

      {/* ---- 13 · Testimonials, FAQ, location, CTA ---------------------- */}
      <Testimonials />
      <FaqSection title="Frequently Asked Questions (FAQs)" />
      <LocationSection />
      <CtaBanner />
    </div>
  );
}
