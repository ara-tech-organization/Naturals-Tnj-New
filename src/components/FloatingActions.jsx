import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT, WHATSAPP } from "../data/site";
import Icon from "./Icon";

/**
 * Two presentations of the same three actions:
 *  - desktop (lg+): contact floaters bottom-left, Book bottom-right with the
 *    back-to-top arrow above it, so neither corner stacks up too tall
 *  - below lg: a sticky bottom bar, the pattern Indian salon customers
 *    expect for tap-to-call and WhatsApp booking
 * CSS decides which one is visible, so both stay in the DOM and neither
 * needs a resize listener.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  /* The arrow is only useful once there is something to scroll back over. */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="floaters floaters--left">
        <a
          className="floater floater--wa"
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <Icon name="whatsapp" size={21} />
          <span className="floater__tip" aria-hidden="true">
            WhatsApp
          </span>
        </a>
        <a className="floater" href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phoneDisplay}`}>
          <Icon name="phone" size={19} />
          <span className="floater__tip" aria-hidden="true">
            Call Us
          </span>
        </a>
      </div>

      <div className="floaters floaters--right">
        <button
          type="button"
          className={`floater floater--top${showTop ? " is-visible" : ""}`}
          onClick={toTop}
          tabIndex={showTop ? 0 : -1}
          aria-hidden={!showTop}
          aria-label="Back to top"
        >
          <Icon name="chevron" size={19} />
        </button>
        <Link className="floater floater--book" to="/book">
          <Icon name="calendar" size={17} />
          Book
        </Link>
      </div>

      <nav className="actionbar" aria-label="Quick actions">
        <a className="actionbar__btn" href={CONTACT.phoneHref}>
          <Icon name="phone" size={19} />
          Call
        </a>
        <a
          className="actionbar__btn"
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" size={19} />
          WhatsApp
        </a>
        <Link className="actionbar__btn actionbar__btn--primary" to="/book">
          <Icon name="calendar" size={19} />
          Book Now
        </Link>
      </nav>
    </>
  );
}
