import PageHero from "../components/PageHero";
import BookingForm from "../components/BookingForm";
import Icon from "../components/Icon";
import { Eyebrow } from "../components/Ui";
import { CONTACT, TRUST_POINTS } from "../data/site";
import { localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = localBusinessSchema(CONTACT);

export default function Book() {
  useSeo({
    title: "Book an Appointment | Naturals Salon Thanjavur",
    description:
      "Book your appointment at Naturals Thanjavur for hair styling, bridal makeup, facials, spa or men's grooming. Choose your service, date and time — or call +91 90870 00049.",
    path: "/book",
    keywords: PAGE_KEYWORDS.book,
    image: IMG.saloon,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Book Your Appointment"
        text="Tell us the service, the day and the time that suits you. We'll confirm your slot and the stylist best suited to it."
        image={IMG.hairStyling}
        alt="Booking an appointment at Naturals Thanjavur salon"
        trail={[{ label: "Book Appointment" }]}
      />

      <section className="section" aria-labelledby="book-title">
        <div className="container">
          <div className="booking">
            <div className="booking__panel">
              <div data-reveal>
                <Eyebrow>Your Details</Eyebrow>
                <h2 id="book-title" style={{ margin: "var(--space-s) 0 var(--space-m)" }}>
                  Reserve Your Chair
                </h2>
              </div>
              <BookingForm source="Book Appointment Page" />
            </div>

            <aside className="booking__aside" data-reveal="right">
              <h3>Good to know</h3>

              <ul className="tick-list">
                {[
                  "Walk-ins are welcome — booking ahead secures your preferred time slot.",
                  "Bridal packages include a personalised trial session before the day.",
                  "Pricing varies by hair length; call us for the current rate card.",
                  "Membership is not applicable for texture services.",
                ].map((t) => (
                  <li key={t}>
                    <Icon name="check" size={15} />
                    {t}
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
                    <span className="visit__label">Prefer to call?</span>
                    <a className="visit__value" href={CONTACT.phoneHref}>
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li>
                  <Icon name="mapPin" size={18} />
                  <div>
                    <span className="visit__label">Branch</span>
                    <span className="visit__value">{CONTACT.branch}</span>
                    <span className="visit__value">{CONTACT.addressShort}</span>
                  </div>
                </li>
              </ul>

              <ul className="chips">
                {TRUST_POINTS.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
