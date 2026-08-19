import PageHero from "../components/PageHero";
import Icon from "../components/Icon";
import { CtaBanner, FaqSection } from "../components/Blocks";
import { ArrowLink, Btn, Eyebrow, SectionHeading } from "../components/Ui";
import { OCCASION_SERVICES } from "../data/services";
import { CONTACT, PAGE_FAQS } from "../data/site";
import { faqSchema, localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema(CONTACT), faqSchema(PAGE_FAQS.bridal)],
};

const JOURNEY = [
  {
    t: "Consultation",
    d: "We talk through your outfit, jewellery, venue lighting and the look you have in mind.",
  },
  {
    t: "Trial Session",
    d: "A personalised trial so there are no surprises on the morning itself. Adjust anything you want changed.",
  },
  {
    t: "The Day",
    d: "Makeup, hairdo and draping done to schedule, built to hold through a long day and photograph well.",
  },
  {
    t: "Touch-ups",
    d: "Finishing checks before you step out, so every frame looks the way you pictured it.",
  },
];

/** The same run of services the statement paragraph names, set as a rule so it
    can be scanned instead of read. */
const COVERS = ["Bride", "Groom", "Saree Draping", "Hairdo", "Mehandi"];

export default function Bridal() {
  useSeo({
    title: "Bridal Makeup Artist in Thanjavur | Naturals Bridal Makeover",
    description:
      "Bridal makeup, groom makeup, saree draping, hairdo and mehandi at Naturals Thanjavur. Camera-ready bridal makeovers with personalised trial sessions. Book your bridal package.",
    path: "/bridal-makeover",
    keywords: PAGE_KEYWORDS.bridal,
    image: IMG.makeup,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Glam Up Your Special Day"
        title="Bridal Makeup Artist in Thanjavur"
        text="Your perfect wedding look — flawless, camera-ready makeup tailored to your outfit, skin tone and style."
        image={IMG.bridalMakeover}
        alt="Bridal makeover by Naturals Thanjavur makeup artists"
        trail={[{ label: "Bridal" }]}
      />

      {/* ---- Statement --------------------------------------------------- */}
      <section className="section vow">
        <div className="container vow__grid">
          <div className="vow__media" data-reveal>
            <img
              src={IMG.bridalPortrait}
              alt="Bride in full bridal makeup and jewellery at Naturals Thanjavur"
              loading="lazy"
              decoding="async"
            />
            {/* The single fact a bride is scanning for, put on the picture
                rather than buried in the paragraph below it. */}
            <span className="vow__badge">
              <Icon name="sparkle" size={16} />
              Trial session included
            </span>
          </div>

          <div className="vow__copy" data-reveal>
            <Eyebrow>Your Day</Eyebrow>
            <h2 className="vow__title">
              Your day. Your moment. <em>Your transformation.</em>
            </h2>
            <p className="vow__lead lead">
              From engagement to wedding day, our bridal packages include personalized trial
              sessions. Walk down the aisle with total confidence.
            </p>
            <p className="vow__text">
              As a bridal makeover salon in Thanjavur, we handle the whole day — a wedding makeup
              artist for the bride, groom makeup, saree draping, hairdo and mehandi — so you
              aren&rsquo;t coordinating four suppliers on the busiest morning of your life.
            </p>

            {/* The same list as the sentence above, set as a rule so it can be
                scanned rather than read. */}
            <ul className="vow__covers">
              {COVERS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <div className="vow__actions">
              <Btn to="/book" size="lg" icon="calendar">
                Book Your Bridal Trial
              </Btn>
              <Btn href={CONTACT.phoneHref} variant="outline" size="lg" icon="phone">
                Call Us
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Occasion services ------------------------------------------- */}
      <section className="section section--dark occ-photo" aria-labelledby="occasion-services">
        <div className="occ-photo__bg" aria-hidden="true">
          <img src={IMG.bridalMakeover} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="container occ-photo__inner">
          <SectionHeading
            eyebrow="What We Offer"
            title="Bridal & Special Occasion Services"
            titleId="occasion-services"
            text="Make every celebration unforgettable with our special occasion services, crafted by experienced bridal makeup artists in Thanjavur."
            split
          />

          <ul className="occ-checklist stagger">
            {OCCASION_SERVICES.map((s) => (
              <li key={s.name} data-reveal>
                <div className="occ-checklist__head">
                  <Icon name="check" size={16} />
                  <h3>{s.name}</h3>
                </div>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Journey ----------------------------------------------------- */}
      <section className="section journey" aria-labelledby="journey-title">
        <span className="journey__glow" aria-hidden="true" />

        <div className="container">
          <div className="journey__head" data-reveal>
            <Eyebrow>The Bridal Journey</Eyebrow>
            <h2 id="journey-title" className="journey__title">
              From first consultation to final touch-up
            </h2>
          </div>

          {/* Read as a timeline rather than a stacked list: four steps on one
              rule, so the whole run is visible at a glance. */}
          <ol className="journey__track stagger">
            {JOURNEY.map((s, i) => (
              <li className="journey__step" key={s.t} data-reveal>
                <span className="journey__node" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="journey__step-title">{s.t}</h3>
                <p className="journey__step-text">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="journey__actions" data-reveal>
            <Btn to="/book" icon="calendar">
              Book Your Trial
            </Btn>
            <ArrowLink to="/gallery">See Bridal Gallery</ArrowLink>
            {/* Brides routinely browse the general hair and skin menu on the
                way to the date — the reciprocal link back from Women's
                Services already exists. */}
            <ArrowLink to="/services/womens">Women&rsquo;s Services</ArrowLink>
          </div>
        </div>
      </section>

      <FaqSection items={PAGE_FAQS.bridal} title="Bridal Questions, Answered" />

      <CtaBanner
        eyebrow="Your Wedding Day"
        title="Let's Plan Your Bridal Look"
        text="Book a trial session with our bridal team and walk into your wedding day with total confidence."
      />
    </>
  );
}
