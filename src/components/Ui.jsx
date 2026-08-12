import { isValidElement } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

/* ---------------------------------------------------------------- Eyebrow */

export function Eyebrow({ children, center = false, gold = false, className = "" }) {
  return (
    <span
      className={`eyebrow${center ? " eyebrow--center" : ""}${gold ? " eyebrow--gold" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Chapter */

/**
 * The editorial eyebrow: a gold rule and the label. Used on pages carrying the
 * `.editorial` scope, where sections want a quieter marker than the standard
 * eyebrow gives them.
 *
 * It used to open with a section numeral, which made the page read as a
 * numbered contents list; the numbers are gone and the rule now carries the
 * marker on its own.
 */
export function Chapter({ children }) {
  return (
    <span className="chapter">
      <span className="chapter__rule" aria-hidden="true" />
      <span className="chapter__label">{children}</span>
    </span>
  );
}

/* ----------------------------------------------------------------- Button */

/**
 * One button surface for the whole site. Renders a react-router <Link> for
 * internal paths, a plain <a> for tel:/mailto:/external URLs, and a <button>
 * when given an onClick with no destination — so the visual language of a
 * CTA never changes with its underlying element.
 */
export function Btn({
  to,
  href,
  children,
  variant = "solid",
  size = "",
  icon = "arrowRight",
  block = false,
  className = "",
  ...rest
}) {
  const cls = [
    "btn",
    variant !== "solid" ? `btn--${variant}` : "",
    size ? `btn--${size}` : "",
    block ? "btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={16} className="btn__icon" /> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------- Arrow link */

export function ArrowLink({ to, href, children, className = "" }) {
  const inner = (
    <>
      <span>{children}</span>
      <Icon name="arrowUpRight" size={16} />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`link-arrow ${className}`} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link to={to} className={`link-arrow ${className}`}>
      {inner}
    </Link>
  );
}

/* --------------------------------------------------------- Section heading */

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
  split = false,
  aside = null,
  as: Tag = "h2",
  /** Lets the enclosing <section> point aria-labelledby at this heading
   *  instead of carrying a duplicate visually-hidden copy of the same text. */
  titleId,
  className = "",
}) {
  const cls = [
    "sec-head",
    center ? "sec-head--center" : "",
    split ? "sec-head--split" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <div className="sec-head__group" data-reveal>
        {/* A string is wrapped in the standard eyebrow; an element is trusted
            to be its own label — the home page passes a chapter marker. */}
        {isValidElement(eyebrow) ? eyebrow : eyebrow ? <Eyebrow center={center}>{eyebrow}</Eyebrow> : null}
        <Tag className="sec-head__title" id={titleId}>
          {title}
        </Tag>
      </div>
      {/* Description and CTA travel together as one stack. In the split layout
          that stack is the second column, so the button sits under the copy it
          belongs to instead of drifting off as a third column of its own. */}
      {text || aside ? (
        <div className="sec-head__side">
          {text ? (
            <p className="sec-head__text lead" data-reveal>
              {text}
            </p>
          ) : null}
          {aside ? (
            <div className="sec-head__aside" data-reveal>
              {aside}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- Figure */

/**
 * Editorial image. `ratio` picks the crop so photographs are composed
 * deliberately rather than dropped into whatever box the grid gives them.
 */
export function Figure({
  src,
  alt,
  ratio = "portrait",
  framed = false,
  reveal = "clip",
  priority = false,
  className = "",
}) {
  const img = (
    <div className={`figure figure--${ratio} ${className}`} data-reveal={reveal}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" } : {})}
      />
    </div>
  );

  return framed ? <div className="figure-frame">{img}</div> : img;
}

/* ------------------------------------------------------------------ Chips */

export function Chips({ items }) {
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
