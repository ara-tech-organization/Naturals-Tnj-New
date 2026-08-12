import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Icon from "../components/Icon";
import { CtaBanner } from "../components/Blocks";
import { ArrowLink, Btn, Eyebrow, Figure, SectionHeading } from "../components/Ui";
import { COMBO_PACKAGES } from "../data/services";
import { CONTACT, MEMBERSHIP, WHATSAPP } from "../data/site";
import { localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = localBusinessSchema(CONTACT);

/**
 * How the membership works in practice, as far as the rate card establishes it.
 * These describe the mechanics we can state with confidence; the price, tiers
 * and benefit percentages live in MEMBERSHIP and are deliberately empty until
 * the salon confirms them.
 */
const HOW_IT_WORKS = [
  {
    step: "Ask in salon",
    text: "Mention membership at the counter on your next visit and the team will walk you through the current plan and what it costs.",
  },
  {
    step: "Enrol once",
    text: "Membership is taken out once and then applies to your bookings at Naturals Thanjavur — no need to re-register each visit.",
  },
  {
    step: "Quote it when you book",
    text: "Tell us you're a member when you call or message and we'll apply your rate to the booking before you arrive.",
  },
];

const PACKAGE_IDEAS = [
  {
    title: "Couple's Special",
    text: "Two chairs, one appointment — a package built for couples booking together, referenced on our services menu.",
    to: "/services/occasion",
    image: IMG.spaExperience,
    alt: "Couple's spa and salon package at Naturals Thanjavur",
  },
  {
    title: "Family Care",
    text: "Bring the family in on one booking and we'll sequence the appointments so nobody waits around.",
    to: "/services",
    image: IMG.saloon,
    alt: "Family salon services at Naturals Thanjavur",
  },
  {
    title: "Bridal Packages",
    text: "Bridal, groom, party makeup, saree draping, hairdo and mehandi — bundled and quoted per booking, with a trial session included.",
    to: "/bridal-makeover",
    image: IMG.bridalMakeover,
    alt: "Bridal package at Naturals Thanjavur",
  },
];

export default function Offers() {
  const hasPublishedTerms = MEMBERSHIP.tiers.length > 0 || MEMBERSHIP.offers.length > 0;

  useSeo({
    title: "Offers & Membership | Naturals Salon Thanjavur",
    description:
      "Naturals Thanjavur membership and salon packages — couple's special, family care and bridal bundles. Ask in salon or call +91 90870 00049 for the current plan.",
    path: "/offers",
    keywords: PAGE_KEYWORDS.offers,
    image: IMG.spaExperience,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Offers & Membership"
        title="Membership & Salon Packages"
        text="Our membership programme and package bookings are designed for the clients who come back — better rates on the services you already use, and bundles that make bringing the family in straightforward."
        image={IMG.spaExperience}
        alt="Spa and salon package at Naturals Thanjavur"
        trail={[{ label: "Offers & Membership" }]}
      />

      {/* ---- Membership --------------------------------------------------- */}
      <section className="section" aria-labelledby="member-title">
        <div className="container">
          <div className="split split--equal">
            <div className="split__copy">
              <div data-reveal>
                <Eyebrow>The Programme</Eyebrow>
                <h2 id="member-title">Naturals Membership</h2>
              </div>
              <p className="lead" data-reveal>
                Membership at Naturals Thanjavur gives regulars a better standing rate across the
                menu. It is taken out once in salon and then applies to your bookings from that
                point on.
              </p>

              {hasPublishedTerms ? (
                <ul className="tick-list" data-reveal>
                  {MEMBERSHIP.tiers.map((tier) => (
                    <li key={tier.name}>
                      <Icon name="check" size={15} />
                      <strong>{tier.name}</strong> — {tier.text}
                    </li>
                  ))}
                </ul>
              ) : (
                // No plan pricing or tier structure was supplied in writing, so
                // the page routes the question to the salon rather than
                // printing terms that might not be the ones actually offered.
                <div className="notice notice--inline" data-reveal>
                  <Icon name="sparkle" size={18} />
                  <div>
                    <p className="notice__text">
                      Plan pricing and benefits are confirmed in salon, because they change with
                      the season and with the services included. Call{" "}
                      <a className="inline-link" href={CONTACT.phoneHref}>
                        {CONTACT.phoneDisplay}
                      </a>{" "}
                      or message us and we&rsquo;ll send you the current plan.
                    </p>
                  </div>
                </div>
              )}

              <div className="split__actions" data-reveal>
                <Btn href={CONTACT.phoneHref} icon="phone">
                  Ask about membership
                </Btn>
                <ArrowLink href={WHATSAPP}>Message us on WhatsApp</ArrowLink>
              </div>
            </div>

            <div className="split__media">
              <Figure
                src={IMG.wellness}
                alt="Regular clients at Naturals Thanjavur salon"
                ratio="portrait"
                framed
                className="figure--capped"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Rules that are published ------------------------------------- */}
      <section className="section section--tight section--alt" aria-labelledby="rules-title">
        <div className="container">
          <SectionHeading
            eyebrow="What We Can Confirm"
            title="Membership Terms"
            titleId="rules-title"
            text="These conditions are printed on our rate card and apply to every membership booking."
            center
          />
          <ul className="member-rules stagger">
            {MEMBERSHIP.knownRules.map((rule, i) => (
              <li key={rule} data-reveal>
                <span className="member-rules__num">{String(i + 1).padStart(2, "0")}</span>
                <p>{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- How it works -------------------------------------------------- */}
      <section className="section section--dark" aria-labelledby="how-title">
        <div className="container">
          <SectionHeading
            eyebrow="Three Steps"
            title="How Membership Works"
            titleId="how-title"
            text="No app, no card to lose — the team applies it when you book."
            center
          />
          <ol className="step-list step-list--wide" data-reveal>
            {HOW_IT_WORKS.map((s, i) => (
              <li key={s.step}>
                <span className="step-list__num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="step-list__title">{s.step}</h3>
                  <p className="step-list__text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Special packages & combos ------------------------------------- */}
      <section className="section" id="packages" aria-labelledby="combos-title">
        <div className="container">
          <SectionHeading
            eyebrow="Special Packages"
            title="Packages & Combos"
            titleId="combos-title"
            text="Cross-gender combos that bundle services from both sides of the menu into a single sitting. Inclusions and combo rates are confirmed in salon."
            split
            aside={
              <Btn to="/pricing" variant="outline" size="sm">
                View the Rate Card
              </Btn>
            }
          />

          <ul className="svc-grid svc-grid--three stagger">
            {COMBO_PACKAGES.map((p) => (
              <li key={p.slug}>
                <article className="svc-card" data-reveal>
                  <div className="svc-card__media">
                    <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
                    <span className="svc-card__tag">{p.tag}</span>
                  </div>
                  <div className="svc-card__body">
                    <h3 className="svc-card__title">{p.name}</h3>
                    <p className="svc-card__text">{p.text}</p>
                    {/* Inclusions print only where the rate card supplies them —
                        an empty list stays empty rather than being guessed at. */}
                    {p.items.length ? (
                      <ul className="detail-list">
                        {p.items.map((sub) => (
                          <li key={sub}>
                            <Icon name="check" size={13} />
                            <span className="detail-list__name">{sub}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="svc-card__foot">
                      <Link className="link-arrow svc-card__link" to="/book">
                        <span>Book this combo</span>
                        <Icon name="arrowUpRight" size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Packages ------------------------------------------------------ */}
      <section className="section section--alt" aria-labelledby="packages-title">
        <div className="container">
          <SectionHeading
            eyebrow="Book Together"
            title="Salon Packages in Thanjavur"
            titleId="packages-title"
            text="Three ways to bundle a booking. Each is quoted for your group when you call, so the price reflects exactly what you're having done."
            split
            aside={
              <Btn to="/book" variant="outline" size="sm" icon="calendar">
                Book a Package
              </Btn>
            }
          />

          {/* Same card as the Services page — a package is a service bundle,
              so it should not look like a different kind of object. */}
          <ul className="svc-grid svc-grid--three stagger">
            {PACKAGE_IDEAS.map((p) => (
              <li key={p.title}>
                <article className="svc-card" data-reveal>
                  <div className="svc-card__media">
                    <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
                    <span className="svc-card__tag">Package</span>
                  </div>
                  <div className="svc-card__body">
                    <h3 className="svc-card__title">{p.title}</h3>
                    <p className="svc-card__text">{p.text}</p>
                    <div className="svc-card__foot">
                      <Link className="link-arrow svc-card__link" to={p.to}>
                        <span>See what&rsquo;s included</span>
                        <Icon name="arrowUpRight" size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="pricing-note pricing-note--center" data-reveal="fade">
            <Icon name="sparkle" size={15} />
            Looking for individual service rates instead?{" "}
            <Link className="inline-link" to="/pricing">
              View the full rate card
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBanner
        eyebrow="Worth Asking About"
        title="Become a Naturals Member"
        text="Tell us which services you book most often and we'll tell you whether membership works out cheaper for you. No obligation."
      />
    </>
  );
}
