import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BRAND, CONTACT, NAV, SERVICE_TABS, WHATSAPP } from "../data/site";
import { MENS_SERVICES, WOMENS_SERVICES } from "../data/services";
import { IMG } from "../assets";
import Icon from "./Icon";
import MegaMenu from "./MegaMenu";
import { Btn } from "./Ui";

function Logo({ onClick }) {
  return (
    // The wordmark is already baked into the artwork, so no text is set
    // beside it — the link carries the accessible name instead. Two assets
    // are layered and cross-faded by CSS, each shown as-authored (no
    // recolouring): the full-colour logo2.png on light grounds, and logo.png
    // (its light print) on dark ones where the colour version wouldn't read
    // against a photo.
    <Link to="/" className="logo" onClick={onClick} aria-label={`${BRAND.full} — home`}>
      <span className="logo__mark-wrap" aria-hidden="true">
        <img className="logo__mark-color" src={IMG.logo2} alt="" />
        <img className="logo__mark" src={IMG.logo} alt="" />
      </span>
    </Link>
  );
}

/**
 * Sticky header.
 *
 * `overlay` starts the bar transparent so the hero shows through, converting
 * to a solid blurred bar once the user scrolls. `dark` additionally flips the
 * logo, nav and burger to white — used on the pages whose hero is a dark
 * photograph. The homepage hero is light, so it takes `overlay` alone.
 *
 * `topbar` toggles the desktop-only contact strip above the nav. It's
 * unrelated to sticky positioning either way — `.header` sticks at `top: 0`
 * regardless of what, if anything, sits above it in normal flow.
 */
export default function Header({ overlay = false, dark = false, topbar = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [sub, setSub] = useState(false);
  const burgerRef = useRef(null);
  const drawerRef = useRef(null);
  const megaTimer = useRef(0);

  // Closing always returns focus to the burger, so keyboard users don't get
  // dropped back at the top of the document.
  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  // Hover intent: opening is instant, closing waits a beat so the pointer can
  // travel from the "Services" link down into the panel without it vanishing.
  const openMega = useCallback(() => {
    clearTimeout(megaTimer.current);
    setMega(true);
  }, []);

  const closeMega = useCallback((delay = 160) => {
    clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(false), delay);
  }, []);

  useEffect(() => () => clearTimeout(megaTimer.current), []);

  // Escape closes the panel; so does scrolling away from it.
  useEffect(() => {
    if (!mega) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") closeMega(0);
    };
    const onScroll = () => closeMega(0);

    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mega, closeMega]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    // Passive: this listener never calls preventDefault, so the browser can
    // keep scrolling on its own thread.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the drawer, and restore focus to the burger on close.
  useEffect(() => {
    document.body.classList.toggle("is-locked", open);

    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;

      // Trap focus inside the open drawer.
      const focusables = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => () => document.body.classList.remove("is-locked"), []);

  const headerClass = [
    "header",
    overlay ? "header--overlay" : "",
    dark ? "header--dark" : "",
    scrolled ? "is-scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Desktop contact strip */}
      {topbar ? (
        <div className="topbar">
          <div className="container topbar__inner">
            <div className="topbar__group">
              <a href={CONTACT.phoneHref}>
                <Icon name="phone" size={14} />
                {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.emailHref}>
                <Icon name="mail" size={14} />
                {CONTACT.email}
              </a>
            </div>
            <span className="topbar__tag">{BRAND.tagline} · Since {BRAND.since}</span>
          </div>
        </div>
      ) : null}

      <header className={headerClass}>
        <div className="container header__inner">
          <Logo />

          <nav className="nav" aria-label="Primary">
            {NAV.map((item) =>
              item.mega ? (
                <div
                  key={item.to}
                  className="nav__group"
                  onMouseEnter={openMega}
                  onMouseLeave={() => closeMega()}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav__link nav__link--mega${isActive ? " is-active" : ""}`
                    }
                    aria-expanded={mega}
                    aria-controls="services-mega"
                    onFocus={openMega}
                  >
                    {item.label}
                    <Icon name="chevron" size={13} className="nav__caret" />
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => `nav__link${isActive ? " is-active" : ""}`}
                  onFocus={() => closeMega(0)}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="header__actions">
            <Btn
              href={CONTACT.phoneHref}
              variant="outline"
              size="sm"
              className="header__call"
              icon="phone"
            >
              {CONTACT.phoneDisplay}
            </Btn>
            <Btn to="/book" size="sm" className="header__cta" icon="calendar">
              Book Appointment
            </Btn>
            <button
              ref={burgerRef}
              type="button"
              className={`burger${open ? " is-open" : ""}`}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <MegaMenu
          open={mega}
          onClose={() => closeMega(0)}
          onHoverPanel={openMega}
          onLeavePanel={() => closeMega()}
        />
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={open ? undefined : true}
      >
        <div className="container drawer__head">
          <Logo onClick={close} />
          <button type="button" className="burger is-open" aria-label="Close menu" onClick={close}>
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className="container drawer__body">
          <nav className="drawer__nav" aria-label="Mobile">
            {NAV.map((item, i) => {
              const num = <span className="drawer__num">{String(i + 1).padStart(2, "0")}</span>;

              // Services expands in place into the same two groups the desktop
              // mega-menu shows, rather than sending the reader to another page
              // to find out what is underneath it.
              if (item.mega) {
                return (
                  <div key={item.to} className="drawer__branch">
                    <div className="drawer__row">
                      <NavLink
                        to={item.to}
                        className={({ isActive }) => `drawer__link${isActive ? " is-active" : ""}`}
                        onClick={close}
                      >
                        {num}
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        className={`drawer__toggle${sub ? " is-open" : ""}`}
                        aria-expanded={sub}
                        aria-controls="drawer-services"
                        aria-label={`${sub ? "Collapse" : "Expand"} services menu`}
                        onClick={() => setSub((v) => !v)}
                      >
                        <Icon name="chevron" size={18} />
                      </button>
                    </div>

                    <div className={`drawer__sub${sub ? " is-open" : ""}`} id="drawer-services">
                      <div>
                        <div className="drawer__sub-inner">
                          {SERVICE_TABS.map((tab) => (
                            <div key={tab.id} className="drawer__sub-group">
                              <NavLink
                                className="drawer__sub-head"
                                to={tab.to}
                                onClick={close}
                              >
                                {tab.label}
                                <Icon name="arrowUpRight" size={14} />
                              </NavLink>
                              <ul>
                                {(tab.id === "women" ? WOMENS_SERVICES : MENS_SERVICES).map((s) => (
                                  <li key={s.slug}>
                                    <Link to={`${tab.to}/${s.slug}`} onClick={close}>
                                      {s.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => `drawer__link${isActive ? " is-active" : ""}`}
                  onClick={close}
                >
                  {num}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Actions only. The secondary link row and the phone/email/address
              block that used to sit either side of it are gone: the number was
              already the Call button, and the drawer closed on a wall of small
              print rather than on the three things a visitor opened it for. */}
          <div className="drawer__foot">
            <div className="drawer__actions">
              <Btn to="/book" size="sm" icon="calendar" onClick={close}>
                Book
              </Btn>
              <Btn href={CONTACT.phoneHref} variant="ghost" size="sm" icon="phone">
                Call
              </Btn>
              <Btn href={WHATSAPP} variant="ghost" size="sm" icon="whatsapp">
                WhatsApp
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
