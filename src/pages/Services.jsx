import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Icon from "../components/Icon";
import { Accordion, CtaBanner } from "../components/Blocks";
import { ArrowLink, Btn, Eyebrow, SectionHeading } from "../components/Ui";
import {
  MENS_SERVICES,
  OCCASION_SERVICES,
  priceFor,
  PRICING_DISCLAIMER,
  PRICING_NOTE,
  WOMENS_SERVICES,
} from "../data/services";
import { CONTACT, WHY_US } from "../data/site";
import { localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = localBusinessSchema(CONTACT);

/**
 * Sub-service list rendered inside each accordion panel — one row per
 * individual service with its price, so the page delivers the full rate card
 * without a download. `priceFor` returns null until the real card is loaded
 * into `PRICES`, in which case the row reads "On request" rather than an
 * invented figure.
 */
function CategoryDetail({ item }) {
  return (
    <>
      <ul className="detail-list">
        {item.items.map((sub) => {
          const price = priceFor(item.slug, sub);
          return (
            <li key={sub}>
              <Icon name="check" size={13} />
              <span className="detail-list__name">{sub}</span>
              <span className="detail-list__price">{price ?? "On request"}</span>
            </li>
          );
        })}
      </ul>
      <p className="detail-price">{PRICING_DISCLAIMER}</p>
    </>
  );
}

function ServiceGroup({ id, eyebrow, title, intro, items, to, cta }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          titleId={`${id}-title`}
          text={intro}
          split
          aside={
            <Btn to={to} variant="outline" size="sm">
              View {eyebrow} Page
            </Btn>
          }
        />

        <div className="svc-grid stagger">
          {items.map((s) => (
            <article key={s.slug} className="svc-card" data-reveal>
              <div className="svc-card__media">
                <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
                <span className="svc-card__tag">{eyebrow}</span>
              </div>
              <div className="svc-card__body">
                <h3 className="svc-card__title">{s.name}</h3>
                {/* Full category copy from the content document — the abridged
                    `summary` is kept for the compact cards elsewhere. */}
                <p className="svc-card__text">{s.text}</p>
                <div className="svc-card__foot">
                  <Link className="link-arrow svc-card__link" to={`${to}#${s.slug}`}>
                    <span>Explore</span>
                    <Icon name="arrowUpRight" size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="detail-block" data-reveal>
          <div className="detail-block__head">
            <h3>View detailed services &amp; pricing</h3>
            <p className="form-note">
              Every sub-service we offer in this range. {PRICING_DISCLAIMER}
            </p>
          </div>
          <Accordion items={items} renderBody={(item) => <CategoryDetail item={item} />} />
        </div>

        <div className="group-cta" data-reveal="fade">
          <Btn to="/book" icon="calendar">
            {cta}
          </Btn>
          <ArrowLink href={CONTACT.phoneHref}>Or call {CONTACT.phoneDisplay}</ArrowLink>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  useSeo({
    title: "Our Services | Naturals Salon Thanjavur",
    description:
      "Explore Naturals Thanjavur's full range of hair styling, bridal makeup, facials, spa, and grooming services for men and women. Book your appointment today.",
    path: "/services",
    keywords: PAGE_KEYWORDS.services,
    image: IMG.hairstyle,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Everything We Offer"
        title="Our Services – Premium Hair, Beauty & Grooming in Thanjavur"
        text="From expert hair styling to bridal makeup and complete grooming solutions, Naturals Thanjavur offers a full range of services for men and women, all delivered by certified professionals using premium products."
        image={IMG.hairstyle}
        alt="Professional hair styling service at Naturals Thanjavur"
        trail={[{ label: "Services" }]}
      >
        <div className="page-hero__jump">
          <Link to="/services/womens">Women&rsquo;s</Link>
          <Link to="/services/mens">Men&rsquo;s</Link>
          <Link to="/services/occasion">Special Day</Link>
        </div>
      </PageHero>

      <ServiceGroup
        id="womens"
        eyebrow="Women's"
        title="Women's Services"
        intro="Tailored beauty and hair care services designed for every woman, crafted with premium products and modern techniques."
        items={WOMENS_SERVICES}
        to="/womens-services"
        cta="Book Your Service"
      />

      <div className="rule-band" aria-hidden="true">
        <div className="container">
          <span />
        </div>
      </div>

      <ServiceGroup
        id="mens"
        eyebrow="Men's"
        title="Men's Services"
        intro="Complete grooming solutions for the modern man, from classic cuts to relaxing spa therapies."
        items={MENS_SERVICES}
        to="/mens-grooming"
        cta="Book Your Service"
      />

      {/* ---- Glam up your special day ------------------------------------ */}
      <section className="section section--dark" id="occasion" aria-labelledby="occasion-title">
        <div className="container">
          <div className="occasion">
            <div className="occasion__copy">
              <div data-reveal>
                <Eyebrow>Special Occasions</Eyebrow>
                <h2 id="occasion-title">Glam Up Your Special Day</h2>
              </div>
              <p className="lead" data-reveal>
                Make every celebration unforgettable with our special occasion services, crafted by
                experienced bridal makeup artists in Thanjavur.
              </p>
              <div className="split__actions" data-reveal>
                <Btn to="/bridal-makeover" variant="light">
                  Explore Bridal Services
                </Btn>
                <ArrowLink to="/book">Book Your Special Occasion Package</ArrowLink>
              </div>
            </div>

            <ul className="occasion__list stagger">
              {OCCASION_SERVICES.map((s, i) => (
                <li key={s.name} data-reveal>
                  <span className="occasion__num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="occasion__name">{s.name}</h3>
                    <p className="occasion__text">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Why choose Naturals -----------------------------------------
           A specification sheet, not a grid of cards. This section closes a
           page that is otherwise entirely lists of treatments, and the six
           reasons are the terms those treatments are delivered under — so they
           are set as ruled entries with the numeral, the standard and what it
           means in three columns, the way a spec is read rather than the way a
           feature is sold. The homepage argues the same six points as a
           narrative beside a sticky claim; here they are the small print, and
           they are set like it. */}
      <section className="section section--alt standards" aria-labelledby="why-services">
        <div className="container">
          <header className="standards__head">
            <div data-reveal>
              <Eyebrow>Why Us</Eyebrow>
              <h2 id="why-services" className="standards__title">
                Why Choose Naturals?
              </h2>
            </div>
            <p className="standards__lead" data-reveal>
              The standards behind every service on this page.
            </p>
          </header>

          <ol className="standards__list">
            {WHY_US.map((item, i) => (
              <li key={item.title} className="standard" data-reveal="fade">
                <span className="standard__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="standard__title">{item.title}</h3>
                <p className="standard__text">{item.text}</p>
              </li>
            ))}
          </ol>

          <p className="pricing-note pricing-note--center" data-reveal="fade">
            <Icon name="sparkle" size={15} />
            {PRICING_NOTE}
          </p>
        </div>
      </section>

      <CtaBanner title="Ready to Transform Your Look?" />
    </>
  );
}
