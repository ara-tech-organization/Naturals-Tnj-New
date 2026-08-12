import PageHero from "../components/PageHero";
import ServiceMenu from "../components/ServiceMenu";
import { CtaBanner, FaqSection, StatsRow } from "../components/Blocks";
import { ArrowLink, Btn, Eyebrow, Figure, SectionHeading } from "../components/Ui";
import { WOMENS_SERVICES } from "../data/services";
import { CONTACT, PAGE_FAQS } from "../data/site";
import { faqSchema, localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema(CONTACT), faqSchema(PAGE_FAQS.womens)],
};

export default function WomensServices() {
  useSeo({
    title: "Women's Salon & Beauty Parlour Services in Thanjavur | Naturals",
    description:
      "Hair styling, colouring, keratin, facials, hair spa, reflexology and mani-pedi for women at Naturals Thanjavur — a trusted ladies beauty parlour in Thanjavur. Book today.",
    path: "/womens-services",
    keywords: PAGE_KEYWORDS.womensServices,
    image: IMG.skincare,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="For Her"
        title="Women's Beauty & Hair Services in Thanjavur"
        text="Tailored beauty and hair care services designed for every woman, crafted with premium products and modern techniques."
        image={IMG.skincare}
        alt="Women's beauty parlour and facial services at Naturals Thanjavur"
        trail={[{ label: "Services", to: "/services" }, { label: "Women's Services" }]}
      />

      {/* ---- Intro ------------------------------------------------------- */}
      <section className="section section--tight">
        <div className="container">
          <div className="intro-split">
            <div data-reveal>
              <Eyebrow>Ladies Beauty Parlour in Thanjavur</Eyebrow>
              <h2 className="intro-split__title">
                Everyday care and once-in-a-lifetime looks, under one roof.
              </h2>
            </div>
            <div className="intro-split__body">
              <p className="lead" data-reveal>
                As a trusted beauty parlour for women in Thanjavur, we offer everything from hair
                spa and skin whitening facials to full body spa treatments, all designed around what
                makes you feel most confident.
              </p>
              <p data-reveal>
                Thirteen service families cover the whole range — cuts and colour, hair smoothening
                in Thanjavur and the rest of our texture work, scalp and hair rituals, facial
                treatment for women including our brightening and skin whitening facial options,
                body polish and de-tan, reflexology, mani-pedi and foot care. As a skin care salon
                in Thanjavur as much as a hair one, every
                appointment starts with a consultation so the service is matched to your hair type,
                skin type and the look you actually want.
              </p>
              <div className="split__actions" data-reveal>
                <Btn to="/book" icon="calendar">
                  Book Your Service
                </Btn>
                <ArrowLink to="/bridal-makeover">Bridal Services</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Category rows ---------------------------------------------- */}
      <section className="section section--alt" aria-labelledby="womens-cats">
        <div className="container">
          <SectionHeading
            eyebrow="Our Services"
            title="Women's Services"
            titleId="womens-cats"
            text="Select a service to see what it includes. Pricing varies by hair length — call us for the current rate card."
            as="h2"
          />
          <ServiceMenu items={WOMENS_SERVICES} ctaLabel="Book Your Service" />
        </div>
      </section>

      {/* ---- Why + stats ------------------------------------------------ */}
      <section className="section section--dark">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Figure
                src={IMG.wellness}
                alt="Hair spa and scalp ritual at Naturals Thanjavur"
                ratio="wide"
              />
            </div>
            <div className="split__copy">
              <div data-reveal>
                <Eyebrow>Trusted Since 2009</Eyebrow>
                <h2>Why women across Thanjavur choose Naturals</h2>
              </div>
              <p className="lead" data-reveal>
                Certified stylists, premium skin-friendly products and a hygienic, comfortable
                environment — the reasons more than 10,000 clients keep coming back.
              </p>
              <div style={{ marginTop: "var(--space-m)" }}>
                <StatsRow />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related ----------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="You Might Also Like" title="Related Services" center />
          <div className="related">
            {[
              {
                to: "/bridal-makeover",
                title: "Bridal & Special Occasions",
                text: "Bridal makeup, saree draping, hairdo and mehandi for your big day.",
                image: IMG.makeup,
                alt: "Bridal makeover by Naturals Thanjavur makeup artists",
              },
              {
                to: "/mens-grooming",
                title: "Men's Grooming",
                text: "Cuts, beard styling, facials and complete grooming for men.",
                image: IMG.mensGrooming,
                alt: "Men's haircut and grooming service in Thanjavur",
              },
              {
                to: "/gallery",
                title: "Our Gallery",
                text: "Real transformations from our chairs across hair, bridal and skin.",
                image: IMG.hairstyle,
                alt: "Before and after hair transformation at Naturals Thanjavur",
              },
            ].map((r) => (
              <article key={r.to} className="svc-card" data-reveal>
                <div className="svc-card__media">
                  <img src={r.image} alt={r.alt} loading="lazy" decoding="async" />
                </div>
                <div className="svc-card__body">
                  <h3 className="svc-card__title">{r.title}</h3>
                  <p className="svc-card__text">{r.text}</p>
                  <div className="svc-card__foot">
                    <ArrowLink to={r.to} className="svc-card__link">
                      Explore
                    </ArrowLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={PAGE_FAQS.womens} title="Women's Services — Your Questions Answered" />

      <CtaBanner
        eyebrow="Your Appointment"
        title="Ready to Transform Your Look?"
      />
    </>
  );
}
