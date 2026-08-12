import PageHero from "../components/PageHero";
import ServiceMenu from "../components/ServiceMenu";
import { CtaBanner, FaqSection } from "../components/Blocks";
import { ArrowLink, Btn, Eyebrow, Figure, SectionHeading } from "../components/Ui";
import Icon from "../components/Icon";
import { MENS_SERVICES } from "../data/services";
import { CONTACT, PAGE_FAQS } from "../data/site";
import { faqSchema, localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema(CONTACT), faqSchema(PAGE_FAQS.mens)],
};

const HIGHLIGHTS = [
  {
    title: "Cuts that hold their shape",
    text: "Classic technique with a contemporary finish, cut to your hair growth and face shape.",
  },
  {
    title: "Beard & moustache work",
    text: "Shaping, trimming and colouring — plus the Executive Shave with express clean-up.",
  },
  {
    title: "Facials built for men's skin",
    text: "Manly Radiance and Detox Charcoal target dullness, daily grime and uneven tone.",
  },
  {
    title: "Recovery treatments",
    text: "Head massage, hair spa, reflexology and the Gentlemen's Club grooming combo.",
  },
];

export default function MensGrooming() {
  useSeo({
    title: "Men's Salon & Grooming Services in Thanjavur | Naturals",
    description:
      "Sharp haircuts, beard styling, colouring, facials, hair spa and grooming packages for men at Naturals Thanjavur — a complete unisex salon for men. Book your slot today.",
    path: "/mens-grooming",
    keywords: PAGE_KEYWORDS.mensGrooming,
    image: IMG.mensGrooming,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="For Him"
        title="Men's Grooming & Salon Services in Thanjavur"
        text="Complete grooming solutions for the modern man, from classic cuts to relaxing spa therapies."
        image={IMG.mensGroomingHero}
        alt="Men's haircut and grooming service in Thanjavur"
        trail={[{ label: "Services", to: "/services" }, { label: "Men's Grooming" }]}
      />

      {/* ---- Intro: copy left, four highlights right --------------------- */}
      <section className="section section--tight">
        <div className="container">
          <div className="intro-split">
            <div data-reveal>
              <Eyebrow>Unisex Salon For Men</Eyebrow>
              <h2 className="intro-split__title">
                Effortlessly put-together, every time you leave the chair.
              </h2>
            </div>
            <div className="intro-split__body">
              <p className="lead" data-reveal>
                Our unisex salon for men in Thanjavur offers sharp haircuts, expert beard styling
                and trimming, facial treatments, and complete grooming packages for the modern man
                who wants to look effortlessly put-together.
              </p>
              <p data-reveal>
                Whether you&rsquo;re after a straightforward haircut for men in Thanjavur, a beard
                styling salon that gets the shape right, or men&rsquo;s facial treatment built for
                thicker, oilier skin, it&rsquo;s all handled by the same trained team — a men&rsquo;s
                skin care salon and barber in one chair.
              </p>
              <div className="split__actions" data-reveal>
                <Btn to="/book" icon="calendar">
                  Book Your Service
                </Btn>
                <ArrowLink href={CONTACT.phoneHref}>Call {CONTACT.phoneDisplay}</ArrowLink>
              </div>
            </div>
          </div>

          <ul className="highlight-grid stagger">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title} className="highlight" data-reveal>
                <Icon name="scissors" size={19} />
                <h3 className="highlight__title">{h.title}</h3>
                <p className="highlight__text">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Category rows ---------------------------------------------- */}
      <section className="section section--alt" aria-labelledby="mens-cats">
        <div className="container">
          <SectionHeading
            eyebrow="Our Services"
            title="Men's Services"
            titleId="mens-cats"
            text="Twelve service families, from the everyday cut to full grooming rituals."
          />
          <ServiceMenu items={MENS_SERVICES} ctaLabel="Book This Service" />
        </div>
      </section>

      {/* ---- Experience -------------------------------------------------- */}
      <section className="section section--dark">
        <div className="container">
          <div className="split split--reverse">
            <div className="split__copy">
              <div data-reveal>
                <Eyebrow>The Experience</Eyebrow>
                <h2>What to expect on your visit</h2>
              </div>
              <ul className="step-list" data-reveal>
                {[
                  {
                    t: "Consultation",
                    d: "We look at your hair growth, texture and routine before anything starts.",
                  },
                  {
                    t: "The service",
                    d: "Carried out by a certified stylist using premium, skin-friendly products.",
                  },
                  {
                    t: "Finish & aftercare",
                    d: "Styling, a finished look you can repeat at home, and honest upkeep advice.",
                  },
                ].map((s, i) => (
                  <li key={s.t}>
                    <span className="step-list__num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="step-list__title">{s.t}</h3>
                      <p className="step-list__text">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="split__actions" data-reveal>
                <Btn to="/book" variant="light" icon="calendar">
                  Book Your Session
                </Btn>
              </div>
            </div>

            <div className="split__media">
              <Figure
                src={IMG.mensGrooming}
                alt="Beard styling and grooming for men at Naturals Thanjavur"
                ratio="square"
                className="figure--capped"
              />
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={PAGE_FAQS.mens} title="Men's Grooming — Your Questions Answered" />

      <CtaBanner
        eyebrow="Your Appointment"
        title="Book Your Grooming Session"
        text="Walk-ins are welcome, but booking ahead secures your preferred barber and time slot."
      />
    </>
  );
}
