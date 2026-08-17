import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServiceDiscovery from "../components/ServiceDiscovery";
import Icon from "../components/Icon";
import { ArrowLink, Btn, Chapter, Figure } from "../components/Ui";
import {
  ServicePillars,
  SignatureBridal,
  TransformationReel,
  WhyNarrative,
} from "../components/HomeSections";
import {
  CtaBanner,
  FaqSection,
  LocationSection,
  StatsRow,
  Testimonials,
} from "../components/Blocks";
import { BRAND, CONTACT, FAQS, TRUST_POINTS } from "../data/site";
import { POPULAR_SERVICES } from "../data/services";
import { faqSchema, localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema(CONTACT), faqSchema(FAQS)],
};

/** The three treatments the spa band shows. Kept out of the markup so the
 *  section stays a head and a list. */
const SPA_FRAMES = [
  { src: IMG.spa, alt: "Relaxing spa therapy at Naturals Thanjavur salon", label: "Body Spa" },
  { src: IMG.reflexology, alt: "Reflexology therapy at Naturals Thanjavur", label: "Reflexology" },
  { src: IMG.wellness, alt: "Scalp and hair ritual at Naturals Thanjavur", label: "Hair Ritual" },
];

/**
 * HOME — THE BEAUTY TRANSFORMATION JOURNEY
 *
 * The page is composed as one journey rather than a stack of bands, and the
 * order below is that journey: arrival, discovery, expertise, transformation,
 * experience, trust, booking. Each movement changes register — dark plate to
 * ruled ivory to sand to full-bleed photography — so the reader always knows
 * they have crossed into something new without being told.
 *
 * Its content is the content document's homepage, complete: the H1 and its
 * three keyword-themed variants in the hero, the trust bar, the welcome H2,
 * all sixteen catalogue categories with their treatments, the four service
 * lanes, spa and wellness, the six reasons, the four figures, the reviews, the
 * gallery, the ten FAQs, the location and the closing call. Nothing was cut to
 * make the design quieter; where a section had more to say than a card could
 * hold, the section changed shape instead.
 */
export default function Home() {
  useSeo({
    title: "Best Unisex Salon for Hair, Bridal & Spa | Naturals Salon Thanjavur",
    description:
      "Experience premium hair styling, bridal makeovers, spa therapies & men's grooming at Naturals Thanjavur. 3+ years of trusted expertise. Book your appointment today!",
    path: "/",
    keywords: PAGE_KEYWORDS.home,
    image: IMG.hairstyle,
    schema: SCHEMA,
  });

  return (
    // `editorial` keeps the magazine register defined in styles/editorial.css
    // for the sections that predate the journey; styles/home.css carries the
    // new ones. Both are scoped, so no other page moves.
    <div className="editorial">
      {/* ---- ARRIVAL ---------------------------------------------------- */}
      <Hero />

      {/* Trust bar / USP strip, verbatim from the content document. Set as a
          caption line under the opening plate rather than a coloured band. */}
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

      {/* ---- DISCOVERY · the welcome spread ------------------------------ */}
      <section className="section welcome" id="welcome" aria-labelledby="welcome-title">
        <div className="container">
          <header className="welcome__head">
            <div className="welcome__head-main" data-reveal>
              <Chapter>The Naturals Experience</Chapter>
              <h2 id="welcome-title" className="welcome__title">
                Welcome to Naturals — Thanjavur&rsquo;s Preferred <em>Unisex Salon</em>
              </h2>
            </div>

            <div className="welcome__head-aside" data-reveal>
              <p className="welcome__standfirst">
                As a leading unisex salon in Thanjavur, Naturals combines global styling expertise
                with a personal touch that keeps thousands of customers coming back.
              </p>
              <p className="welcome__sign">Serving the city since {BRAND.since}</p>
            </div>
          </header>

          <div className="welcome__body">
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
                Three years in one city, and the same question at every chair: what do you
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

      {/* ---- EXPERTISE · the catalogue, category by category -------------- */}
      <ServiceDiscovery />

      {/* Two of the document's four service pillars — the other two, men's
          and bridal, each hold a band of their own further down. */}
      <ServicePillars />

      {/* Popular services strip — the content document asks for it by name,
          linking into the gender-specific menus. Image-led, because a shortcut
          you can see is a better shortcut than a column of links. */}
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

      {/* ---- TRANSFORMATION · the signature plate ------------------------- */}
      <SignatureBridal />

      {/* Men's grooming — its own lane, in the brand's own language rather
          than a switch to an unrelated dark theme. */}
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

      {/* Spa & wellness — the quietest composition on the page, which is the
          subject: one narrow column of copy over a three-frame band. */}
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
                Unwind with our range of spa treatments, including relaxing body spa therapies and
                skin-nourishing facials — a peaceful escape without leaving the city.
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

      {/* ---- EXPERIENCE · the argument, then the evidence ----------------- */}
      <WhyNarrative />

      <section className="section section--tight section--dark" aria-labelledby="numbers-title">
        <div className="container">
          {/* Head sits above the figures rather than beside them: four numbers
              this large need the full measure, and "10,000+" is several times
              the width of "3+", so a narrow column made the row read as ragged. */}
          <div className="numbers">
            <div className="numbers__head" data-reveal>
              <div>
                <Chapter>By The Numbers</Chapter>
                <h2 id="numbers-title" className="numbers__title">
                  Our Success in Numbers
                </h2>
              </div>
              <p className="numbers__text">
                Three years of work in Thanjavur, counted the only way that means anything — in
                the people who came back, and brought someone with them.
              </p>
            </div>
            <StatsRow />
          </div>
        </div>
      </section>

      {/* ---- TRUST · in their words, then in ours ------------------------- */}
      {/* The shared three-card row, the same one About, Bridal and the
          testimonials page carry — so a review reads identically wherever it
          appears on the site. */}
      <Testimonials />
      <TransformationReel />

      {/* ---- BOOKING ----------------------------------------------------- */}
      <FaqSection title="Frequently Asked Questions (FAQs)" />
      <LocationSection />
      <CtaBanner />
    </div>
  );
}
