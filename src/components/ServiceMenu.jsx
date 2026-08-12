import { useState } from "react";
import { useParams } from "react-router-dom";
import { priceFor, PRICING_DISCLAIMER, PRICING_NOTE } from "../data/services";
import { CONTACT, WHATSAPP } from "../data/site";
import Icon from "./Icon";
import { Btn } from "./Ui";

/**
 * One card's "what's included" — collapsed by default, since the same
 * information repeated with a price attached to it would otherwise run the
 * tile long before you ever reach the Book button. Expanding it swaps the
 * plain checklist for the same dotted-leader price rows the rate-card page
 * uses, so a category never shows the same list twice in two formats.
 */
function ServiceTile({ s, index, ctaLabel, isTarget }) {
  const [open, setOpen] = useState(false);
  const panelId = `${s.slug}-pricing`;

  return (
    <li
      id={s.slug}
      className={`svc-tile${isTarget ? " is-target" : ""}`}
      data-reveal
    >
      <div className="svc-tile__media">
        <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
        <span className="svc-tile__index">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="svc-tile__body">
        <h3 id={`${s.slug}-title`} className="svc-tile__title">
          {s.name}
        </h3>
        <p className="svc-tile__text">{s.text}</p>

        <button
          type="button"
          className="svc-tile__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>
            {s.items.length} {s.items.length === 1 ? "treatment" : "treatments"} &middot; View
            pricing
          </span>
          <span className="svc-tile__toggle-icon" aria-hidden="true" />
        </button>

        <div className={`svc-tile__panel${open ? " is-open" : ""}`} id={panelId} role="region">
          <div>
            <ul className="svc-tile__rows">
              {s.items.map((item) => {
                const price = priceFor(s.slug, item);
                return (
                  <li key={item}>
                    <span className="svc-tile__row-name">{item}</span>
                    <span className="svc-tile__row-leader" aria-hidden="true" />
                    <span className="svc-tile__row-price">{price ?? "On request"}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="svc-tile__foot">
          <Btn to="/book" size="sm" icon="calendar" block>
            {ctaLabel}
          </Btn>
        </div>
      </div>
    </li>
  );
}

/**
 * The service menu — one card per category, three across from lg.
 *
 * This replaced a stack of alternating full-width editorial rows. Thirteen of
 * those ran to a dozen screens, the photograph carried none of the information,
 * and nothing could be compared against anything else without scrolling. A card
 * holds the same content in a fifth of the height and puts the categories side
 * by side, which is how somebody choosing a service actually reads them.
 *
 * Every card keeps its slug as an `id`, so /womens-services/cuts-styling still
 * scrolls to the right one — and because a card is small enough to miss in a
 * grid, the addressed card is ringed until you navigate away from it.
 */
export default function ServiceMenu({ items, ctaLabel = "Book This Service" }) {
  const { section } = useParams();

  return (
    <>
      <ul className="svc-menu">
        {items.map((s, i) => (
          <ServiceTile
            key={s.slug}
            s={s}
            index={i}
            ctaLabel={ctaLabel}
            isTarget={section === s.slug}
          />
        ))}
      </ul>

      {/* Both pricing caveats in one panel. They were previously a loose italic
          line and a separate tinted box a screen apart, which read as two
          unrelated afterthoughts rather than the one "before you book" note it
          actually is. The call and WhatsApp links close it out, because the
          answer to every question these raise is "ask us for the rate card". */}
      <aside className="svc-notes" data-reveal="fade">
        <header className="svc-notes__head">
          <span className="svc-notes__mark" aria-hidden="true">
            <Icon name="sparkle" size={16} />
          </span>
          <h3 className="svc-notes__title">Before you book</h3>
        </header>

        {/* Two caveats, two columns — they are independent notes, so setting
            them side by side stops the panel running as one long low line and
            keeps the whole thing to three tidy bands. */}
        <ul className="svc-notes__list">
          <li>{PRICING_DISCLAIMER}</li>
          <li>{PRICING_NOTE}</li>
        </ul>

        <div className="svc-notes__actions">
          <Btn href={CONTACT.phoneHref} size="sm" icon="phone">
            Call for the rate card
          </Btn>
          <Btn href={WHATSAPP} variant="outline" size="sm" icon="whatsapp">
            Ask on WhatsApp
          </Btn>
        </div>
      </aside>
    </>
  );
}
