import { useState } from "react";
import { Link } from "react-router-dom";
import { SERVICE_TABS } from "../data/site";
import { MENS_SERVICES, OCCASION_SERVICES, WOMENS_SERVICES } from "../data/services";
import Icon from "./Icon";

const LISTS = { women: WOMENS_SERVICES, men: MENS_SERVICES };

/**
 * Desktop Services mega-menu.
 *
 * Two top-level tabs — Women's and Men's — each revealing that side of the
 * catalogue, with a featured image and a link through to the full page. The
 * panel is rendered inside the header and positioned relative to it, so it
 * spans the full width without escaping the header's stacking context.
 *
 * Open/close is owned by the parent (Header) because both the trigger and the
 * panel need to feed the same hover intent.
 */
export default function MegaMenu({ open, onClose, onHoverPanel, onLeavePanel }) {
  const [tab, setTab] = useState("women");
  const active = SERVICE_TABS.find((t) => t.id === tab) ?? SERVICE_TABS[0];
  const items = LISTS[tab] ?? [];

  return (
    <div
      className={`mega${open ? " is-open" : ""}`}
      id="services-mega"
      onMouseEnter={onHoverPanel}
      onMouseLeave={onLeavePanel}
      aria-hidden={!open}
      inert={open ? undefined : true}
    >
      <div className="container mega__inner">
        {/* Tabs */}
        <div className="mega__tabs" role="tablist" aria-label="Service audience">
          {SERVICE_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`mega-tab-${t.id}`}
              aria-selected={tab === t.id}
              // Only one panel is rendered at a time, so only the selected tab
              // may claim aria-controls — pointing at an id that isn't in the
              // document is a dangling reference screen readers can't resolve.
              aria-controls={tab === t.id ? `mega-panel-${t.id}` : undefined}
              tabIndex={tab === t.id ? 0 : -1}
              className={`mega__tab${tab === t.id ? " is-active" : ""}`}
              onMouseEnter={() => setTab(t.id)}
              onFocus={() => setTab(t.id)}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const i = SERVICE_TABS.findIndex((s) => s.id === tab);
                const next =
                  e.key === "ArrowRight"
                    ? (i + 1) % SERVICE_TABS.length
                    : (i - 1 + SERVICE_TABS.length) % SERVICE_TABS.length;
                setTab(SERVICE_TABS[next].id);
                document.getElementById(`mega-tab-${SERVICE_TABS[next].id}`)?.focus();
              }}
            >
              <span>{t.label}</span>
              <Icon name="arrowRight" size={15} />
            </button>
          ))}

          <Link className="mega__all" to="/services" onClick={onClose}>
            <span>View all services</span>
            <Icon name="arrowUpRight" size={14} />
          </Link>
        </div>

        {/* Category columns */}
        <div
          className="mega__body"
          role="tabpanel"
          id={`mega-panel-${tab}`}
          aria-labelledby={`mega-tab-${tab}`}
        >
          <ul className="mega__list">
            {items.map((s) => (
              <li key={s.slug}>
                <Link className="mega__item" to={`${active.to}#${s.slug}`} onClick={onClose}>
                  <span className="mega__item-name">{s.name}</span>
                  <span className="mega__item-sub">{s.items.slice(0, 3).join(" · ")}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Featured card */}
          <div className="mega__feature">
            <Link className="mega__feature-media" to={active.to} onClick={onClose}>
              <img src={active.image} alt={active.alt} loading="lazy" decoding="async" />
            </Link>
            <p className="mega__feature-text">{active.blurb}</p>
            <Link className="mega__feature-link" to={active.to} onClick={onClose}>
              <span>Explore {active.label}</span>
              <Icon name="arrowUpRight" size={15} />
            </Link>

            <div className="mega__occasion">
              <span className="mega__occasion-label">Glam up your special day</span>
              <ul>
                {OCCASION_SERVICES.map((o) => (
                  <li key={o.name}>
                    <Link to="/bridal-makeover" onClick={onClose}>
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
