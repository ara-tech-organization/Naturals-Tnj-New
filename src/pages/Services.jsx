import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import ServiceMenu from "../components/ServiceMenu";
import { CtaBanner, FaqSection } from "../components/Blocks";
import { ArrowLink, Btn, Eyebrow, SectionHeading } from "../components/Ui";
import { MENS_SERVICES, OCCASION_SERVICES, WOMENS_SERVICES } from "../data/services";
import { CONTACT, PAGE_FAQS } from "../data/site";
import { faqSchema, localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SERVICE_FAQS = [...PAGE_FAQS.womens, ...PAGE_FAQS.mens];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema(CONTACT), faqSchema(SERVICE_FAQS)],
};

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
        title="Salon Services in Thanjavur"
        text="Hair styling, bridal makeup, spa and grooming for men and women — delivered by certified professionals using premium products."
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

      {/* ---- Intro --------------------------------------------------------
          One shared intro rather than a separate editorial block per
          audience — the keyword-rich copy both former standalone pages
          opened with, condensed into a single paragraph pair now that both
          live on this one page. */}
      <section className="section section--tight">
        <div className="container">
          <div className="intro-split">
            <div data-reveal>
              <Eyebrow>Unisex Salon In Thanjavur</Eyebrow>
              <h2 className="intro-split__title">
                Everyday care, unforgettable looks.
              </h2>
            </div>
            <div className="intro-split__body">
              <p className="lead" data-reveal>
                As a trusted beauty parlour for women and a complete unisex salon for men in
                Thanjavur, we cover hair, colour, texture, facials, spa and mani-pedi for her, and
                sharp cuts, beard work and grooming packages for him — all under one roof.
              </p>
              <p data-reveal>
                Every appointment starts with a consultation so the service is matched to your hair
                type, skin type and the look you actually want. Select a category below to see
                what&rsquo;s included.
              </p>
              <div className="split__actions" data-reveal>
                <Btn to="/book" icon="calendar">
                  Book Your Service
                </Btn>
                <ArrowLink href={CONTACT.phoneHref}>Or call {CONTACT.phoneDisplay}</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Women's services ---------------------------------------------- */}
      <section className="section section--alt" id="womens" aria-labelledby="womens-title">
        <div className="container">
          <SectionHeading
            eyebrow="Women's"
            title="Women's Services"
            titleId="womens-title"
            text="Tailored beauty and hair care services designed for every woman, crafted with premium products and modern techniques."
            split
          />
          <ServiceMenu items={WOMENS_SERVICES} ctaLabel="Book Your Service" />
        </div>
      </section>

      <div className="rule-band" aria-hidden="true">
        <div className="container">
          <span />
        </div>
      </div>

      {/* ---- Men's services -------------------------------------------------- */}
      <section className="section" id="mens" aria-labelledby="mens-title">
        <div className="container">
          <SectionHeading
            eyebrow="Men's"
            title="Men's Services"
            titleId="mens-title"
            text="Complete grooming solutions for the modern man, from classic cuts to relaxing spa therapies."
            split
          />
          <ServiceMenu items={MENS_SERVICES} ctaLabel="Book This Service" />
        </div>
      </section>

      {/* ---- Glam up your special day ------------------------------------ */}
      <section className="section section--dark" id="occasion" aria-labelledby="occasion-title">
        <div className="container">
          <SectionHeading
            eyebrow="Special Occasions"
            title="Glam Up Your Special Day"
            titleId="occasion-title"
            text="Make every celebration unforgettable with our special occasion services, crafted by experienced bridal makeup artists in Thanjavur."
            split
            aside={
              <div className="split__actions">
                <Btn to="/bridal-makeover" variant="light">
                  Explore Bridal Services
                </Btn>
                <ArrowLink to="/book">Book Your Special Occasion Package</ArrowLink>
              </div>
            }
          />

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
      </section>

      <FaqSection items={SERVICE_FAQS} title="Services — Your Questions Answered" />

      <CtaBanner title="Ready to Transform Your Look?" />
    </>
  );
}
