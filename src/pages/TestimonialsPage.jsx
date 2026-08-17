import PageHero from "../components/PageHero";
import Icon from "../components/Icon";
import { CtaBanner, StatsRow, Testimonials } from "../components/Blocks";
import { Btn, Eyebrow, SectionHeading } from "../components/Ui";
import { CONTACT, GOOGLE_BUSINESS, TESTIMONIALS, WHATSAPP } from "../data/site";
import { GALLERY_GROUPS } from "../data/services";
import { localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = localBusinessSchema(CONTACT);

/** A few work shots to break up the wall of text. */
const PROOF = GALLERY_GROUPS.flatMap((g) => g.images).slice(0, 4);

export default function TestimonialsPage() {
  useSeo({
    title: "Customer Reviews & Testimonials | Naturals Salon Thanjavur",
    description:
      "Read what customers across Thanjavur say about Naturals — bridal makeovers, hair treatments and men's grooming, reviewed by the people who booked them.",
    path: "/testimonials",
    keywords: PAGE_KEYWORDS.testimonials,
    image: IMG.makeup,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Client Stories"
        title="What Our Customers Say"
        text="Three years of work, judged by the only people whose opinion counts — the clients who sat in the chair."
        image={IMG.makeup}
        alt="Bridal makeover by Naturals Thanjavur makeup artists"
        trail={[{ label: "Testimonials" }]}
      />

      {/* ---- Every review we have ----------------------------------------- */}
      <section className="section" aria-labelledby="all-reviews-title">
        <div className="container">
          <SectionHeading
            eyebrow="In Their Words"
            title="Reviews From Thanjavur"
            titleId="all-reviews-title"
            text="Every review below is a real, published customer review. We don't write our own."
            split
            aside={
              GOOGLE_BUSINESS.reviewsUrl ? (
                <Btn
                  href={GOOGLE_BUSINESS.reviewsUrl}
                  variant="outline"
                  size="sm"
                  icon="arrowUpRight"
                >
                  Read them on Google
                </Btn>
              ) : null
            }
          />

          <ul className="review-grid stagger">
            {TESTIMONIALS.map((t) => (
              <li key={t.name} className="review-card" data-reveal>
                <Icon name="quote" size={28} className="review-card__mark" />
                <p className="review-card__text">{t.text}</p>
                <div className="review-card__by">
                  <span
                    className="review-card__stars"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Icon key={i} name="star" size={14} fill="currentColor" stroke={0} />
                    ))}
                  </span>
                  <span className="review-card__name">{t.name}</span>
                  <span className="review-card__service">{t.service}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Only three reviews were ever published on the salon's own site.
              Rather than pad the grid, ask for the next one. */}
          <div className="review-invite" data-reveal="fade">
            <div>
              <h2 className="review-invite__title">Been in recently?</h2>
              <p className="review-invite__text">
                A short review helps other people in Thanjavur find us — and tells us what to keep
                doing. It takes a minute.
              </p>
            </div>
            <div className="review-invite__actions">
              {GOOGLE_BUSINESS.reviewsUrl ? (
                <Btn href={GOOGLE_BUSINESS.reviewsUrl} size="sm" icon="arrowUpRight">
                  Leave a Google review
                </Btn>
              ) : null}
              <Btn href={WHATSAPP} variant="outline" size="sm" icon="whatsapp">
                Send us your feedback
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Featured quote rotator ---------------------------------------- */}
      <Testimonials />

      {/* ---- The numbers behind them --------------------------------------- */}
      <section className="section section--tight section--dark" aria-labelledby="proof-title">
        <div className="container">
          <div className="numbers">
            <div className="numbers__head" data-reveal>
              <Eyebrow>The Record</Eyebrow>
              <h2 id="proof-title" className="numbers__title">
                Trusted Across Thanjavur
              </h2>
            </div>
            <StatsRow />
          </div>
        </div>
      </section>

      {/* ---- Visual proof --------------------------------------------------- */}
      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <SectionHeading
            eyebrow="See For Yourself"
            title="The Work Behind the Reviews"
            titleId="work-title"
            text="Bridal makeovers, hair transformations, grooming and spa sessions from our chairs."
            split
            aside={
              <Btn to="/gallery" variant="outline" size="sm">
                View Full Gallery
              </Btn>
            }
          />

          {/* Same tile as the Gallery page, so the two read as one system. */}
          <ul className="gal-grid stagger">
            {PROOF.map((img) => (
              <li key={img.src} className="gal-item" data-reveal>
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        eyebrow="Your Turn"
        title="Be Our Next Five-Star Review"
        text="Book your appointment at Naturals Thanjavur and find out why thousands of clients keep coming back."
      />
    </>
  );
}
