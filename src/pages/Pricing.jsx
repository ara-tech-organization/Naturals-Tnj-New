import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Icon from "../components/Icon";
import { CtaBanner, FaqSection } from "../components/Blocks";
import { ArrowLink, Btn, Eyebrow, SectionHeading } from "../components/Ui";
import {
  HAS_PRICES,
  MENS_SERVICES,
  OCCASION_SERVICES,
  WOMENS_SERVICES,
  priceFor,
} from "../data/services";
import { CONTACT, MEMBERSHIP, WHATSAPP } from "../data/site";
import { localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = localBusinessSchema(CONTACT);

/** The four variables the occasion copy already names, set out so a bride can
    see what we need from her before a figure can be quoted. */
const QUOTE_FACTORS = [
  { t: "The look", d: " — how elaborate, and whether a trial is included." },
  { t: "How many people", d: " — bride only, or the wedding party too." },
  { t: "The venue", d: " — in salon, or on location at your venue." },
  { t: "Hours involved", d: " — a single session, or cover across the day." },
];

const TABS = [
  {
    id: "women",
    label: "Women's Rate Card",
    short: "Women's",
    list: WOMENS_SERVICES,
    intro:
      "Every women's service on the menu, grouped exactly as it appears on the printed card in salon.",
  },
  {
    id: "men",
    label: "Men's Rate Card",
    short: "Men's",
    list: MENS_SERVICES,
    intro:
      "Every men's grooming service on the menu, grouped exactly as it appears on the printed card in salon.",
  },
];

/** How many individual services sit under a tab's categories. */
const countServices = (list) => list.reduce((n, c) => n + c.items.length, 0);

/**
 * One category block: the category name, then a row per sub-service.
 *
 * A category with no figures on it yet is a list, not a table. Rendering it as
 * one printed "On request" against every row — the same three words eighty-odd
 * times down the page — which read as a fault rather than as a rate card. The
 * fact is stated once, in the card's footer, and the services are simply
 * listed; the priced table comes back the moment a figure exists.
 */
function RateTable({ category, index, basePath }) {
  const rows = category.items.map((item) => ({ item, price: priceFor(category.slug, item) }));
  const priced = rows.some((r) => r.price);

  return (
    <article className="rate-card" id={`rate-${category.slug}`} data-reveal>
      {/* The photograph and the section link were both sitting unused in the
          service data while the card ran as a bare list of names. The image
          bleeds to the card edges and carries the serial numeral, the way a
          printed card plates each section. */}
      <div className="rate-card__media">
        <img src={category.image} alt={category.alt} loading="lazy" decoding="async" />
        <span className="rate-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <header className="rate-card__head">
        <h3 className="rate-card__title">{category.name}</h3>
        <p className="rate-card__summary">{category.summary}</p>
      </header>

      {priced ? (
        <table className="rate-table">
          <caption className="sr-only">{category.name} — services and prices</caption>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ item, price }) => (
              <tr key={item}>
                <th scope="row">{item}</th>
                <td className={price ? "rate-table__price" : "rate-table__price is-pending"}>
                  {price ?? "On request"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul className="rate-list">
          {rows.map(({ item }) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <footer className="rate-card__foot">
        <div className="rate-card__meta">
          <span className="rate-card__count">
            {rows.length} {rows.length === 1 ? "service" : "services"}
          </span>
          {!priced ? <span className="rate-card__pill">Priced on request</span> : null}
        </div>

        {/* /womens-services/:section is already an addressable route that
            scrolls to the matching card, so every category can point at its
            own write-up instead of at the top of the menu. */}
        <ArrowLink to={`${basePath}/${category.slug}`}>
          <span className="sr-only">{category.name} — </span>What&rsquo;s included
        </ArrowLink>
      </footer>
    </article>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState(0);
  const current = TABS[tab];

  useSeo({
    title: "Price List & Rate Card | Naturals Salon Thanjavur",
    description:
      "The full Naturals Thanjavur rate card — women's and men's hair, colour, chemical, facial, spa and mani-pedi services, plus bridal and special-occasion packages.",
    path: "/pricing",
    keywords: PAGE_KEYWORDS.pricing,
    image: IMG.hairStyling,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Rate Card"
        title="Our Price List"
        text="Every service we offer, split into women's and men's sections and listed the same way as the printed rate card in salon."
        image={IMG.hairStyling}
        alt="Hair smoothening and keratin treatment at Naturals Thanjavur"
        trail={[{ label: "Pricing" }]}
      >
        <div className="page-hero__jump">
          <Link to="/pricing/rates">Rate Card</Link>
          <Link to="/pricing/occasion-rates">Special Day</Link>
          <Link to="/pricing/terms">Terms</Link>
        </div>
      </PageHero>

      {/* ---- Pending-prices notice ---------------------------------------
          Split rather than a centred block: the explanation is the smaller
          half of this, and the number is what the visitor came for. */}
      {!HAS_PRICES ? (
        <section className="section section--tight">
          <div className="container">
            <aside className="pricenote" data-reveal>
              <div className="pricenote__copy">
                <span className="pricenote__tag">
                  <Icon name="sparkle" size={15} />
                  Why no figures?
                </span>
                <h2 className="pricenote__title">Rates are confirmed in salon</h2>
                <p className="pricenote__text">
                  Our price list moves with hair length, service level and the products a
                  particular treatment needs, so rather than publish a figure that may not match
                  your booking, every service below is confirmed when you call.
                </p>
              </div>

              <div className="pricenote__call">
                <span className="pricenote__label">Ask for the current rate card</span>
                <a className="pricenote__num" href={CONTACT.phoneHref}>
                  {CONTACT.phoneDisplay}
                </a>
                <p className="pricenote__hint">
                  We&rsquo;ll quote your exact service in under a minute.
                </p>
                <div className="pricenote__actions">
                  <Btn href={CONTACT.phoneHref} size="sm" icon="phone">
                    Call the salon
                  </Btn>
                  <Btn href={WHATSAPP} variant="outline" size="sm" icon="whatsapp">
                    Ask on WhatsApp
                  </Btn>
                </div>
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {/* ---- The rate card ------------------------------------------------ */}
      <section className="section" id="rates" aria-labelledby="rates-title">
        <div className="container">
          {/* Heading and switcher are one masthead, not two stranded blocks.
              The heading names the section, a rule closes it, and the control
              row sits on that rule directly above the tables it governs —
              rather than the switcher floating centred in a dead band with the
              section's deep link parked somewhere else entirely. */}
          <div className="rate-masthead">
            <SectionHeading
              eyebrow="Full Menu"
              title="Services & Prices"
              titleId="rates-title"
              text={current.intro}
              split
              className="rate-head"
              aside={
                <ArrowLink to={tab === 0 ? "/womens-services" : "/mens-grooming"}>
                  See {current.short} service details
                </ArrowLink>
              }
            />

            <div className="rate-bar">
              <div className="rate-tabs" role="tablist" aria-label="Rate card section">
                {TABS.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`rate-tab-${t.id}`}
                    aria-selected={i === tab}
                    // Only the selected panel is rendered, so only the selected
                    // tab may reference one.
                    aria-controls={i === tab ? `rate-panel-${t.id}` : undefined}
                    tabIndex={i === tab ? 0 : -1}
                    className={`rate-tab${i === tab ? " is-active" : ""}`}
                    onClick={() => setTab(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight") setTab((tab + 1) % TABS.length);
                      if (e.key === "ArrowLeft") setTab((tab - 1 + TABS.length) % TABS.length);
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Says how much card there is to scroll before you start, and
                  it changes with the tab — so the switcher visibly does
                  something beyond swapping a heading. */}
              <p className="rate-count">
                <strong>{current.list.length}</strong> categories
                <span aria-hidden="true"> · </span>
                <strong>{countServices(current.list)}</strong> services
              </p>
            </div>
          </div>

          <div
            className="rate-grid"
            role="tabpanel"
            id={`rate-panel-${current.id}`}
            aria-labelledby={`rate-tab-${current.id}`}
          >
            {current.list.map((category, i) => (
              <RateTable
                key={category.slug}
                category={category}
                index={i}
                basePath={tab === 0 ? "/womens-services" : "/mens-grooming"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---- Special occasion --------------------------------------------- */}
      <section className="section section--dark quote" id="occasion-rates" aria-labelledby="occ-title">
        <div className="container">
          <div className="quote__head" data-reveal>
            <Eyebrow>Glam Up Your Special Day</Eyebrow>
            <h2 id="occ-title" className="quote__title">
              Bridal &amp; Occasion Packages
            </h2>
            <p className="quote__text lead">
              Occasion work is quoted per booking rather than off the rate card. Send us the date
              and we&rsquo;ll come back with a written quote.
            </p>
          </div>

          <div className="quote__grid">
            {/* Every one of these is quote-only, so the price column that used
                to repeat "quoted per booking" seven times is gone — the list
                now just says what can be quoted. */}
            <div className="quote__panel" data-reveal>
              <h3 className="quote__panel-title">What we quote for</h3>
              <ul className="quote__list">
                {OCCASION_SERVICES.map((s) => (
                  <li key={s.name}>
                    <Icon name="sparkle" size={14} />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* The four variables named in the copy above, set out so a bride
                can see what she needs to tell us before we can price it. */}
            <div className="quote__panel quote__panel--factors" data-reveal>
              <h3 className="quote__panel-title">What changes the figure</h3>
              <ol className="quote__factors">
                {QUOTE_FACTORS.map((f, i) => (
                  <li key={f.t}>
                    <span className="quote__factor-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{f.t}</strong>
                      {f.d}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="quote__actions">
                <Btn to="/book" variant="light" size="sm" icon="calendar">
                  Send Us Your Date
                </Btn>
                <Btn href={WHATSAPP} variant="ghost" size="sm" icon="whatsapp">
                  Ask on WhatsApp
                </Btn>
              </div>

              <ArrowLink to="/bridal-makeover">Explore bridal services</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Terms --------------------------------------------------------- */}
      <section className="section section--alt terms" id="terms" aria-labelledby="terms-title">
        {/* A rail and a ledger. The clauses used to run as a two-column grid of
            cards, which put clause 02 to the right of 01 and 03 back under it —
            a numbered sequence read in a zigzag. They are now one ordered
            column of ruled rows, with the heading and the membership pointer
            held in a rail that stays with them on the way down. */}
        <div className="container terms__layout">
          <div className="terms__rail">
            <div className="terms__head" data-reveal>
              <Eyebrow>The Small Print</Eyebrow>
              <h2 id="terms-title" className="terms__title">
                Rate Card Terms
              </h2>
              <p className="terms__intro lead">
                The conditions printed on our rate card, reproduced here in full so there are no
                surprises at the counter.
              </p>
            </div>

            <p className="terms__note" data-reveal="fade">
              <Icon name="sparkle" size={16} />
              <span>
                Ask about our membership programme in salon — see the{" "}
                <Link className="inline-link" to="/offers">
                  Offers &amp; Membership
                </Link>{" "}
                page for the current terms.
              </span>
            </p>
          </div>

          {/* Numbered clauses rather than a tick list — these are conditions,
              not features, and a tick reads as a benefit.

              The list used to open with PRICING_NOTE and PRICING_DISCLAIMER
              before the membership rules, which restate both: clause 01 and 04
              said shampoo-and-taxes, 02 and 05 said pricing-varies. The rules
              carry every fact the other two do and are the better-written of
              the pair, so they stand alone. */}
          <ol className="terms__list" data-reveal>
            {MEMBERSHIP.knownRules.map((rule, i) => (
              <li className="terms__row" key={rule}>
                <span className="terms__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection />
      <CtaBanner
        eyebrow="Know What You Want?"
        title="Book It at Today's Rate"
        text="Reserve your chair and we'll confirm the exact price for your service when we call you back."
      />
    </>
  );
}
