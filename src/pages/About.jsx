import PageHero from "../components/PageHero";
import Icon from "../components/Icon";
import { CtaBanner, StatsRow, Testimonials } from "../components/Blocks";
import { ArrowLink, Btn, Eyebrow, Figure, SectionHeading } from "../components/Ui";
import { BRAND, CONTACT, CORE_VALUES } from "../data/site";
import { localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = localBusinessSchema(CONTACT);

const ACHIEVEMENTS = [
  { icon: "award", title: "3+ Years of Service", text: "Serving Thanjavur continuously since 2023." },
  { icon: "users", title: "10,000+ Clients", text: "Trusted across Thanjavur and nearby districts." },
  { icon: "heart", title: "100+ Bridal Works", text: "Bridal makeovers delivered for the city's weddings." },
  { icon: "shield", title: "Multiple Branches", text: "Grown from one parlour into a multi-branch unisex salon." },
];

export default function About() {
  useSeo({
    title: "About Us | Naturals Salon Thanjavur",
    description:
      "Discover the story behind Naturals, Thanjavur's trusted unisex salon since 2023 - expert hair, bridal & spa care with 3+ years of excellence.",
    path: "/about",
    keywords: PAGE_KEYWORDS.about,
    image: IMG.story,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow={`Since ${BRAND.since}`}
        title="About Naturals Thanjavur"
        text="What began as a modest beauty parlour has grown into one of Thanjavur's most trusted unisex salons."
        image={IMG.story}
        alt="Inside Naturals Thanjavur, the city's trusted unisex salon"
        trail={[{ label: "About" }]}
      />

      {/* ---- Our story --------------------------------------------------- */}
      <section className="section" aria-labelledby="story-title">
        <div className="container">
          <div className="story story--reverse">
            <div className="story__copy">
              <div data-reveal>
                <Eyebrow>Grown By Word Of Mouth</Eyebrow>
                <h2 id="story-title" className="story__title">
                  Our Story
                </h2>
              </div>
              <p className="lead" data-reveal>
                Founded in 2023, Naturals quickly became one of the best salons in Thanjavur for
                beauty and wellness care. What began as a modest beauty parlour has grown into a
                trusted unisex salon with multiple branches across the city.
              </p>
              <p data-reveal>
                Our journey started with one goal: to deliver premium hair salon and beauty parlour
                services that highlight natural beauty and build confidence. Over the years,
                we&rsquo;ve served thousands of happy customers, earning trust through quality and
                exceptional care.
              </p>
              <p data-reveal>
                Today, we keep evolving with the latest styling trends and techniques, staying true
                to our promise of personalized care and attention to detail — the reason we&rsquo;re
                known as Thanjavur&rsquo;s favorite beauty parlour.
              </p>
              <div className="story__actions" data-reveal>
                <Btn to="/services" variant="outline">
                  Explore Our Services
                </Btn>
                <ArrowLink to="/contact">Visit the Salon</ArrowLink>
              </div>
            </div>

            <div className="story__media">
              <Figure
                src={IMG.saloon}
                alt="Interior of Naturals unisex salon in Thanjavur"
                ratio="tall"
                framed
              />
              <Figure
                src={IMG.hairstyle}
                alt="Professional hair styling service at Naturals Thanjavur"
                ratio="square"
                className="story__media-inset"
                reveal="scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Mission & vision -------------------------------------------- */}
      <section className="section section--dark" aria-labelledby="mv-title">
        <div className="container">
          <span className="sr-only" id="mv-title">
            Our mission and vision
          </span>
          <div className="mv">
            <article className="mv__card" data-reveal>
              <Eyebrow>Beauty That Builds Confidence</Eyebrow>
              <h2 className="mv__title">Our Mission</h2>
              <p className="mv__text">
                To provide exceptional beauty and wellness services that enhance our
                customers&rsquo; natural beauty, boost their confidence, and elevate their overall
                well-being. As a trusted salon in Thanjavur, we deliver personalized experiences
                using premium, skin-friendly products and modern techniques in a clean, hygienic
                environment.
              </p>
            </article>

            <article className="mv__card" data-reveal>
              <Eyebrow>The Best Salon In Thanjavur</Eyebrow>
              <h2 className="mv__title">Our Vision</h2>
              <p className="mv__text">
                To be recognized as the best salon in Thanjavur, known for innovative services,
                exceptional customer care, and a genuine commitment to enhancing natural beauty. We
                aim to grow our reach across the city while staying true to our values of quality,
                integrity, and customer satisfaction.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ---- Core values -------------------------------------------------- */}
      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Core Values"
            titleId="values-title"
            text="Four principles that shape how every appointment at Naturals is run."
            center
          />
          <ul className="value-grid stagger">
            {CORE_VALUES.map((v, i) => (
              <li key={v.title} className="value-card" data-reveal>
                <span className="value-card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__text">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Achievements ------------------------------------------------- */}
      <section className="section section--dark" aria-labelledby="ach-title">
        <div className="container">
          <SectionHeading
            eyebrow="Milestones"
            title="Our Achievements"
            titleId="ach-title"
            text="Three years of growth, measured the only way that counts — in clients served."
            center
          />

          <ul className="ach-grid stagger">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title} className="ach-card" data-reveal>
                <Icon name={a.icon} size={24} />
                <h3 className="ach-card__title">{a.title}</h3>
                <p className="ach-card__text">{a.text}</p>
              </li>
            ))}
          </ul>

          <div className="ach-stats">
            <StatsRow />
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBanner
        eyebrow="Come Say Hello"
        title="Visit Naturals Thanjavur"
        text="Step into Naturals, Thanjavur's go-to beauty parlour, and discover a world of style, care, and confidence."
      />
    </>
  );
}
