import { useEffect, useId, useRef, useState } from "react";
import {
  CONTACT,
  FAQS,
  GOOGLE_BUSINESS,
  STATS,
  TESTIMONIALS,
  WHATSAPP,
} from "../data/site";
import { IMG } from "../assets";
import Icon from "./Icon";
import { Btn, Eyebrow, SectionHeading } from "./Ui";
import { useCountUp } from "../hooks/useCountUp";
import { useScrollProgress } from "../hooks/useMotion";

/* ------------------------------------------------------------------ Stats */

function Stat({ stat }) {
  const { ref, value } = useCountUp(stat.value);
  // Match the salon's own "10,000+" formatting while the counter runs.
  const shown = value >= 1000 ? value.toLocaleString("en-IN") : String(value);

  return (
    <div className="stat" ref={ref} data-reveal>
      <span className="stat__value">
        {shown}
        {stat.suffix}
      </span>
      <span className="stat__label">{stat.label}</span>
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="stats stagger">
      {STATS.map((s) => (
        <Stat key={s.label} stat={s} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------- Testimonials */

/** Initials for the monogram — no client photos were supplied, and a lettered
    medallion reads better than a generic avatar placeholder. */
function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Every review on the page at once, as a three-up row of cards. With only a
 * handful of testimonials a rotator hid two thirds of the proof behind a
 * click — read side by side, the range of services they cover is the point.
 */
export function Testimonials() {
  return (
    <section className="section reviews" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHeading
          eyebrow="Client Stories"
          title="What Our Customers Say"
          text="Real experiences from our valued customers across Thanjavur."
          titleId="reviews-title"
          center
        />

        <ul className="reviews__grid stagger">
          {TESTIMONIALS.map((t) => (
            <li key={t.name} data-reveal>
              <figure className="rev-card">
                <Icon name="quote" size={72} className="rev-card__mark" aria-hidden="true" />

                <span
                  className="rev-card__stars"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Icon key={i} name="star" size={15} fill="currentColor" stroke={0} />
                  ))}
                </span>

                <blockquote className="rev-card__quote">
                  <p>{t.text}</p>
                </blockquote>

                <figcaption className="rev-card__by">
                  <span className="rev-card__mono" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <span className="rev-card__who">
                    <span className="rev-card__name">{t.name}</span>
                    <span className="rev-card__service">{t.service}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="reviews__foot" data-reveal="fade">
          <Btn to="/testimonials" variant="outline" size="sm">
            Read more client stories
          </Btn>

          {/* Only rendered once the salon supplies its Google Business Profile
              link — see GOOGLE_BUSINESS in data/site.js. */}
          {GOOGLE_BUSINESS.reviewsUrl ? (
            <>
              {GOOGLE_BUSINESS.ratingDisplay ? (
                <p className="reviews-cta__score">
                  <span className="reviews-cta__stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" size={16} fill="currentColor" stroke={0} />
                    ))}
                  </span>
                  <strong>{GOOGLE_BUSINESS.ratingDisplay}</strong>
                  {GOOGLE_BUSINESS.reviewCountDisplay
                    ? ` from ${GOOGLE_BUSINESS.reviewCountDisplay} Google reviews`
                    : " on Google"}
                </p>
              ) : null}
              <Btn href={GOOGLE_BUSINESS.reviewsUrl} variant="outline" size="sm" icon="arrowUpRight">
                Read our Google reviews
              </Btn>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Accordion */

export function Accordion({ items, defaultOpen = -1, renderBody }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-t${i}`;
        const panelId = `${uid}-p${i}`;

        return (
          <div key={item.q ?? item.name ?? i} className={`acc__item${isOpen ? " is-open" : ""}`}>
            <h3>
              <button
                id={btnId}
                type="button"
                className="acc__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.q ?? item.name}
                <span className="acc__icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="acc__panel" id={panelId} role="region" aria-labelledby={btnId}>
              <div>
                <div className="acc__body">{renderBody ? renderBody(item) : item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * An editorial FAQ, not an accordion: a numbered question list stays put on
 * the left while the picked question stages on the right beside a plate of
 * the salon itself — the same "held column beside scrolling content" idea
 * the homepage's "Why choose Naturals" section already uses elsewhere.
 *
 * The desktop stage is a progressive enhancement. Every answer also sits
 * inline under its own question via the same zero-height-until-open grid
 * trick the plain Accordion uses, so a touch visitor gets a standard
 * accordion and every answer stays in the rendered DOM at every width —
 * nothing here is JS-generated-only content.
 */
function FaqEditorial({ title, items }) {
  const [active, setActive] = useState(0);
  // Reduced-motion visitors land on a stopped rotation with the toggle in
  // reach, never on an answer that changes under them unasked.
  const [playing, setPlaying] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef(null);
  useScrollProgress(rootRef);
  const uid = useId();
  const current = items[active];

  // A timeout re-armed per pick, same as the homepage hero: picking a
  // question by hand restarts the dwell rather than ending the rotation.
  useEffect(() => {
    if (!playing || hidden) return undefined;

    const tick = setTimeout(() => setActive((i) => (i + 1) % items.length), 4500);
    return () => clearTimeout(tick);
  }, [playing, hidden, active, items.length]);

  // A rotator running in a background tab is wasted work.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="faq-ed" ref={rootRef}>
      <div className="faq-ed__col">
        <div className="faq-ed__head" data-reveal>
          <div className="faq-ed__head-row">
            <div>
              <Eyebrow>Good To Know</Eyebrow>
              <h2 id="faq-title" className="faq-ed__title">
                {title}
              </h2>
            </div>
            {/* The mechanism WCAG 2.2.2 asks for, and the only thing that
                stops the rotation for good. */}
            <button
              type="button"
              className="faq-ed__toggle"
              aria-label={playing ? "Pause the FAQ rotation" : "Play the FAQ rotation"}
              onClick={() => setPlaying((p) => !p)}
            >
              <Icon name={playing ? "pause" : "play"} size={13} />
            </button>
          </div>
          <p className="faq-ed__intro lead">
            Everything you need to know before your appointment.
          </p>
        </div>

        <ol className="faq-ed__list" data-reveal>
          {items.map((item, i) => {
            const isActive = i === active;
            const panelId = `${uid}-p${i}`;

            return (
              <li className={`faq-ed__item${isActive ? " is-active" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="faq-ed__q"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                >
                  <span className="faq-ed__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq-ed__q-text">{item.q}</span>
                  <Icon name="arrowUpRight" size={15} className="faq-ed__arrow" />
                </button>
                <div className="faq-ed__inline" id={panelId}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="faq-ed__stage">
        {/* `key` restarts the reveal on every pick, so choosing the answer
            that's already showing still reads as a response. */}
        <div className="faq-ed__panel" key={active}>
          <span className="faq-ed__panel-num">
            <span className="faq-ed__panel-num-rule" aria-hidden="true" />
            {String(active + 1).padStart(2, "0")}
          </span>
          <h3 className="faq-ed__panel-q">{current.q}</h3>
          <span className="faq-ed__rule" aria-hidden="true" />
          <p className="faq-ed__panel-a">{current.a}</p>
        </div>
        <div className="faq-ed__media figure-frame">
          <img src={IMG.salonInterior} alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
}

export function FaqSection({ items = FAQS, title = "Frequently Asked Questions" }) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container">
        <FaqEditorial title={title} items={items} />

        <div className="faq-ed__cta" data-reveal="fade">
          <p>
            Still have a question? Call us on{" "}
            <a href={CONTACT.phoneHref} className="inline-link">
              {CONTACT.phoneDisplay}
            </a>{" "}
            — we&rsquo;re happy to help.
          </p>
          <Btn href={WHATSAPP} variant="outline" size="sm" icon="whatsapp">
            Ask on WhatsApp
          </Btn>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Location */

export function LocationSection() {
  return (
    <section className="section section--alt" aria-labelledby="visit-title">
      <div className="container">
        {/* Centred over the card rather than split across the full measure —
            a heading spanning 1300px above an 880px card read as two
            different sections stacked. */}
        <SectionHeading
          eyebrow="Find Us"
          title="Visit Naturals — Thanjavur's Go-To Beauty Parlour"
          titleId="visit-title"
          text="Step into Naturals and discover a world of style, care, and confidence. Your best look is just an appointment away."
          className="visit-lead"
          center
        />

        {/* The map is the section now — a wide band with the address card
            floating over its left third, the way a listing sits on a map rather
            than beside one. Below the band, the landmark wayfinding runs as a
            three-up caption instead of taking card space. */}
        <div className="visit" data-reveal>
          <div className="visit__map">
            <iframe
              src={CONTACT.mapsEmbed}
              title={`Map showing ${CONTACT.branch} in Thanjavur`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="visit__card">
            <div className="visit__head">
              <span className="visit__tag">Main Branch</span>
              <h3 className="visit__branch">{CONTACT.branch}</h3>
              <span className="visit__pin">
                <Icon name="mapPin" size={14} />
                {CONTACT.landmark}
              </span>
            </div>

            <ul className="visit__list visit__list--stack">
              <li>
                <Icon name="mapPin" size={16} />
                <div>
                  <span className="visit__label">Address</span>
                  <span className="visit__value">{CONTACT.addressShort}</span>
                </div>
              </li>
              <li>
                <Icon name="clock" size={16} />
                <div>
                  <span className="visit__label">Working Hours</span>
                  {CONTACT.hours.map((h) => (
                    <span key={h.days} className="visit__value">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </div>
              </li>
              <li>
                <Icon name="phone" size={16} />
                <div>
                  <span className="visit__label">Phone &amp; Email</span>
                  <a className="visit__value inline-link" href={CONTACT.phoneHref}>
                    {CONTACT.phoneDisplay}
                  </a>
                  <a className="visit__value inline-link" href={CONTACT.emailHref}>
                    {CONTACT.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="visit__actions">
              <Btn href={CONTACT.mapsDirections} size="sm" icon="arrowUpRight">
                Get Directions
              </Btn>
              <Btn href={CONTACT.phoneHref} variant="outline" size="sm" icon="phone">
                Call Now
              </Btn>
            </div>
          </div>
        </div>

        {/* Landmark wayfinding — "near me" searches arrive knowing the area,
            not the door number. Out of the card and under the map, where three
            short lines read as a caption rather than a paragraph. */}
        <ul className="visit__ways" data-reveal>
          {CONTACT.directions.map((line) => (
            <li key={line}>
              <Icon name="check" size={14} />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- CTA banner */

/**
 * Closing call to action: a plain white plate with everything set in plum.
 *
 * There is deliberately no photograph behind it. An image under a white wash
 * showed through unevenly at the top edge and read as a stray band across the
 * section, and any coloured wash tinted the white. The only decoration left is
 * linework — two hairline rings and two sparkles, out at the margins.
 */
export function CtaBanner({
  eyebrow = "Book Your Visit",
  title = "Ready to Transform Your Look?",
  text = "Reserve your chair with Thanjavur's most trusted unisex salon. Walk-ins are welcome, but booking ahead secures your preferred stylist and time slot.",
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      {/* Two hairline rings and a pair of sparkles, kept out to the edges so
          the copy column stays clear. */}
      <span className="cta-band__ring cta-band__ring--l" aria-hidden="true" />
      <span className="cta-band__ring cta-band__ring--r" aria-hidden="true" />
      <Icon
        name="sparkle"
        size={22}
        className="cta-band__spark cta-band__spark--a"
        aria-hidden="true"
      />
      <Icon
        name="sparkle"
        size={14}
        className="cta-band__spark cta-band__spark--b"
        aria-hidden="true"
      />

      <div className="container cta-band__inner">
        <Eyebrow center>{eyebrow}</Eyebrow>
        <h2 id="cta-title" className="cta-band__title">
          {title}
        </h2>
        <p className="cta-band__text">{text}</p>
        {/* Tap-to-call and WhatsApp sit beside the form CTA — between them they
            cover how salon bookings actually arrive in Tamil Nadu. */}
        <div className="cta-band__actions">
          <Btn to="/book" variant="light" icon="calendar">
            Book an Appointment
          </Btn>
          <Btn href={CONTACT.phoneHref} variant="ghost" icon="phone">
            Call {CONTACT.phoneDisplay}
          </Btn>
          <Btn href={WHATSAPP} variant="ghost" icon="whatsapp">
            WhatsApp Us
          </Btn>
        </div>
      </div>
    </section>
  );
}
