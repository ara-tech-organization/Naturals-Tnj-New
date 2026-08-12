import { Link } from "react-router-dom";
import { BRAND, CONTACT, SOCIALS } from "../data/site";
import Icon from "./Icon";
import { Btn } from "./Ui";

/**
 * Quick links — the destinations visitors actually reach for, rather than a
 * mirror of the whole sitemap. The service pages take the column beside it so
 * neither list runs long.
 */
const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Offers", to: "/offers" },
  { label: "Contact", to: "/contact" },
  { label: "Book Appointment", to: "/book" },
];

/** The service pages, linked straight through rather than stopping at the
    catalogue — Women's, Men's and Bridal otherwise live only in the
    mega-menu. */
const SERVICE_LINKS = [
  { label: "All Services", to: "/services" },
  { label: "Women’s Services", to: "/womens-services" },
  { label: "Men’s Grooming", to: "/mens-grooming" },
  { label: "Bridal Makeover", to: "/bridal-makeover" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="logo logo--lg" aria-label={`${BRAND.full} — home`}>
              <span className="logo__mark" aria-hidden="true" />
            </Link>
            <p className="footer__blurb">
              Thanjavur&rsquo;s trusted unisex salon since {BRAND.since} — expert hair styling,
              bridal makeovers, skin care, spa therapies and complete men&rsquo;s grooming under
              one roof.
            </p>
            <ul className="footer__socials">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    className="footer__social"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${BRAND.full} on ${s.label}`}
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h2 className="footer__title" id="footer-quick-links">
              Quick Links
            </h2>
            <ul className="footer__list">
              {QUICK_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 className="footer__title" id="footer-services">
              Services
            </h2>
            <ul className="footer__list">
              {SERVICE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__title">Visit Us</h2>
            <address className="footer__contact" style={{ fontStyle: "normal" }}>
              <a href={CONTACT.mapsDirections} target="_blank" rel="noopener noreferrer">
                <Icon name="mapPin" size={16} />
                <span>
                  {CONTACT.branch}
                  <br />
                  {CONTACT.addressLines.join(", ")}
                </span>
              </a>
              <a href={CONTACT.phoneHref}>
                <Icon name="phone" size={16} />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
              <a href={CONTACT.emailHref}>
                <Icon name="mail" size={16} />
                <span>{CONTACT.email}</span>
              </a>
              <span>
                <Icon name="clock" size={16} />
                <span>
                  {CONTACT.hours.map((h) => (
                    <span key={h.days} style={{ display: "block" }}>
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </span>
            </address>
            <div style={{ marginTop: "var(--space-m)" }}>
              <Btn to="/book" variant="ghost" size="sm" icon="calendar">
                Book an Appointment
              </Btn>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {year} {BRAND.legal}. All rights reserved.
          </p>
          <p>Best unisex salon in Thanjavur for hair, bridal, skin &amp; grooming.</p>
        </div>
      </div>
    </footer>
  );
}
