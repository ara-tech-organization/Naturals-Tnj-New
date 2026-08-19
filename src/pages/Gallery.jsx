import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Icon from "../components/Icon";
import { CtaBanner } from "../components/Blocks";
import { Btn } from "../components/Ui";
import { GALLERY_GROUPS } from "../data/services";
import { CONTACT } from "../data/site";
import { localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = localBusinessSchema(CONTACT);

const TOTAL = GALLERY_GROUPS.reduce((n, g) => n + g.images.length, 0);

/** Where each set of work is actually booked. A gallery that shows the result
    and then leaves you to find the service page yourself wastes the interest
    it just earned. */
const GROUP_LINK = {
  bridal: { to: "/bridal-makeover", label: "Bridal services" },
  hair: { to: "/services/womens", label: "Hair services" },
  mens: { to: "/services/mens", label: "Men's grooming" },
  spa: { to: "/services/womens", label: "Spa & skin services" },
};

/**
 * Full-screen viewer.
 *
 * A gallery whose pictures cannot be enlarged is a grid of thumbnails — the
 * detail people came to judge (a colour blend, the edge of a beard line) is
 * exactly what a 300px tile throws away. Arrow keys and Escape work, the page
 * behind is locked from scrolling, and focus returns to the tile you opened
 * from so the keyboard does not lose its place.
 */
function Lightbox({ items, index, onClose, onStep }) {
  const closeRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    openerRef.current = document.activeElement;
    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
      // The opener may have been filtered out of the DOM while the viewer was
      // up, so this is a best-effort restore rather than a guarantee.
      if (document.contains(openerRef.current)) openerRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const item = items[index];
  const stop = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div className="lbx" role="dialog" aria-modal="true" aria-label="Gallery viewer" onClick={onClose}>
      <div className="lbx__stage" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} />
        <p className="lbx__caption">
          <span>{item.alt}</span>
          <em>
            {index + 1} / {items.length}
          </em>
        </p>
      </div>

      <button
        ref={closeRef}
        type="button"
        className="lbx__btn lbx__btn--close"
        onClick={stop(onClose)}
        aria-label="Close viewer"
      >
        <Icon name="close" size={20} />
      </button>

      <button
        type="button"
        className="lbx__btn lbx__btn--prev"
        onClick={stop(() => onStep(-1))}
        aria-label="Previous image"
      >
        <Icon name="arrowLeft" size={20} />
      </button>

      <button
        type="button"
        className="lbx__btn lbx__btn--next"
        onClick={stop(() => onStep(1))}
        aria-label="Next image"
      >
        <Icon name="arrowRight" size={20} />
      </button>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(-1);

  const groups =
    filter === "all" ? GALLERY_GROUPS : GALLERY_GROUPS.filter((g) => g.id === filter);

  /* One flat run of whatever is on screen, so the viewer's arrows carry
     straight across group boundaries instead of dead-ending at each heading.
     `startOf` maps a group back to its offset in that run. */
  const shown = groups.flatMap((g) => g.images);
  const startOf = (gi) => groups.slice(0, gi).reduce((n, g) => n + g.images.length, 0);

  const step = (d) => setOpen((i) => (i + d + shown.length) % shown.length);
  const close = () => setOpen(-1);

  const pick = (id) => {
    setFilter(id);
    setOpen(-1);
  };

  useSeo({
    title: "Gallery | Naturals Salon Thanjavur",
    description:
      "Explore real hair styling, bridal makeup, and grooming transformations at Naturals Thanjavur. See why we're one of the best salons in Thanjavur.",
    path: "/gallery",
    keywords: PAGE_KEYWORDS.gallery,
    image: IMG.makeup,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Our Work Speaks for Itself – Naturals Thanjavur Gallery"
        text="Take a look inside Thanjavur's favorite unisex salon. From stunning bridal makeovers to precision haircuts, rejuvenating spa sessions, and sharp grooming transformations, our gallery showcases the real results our clients love. Every image reflects the skill, care, and premium products that make Naturals Thanjavur a trusted choice for hair, beauty, and grooming services."
        image={IMG.beautyServices}
        alt="Beauty and styling work at Naturals Thanjavur"
        trail={[{ label: "Gallery" }]}
      />

      <section className="section section--tight gal">
        <div className="container">
          {/* The filter follows you down a page that runs to twenty-five
              pictures, so switching sets never means scrolling back up. */}
          <div className="gal-bar">
            <div className="gal-filters" role="group" aria-label="Filter gallery by service">
              <button
                type="button"
                className={`gal-filter${filter === "all" ? " is-active" : ""}`}
                onClick={() => pick("all")}
                aria-pressed={filter === "all"}
              >
                All Work <em>{TOTAL}</em>
              </button>

              {GALLERY_GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`gal-filter${filter === g.id ? " is-active" : ""}`}
                  onClick={() => pick(g.id)}
                  aria-pressed={filter === g.id}
                >
                  {g.title} <em>{g.images.length}</em>
                </button>
              ))}
            </div>
          </div>

          {groups.map((group, gi) => {
            const n = GALLERY_GROUPS.indexOf(group) + 1;
            const link = GROUP_LINK[group.id];
            const base = startOf(gi);

            return (
              <div key={group.id} className="gal-group" id={group.id}>
                {/* Numeral, title, a rule that takes up the slack, then the
                    way through to booking the thing being shown. */}
                <div className="gal-group__head" data-reveal>
                  <span className="gal-group__num" aria-hidden="true">
                    {String(n).padStart(2, "0")}
                  </span>
                  <h2 className="gal-group__title">{group.title}</h2>
                  <span className="gal-group__rule" aria-hidden="true" />
                  <span className="gal-group__count">{group.images.length} photos</span>
                  {link ? (
                    <Link className="gal-group__link" to={link.to}>
                      {link.label}
                      <Icon name="arrowUpRight" size={15} />
                    </Link>
                  ) : null}
                </div>

                <ul className="gal-grid stagger">
                  {group.images.map((img, i) => {
                    const at = base + i;

                    return (
                      <li key={img.src} className="gal-item" data-reveal="scale">
                        <button
                          type="button"
                          className="gal-item__btn"
                          onClick={() => setOpen(at)}
                          aria-label={`Enlarge: ${img.alt}`}
                        >
                          <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                          <span className="gal-item__cap">
                            <span>{img.alt}</span>
                            <Icon name="arrowUpRight" size={15} />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <div className="gal-cta" data-reveal="fade">
            <p className="lead">
              Ready to be our next transformation story? Book your appointment at Naturals Thanjavur
              today and experience it for yourself.
            </p>
            <Btn to="/book" size="lg" icon="calendar">
              Book Your Appointment!
            </Btn>
          </div>
        </div>
      </section>

      {open > -1 ? <Lightbox items={shown} index={open} onClose={close} onStep={step} /> : null}

      <CtaBanner eyebrow="Your Turn" title="Let's Create Your Transformation" />
    </>
  );
}
