import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { MENS_SERVICES, WOMENS_SERVICES } from "../data/services";
import Icon from "./Icon";
import { ArrowLink, Btn, Chapter, SectionHeading } from "./Ui";

const TABS = [
  {
    id: "women",
    label: "Women's",
    to: "/womens-services",
    intro:
      "Tailored beauty and hair care services designed for every woman, crafted with premium products and modern techniques.",
    list: WOMENS_SERVICES,
  },
  {
    id: "men",
    label: "Men's",
    to: "/mens-grooming",
    intro:
      "Complete grooming solutions for the modern man, from classic cuts to relaxing spa therapies.",
    list: MENS_SERVICES,
  },
];

/**
 * The service menu, as an openable list.
 *
 * Two earlier attempts here were a panel (one big photograph beside a list of
 * names) and a plain index (names only). Both had the same flaw: they showed
 * what the categories are *called* and nothing about what is in them, so the
 * only way to find out was to leave the page.
 *
 * Disclosure fixes that and is the one device nothing else on this page uses —
 * the sections around it are tiles, splits, ruled rows, a frame band and a
 * mosaic. Opening a category reveals its actual treatments and its photograph
 * in place. One row is open on arrival so the section never reads as a bare
 * list of links.
 */
export default function ServiceExplorer() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const uid = useId();

  const current = TABS[tab];

  const switchTab = (i) => {
    setTab(i);
    setOpen(0);
  };

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          eyebrow={<Chapter>What We Do</Chapter>}
          title="Our Premium Salon Services in Thanjavur"
          titleId="services-title"
          text={current.intro}
          split
          aside={
            <div className="explorer__cta">
              <Btn to={current.to} variant="outline" size="sm">
                View Full {current.label} Menu
              </Btn>
              <ArrowLink to="/services">Browse every service</ArrowLink>
            </div>
          }
        />

        <div className="menu__tabs" role="tablist" aria-label="Service audience">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={i === tab}
              aria-controls={i === tab ? `${uid}-panel-${t.id}` : undefined}
              tabIndex={i === tab ? 0 : -1}
              className={`menu__tab${i === tab ? " is-active" : ""}`}
              onClick={() => switchTab(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") switchTab((tab + 1) % TABS.length);
                if (e.key === "ArrowLeft") switchTab((tab - 1 + TABS.length) % TABS.length);
              }}
            >
              {t.label} Services
              <span className="menu__tab-count">{t.list.length}</span>
            </button>
          ))}
        </div>

        <div
          className="menu"
          role="tabpanel"
          id={`${uid}-panel-${current.id}`}
          aria-labelledby={`${uid}-tab-${current.id}`}
        >
          {current.list.map((s, i) => {
            const isOpen = open === i;
            const btnId = `${uid}-${current.id}-t${i}`;
            const panelId = `${uid}-${current.id}-p${i}`;

            return (
              <div key={s.slug} className={`menu__item${isOpen ? " is-open" : ""}`} data-reveal="fade">
                <h3 className="menu__heading">
                  <button
                    id={btnId}
                    type="button"
                    className="menu__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="menu__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="menu__name">{s.name}</span>
                    <span className="menu__count">
                      {s.items.length} {s.items.length === 1 ? "treatment" : "treatments"}
                    </span>
                    <span className="menu__mark" aria-hidden="true" />
                  </button>
                </h3>

                {/* grid-rows 0fr -> 1fr animates to the panel's natural height
                    without measuring anything in JS. */}
                <div className="menu__panel" id={panelId} role="region" aria-labelledby={btnId}>
                  <div>
                    <div className="menu__body">
                      <div className="menu__media">
                        <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
                      </div>

                      <div className="menu__detail">
                        <p className="menu__text">{s.text}</p>

                        <ul className="menu__list">
                          {s.items.map((item) => (
                            <li key={item}>
                              <Icon name="check" size={13} />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <div className="menu__actions">
                          <Btn to="/book" size="sm" icon="calendar">
                            Book This Service
                          </Btn>
                          <Link className="link-arrow" to={`${current.to}/${s.slug}`}>
                            <span>Full details</span>
                            <Icon name="arrowUpRight" size={15} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
