import PageHero from "../components/PageHero";
import BookingForm from "../components/BookingForm";
import Icon from "../components/Icon";
import { CtaBanner, LocationSection } from "../components/Blocks";
import { Eyebrow } from "../components/Ui";
import { CONTACT, FAQS, WHATSAPP } from "../data/site";
import { faqSchema, localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema(CONTACT), faqSchema(FAQS)],
};

const CHANNELS = [
  {
    icon: "phone",
    label: "Call Us",
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneHref,
    hint: CONTACT.hoursShort,
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Message us",
    href: WHATSAPP,
    hint: "Fastest way to check slot availability",
  },
  {
    icon: "mail",
    label: "Email Us",
    value: CONTACT.email,
    href: CONTACT.emailHref,
    hint: "For enquiries and bridal bookings",
  },
  {
    icon: "mapPin",
    label: "Visit Us",
    value: CONTACT.addressShort,
    href: CONTACT.mapsDirections,
    hint: CONTACT.landmark,
  },
];

/**
 * The enquiry form has no backend — it hands off to WhatsApp on the salon's own
 * number (see BookingForm). These steps describe that real path, so nothing here
 * promises a confirmation the site cannot send.
 */
const NEXT_STEPS = [
  "Your request opens a pre-filled WhatsApp message on our salon number — send it and it reaches us directly.",
  "We reply within working hours to confirm your slot and the stylist best suited to it.",
  "Bridal and spa bookings are best made a few days ahead; walk-ins are always welcome.",
];

export default function Contact() {
  useSeo({
    // Title and description are the client's supplied copy, verbatim. Note the
    // description spells the area "Arulanthar Nagar" — matching the salon's own
    // Google listing — while the postal address in `site.js` reads "Arulananda
    // Nagar". Both spellings are the client's; align them once they confirm one.
    title: "Contact Us | Naturals Salon Thanjavur",
    description:
      "Contact Naturals Thanjavur for hair, bridal, spa & grooming services. Visit us at Arulanthar Nagar or call to book your appointment today.",
    path: "/contact",
    keywords: PAGE_KEYWORDS.contact,
    image: IMG.saloon,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Naturals Thanjavur"
        text="Call, message or walk in — we're at Arulananda Nagar, opposite Vinodhagan Hospital, and happy to help you find the right service."
        image={IMG.saloon}
        alt="Interior of Naturals unisex salon in Thanjavur"
        trail={[{ label: "Contact" }]}
      />

      {/* ---- Channels ----------------------------------------------------- */}
      <section className="section section--tight">
        <div className="container">
          <ul className="channel-grid stagger">
            {CHANNELS.map((c) => (
              <li key={c.label} data-reveal>
                <a
                  className="channel"
                  href={c.href}
                  {...(c.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="channel__icon">
                    <Icon name={c.icon} size={19} />
                  </span>
                  <span className="channel__label">{c.label}</span>
                  <span className="channel__value">{c.value}</span>
                  <span className="channel__hint">{c.hint}</span>
                  <Icon name="arrowUpRight" size={16} className="channel__arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Enquiry form ------------------------------------------------- */}
      <section className="section" aria-labelledby="enquiry-title">
        <div className="container">
          <div className="booking">
            <div className="booking__panel">
              <div data-reveal>
                <Eyebrow>Send a Request</Eyebrow>
                <h2 id="enquiry-title" style={{ margin: "var(--space-s) 0 var(--space-m)" }}>
                  Request an Appointment
                </h2>
              </div>
              <BookingForm source="Contact Page" />
            </div>

            {/* The full address, map and wayfinding sit in the Find Us block
                directly below, so the aside carries what the form itself does
                not answer: what happens after you send it, and how to reach a
                person right now. */}
            <aside className="booking__aside" data-reveal="right">
              <h3>What Happens Next</h3>

              <ul className="tick-list">
                {NEXT_STEPS.map((s) => (
                  <li key={s}>
                    <Icon name="check" size={15} />
                    {s}
                  </li>
                ))}
              </ul>

              <ul className="visit__list">
                <li>
                  <Icon name="clock" size={18} />
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
                  <Icon name="phone" size={18} />
                  <div>
                    <span className="visit__label">Rather Speak To Us?</span>
                    <a className="visit__value" href={CONTACT.phoneHref}>
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li>
                  <Icon name="whatsapp" size={18} />
                  <div>
                    <span className="visit__label">WhatsApp</span>
                    <a
                      className="visit__value"
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with us
                    </a>
                  </div>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <LocationSection />
      <CtaBanner
        eyebrow="We're Open"
        title="Walk In or Book Ahead"
        text="Walk-ins are welcome. For bridal packages and spa sessions we recommend booking in advance to secure your preferred slot."
      />
    </>
  );
}
