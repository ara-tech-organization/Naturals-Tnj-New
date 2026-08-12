import { useEffect, useId, useRef, useState } from "react";
import { priceFor, PRICING_DISCLAIMER } from "../data/services";
import Icon from "./Icon";

/**
 * Icon set is small (see Icon.jsx), so categories share four marks by what
 * kind of service they are rather than each getting a bespoke glyph.
 */
function iconFor(slug) {
  if (/cuts-styling|beard|shave|moustache/.test(slug)) return "scissors";
  if (/ritual|reflexology/.test(slug)) return "heart";
  if (/mani-pedi|foot|specials/.test(slug)) return "star";
  return "sparkle";
}

const POPUP_WIDTH = 360;

/**
 * The rate card, as a grid of small toggle tiles — icon and name only, four
 * across — rather than a stack of full-width cards each carrying their own
 * price list. Thirteen of those ran a full screen tall before you reached
 * the last one; a grid this compact shows every category at a glance.
 *
 * Clicking a tile pops a small detail card up right under it, overlapping
 * whatever tiles sit below rather than pushing the grid open — the position
 * is measured against the clicked tile itself, so the popup always opens
 * next to the category you asked about instead of in one fixed spot on the
 * page.
 */
export default function ServicePricing({ items }) {
  const uid = useId();
  const [active, setActive] = useState(-1);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const gridRef = useRef(null);
  const tileRefs = useRef([]);
  const panelId = `${uid}-price-popup`;
  const current = active >= 0 ? items[active] : null;

  const toggle = (i) => {
    if (active === i) {
      setActive(-1);
      return;
    }

    const tile = tileRefs.current[i];
    const grid = gridRef.current;
    if (tile && grid) {
      const tileRect = tile.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const maxLeft = Math.max(0, gridRect.width - POPUP_WIDTH);
      const left = Math.min(tileRect.left - gridRect.left, maxLeft);
      setPos({ top: tileRect.bottom - gridRect.top + 8, left });
    }
    setActive(i);
  };

  // Outside click and Escape both close it — a popup that only closes by
  // re-clicking its own tile is a popup that traps you against the mouse.
  useEffect(() => {
    if (active < 0) return undefined;

    const onPointerDown = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) setActive(-1);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActive(-1);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <div className="price-menu" data-reveal>
      <div className="price-menu__head">
        <h3>View detailed services &amp; pricing</h3>
        <p className="form-note">
          Every sub-service we offer in this range. {PRICING_DISCLAIMER}
        </p>
      </div>

      <div className="price-grid" ref={gridRef}>
        {items.map((item, i) => {
          const isActive = active === i;
          return (
            <button
              key={item.slug}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              type="button"
              className={`price-tile${isActive ? " is-active" : ""}`}
              aria-pressed={isActive}
              aria-controls={panelId}
              onClick={() => toggle(i)}
            >
              <span className="price-tile__icon" aria-hidden="true">
                <Icon name={iconFor(item.slug)} size={17} />
              </span>
              <span className="price-tile__name">{item.name}</span>
              <span className="price-tile__toggle" aria-hidden="true" />
            </button>
          );
        })}

        {current ? (
          <div
            className="price-popup"
            id={panelId}
            role="region"
            style={{ top: pos.top, left: pos.left }}
          >
            <button
              type="button"
              className="price-popup__close"
              aria-label="Close"
              onClick={() => setActive(-1)}
            >
              <Icon name="close" size={14} />
            </button>

            <h4 className="price-popup__title">{current.name}</h4>
            <ul className="price-popup__rows">
              {current.items.map((sub) => {
                const price = priceFor(current.slug, sub);
                return (
                  <li key={sub}>
                    <span className="price-popup__row-name">{sub}</span>
                    <span className="price-popup__row-leader" aria-hidden="true" />
                    <span className="price-popup__row-price">{price ?? "On request"}</span>
                  </li>
                );
              })}
            </ul>
            <p className="price-popup__note">{PRICING_DISCLAIMER}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
