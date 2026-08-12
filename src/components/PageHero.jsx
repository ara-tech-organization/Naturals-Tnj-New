import { Link } from "react-router-dom";
import { Eyebrow } from "./Ui";

function Breadcrumb({ trail }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        <li>
          <Link to="/">Home</Link>
        </li>
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.label}>
              {last || !c.to ? (
                <span aria-current={last ? "page" : undefined}>{c.label}</span>
              ) : (
                <Link to={c.to}>{c.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Inner-page hero: photographic band under a plum scrim, with the breadcrumb
 * and H1 anchored to the bottom edge. Every inner page uses this so the sites'
 * pages open with the same rhythm, then diverge in their body composition.
 */
export default function PageHero({ eyebrow, title, text, image, alt, trail = [], children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg">
        <img src={image} alt={alt} fetchPriority="high" decoding="async" />
      </div>
      <div className="container page-hero__inner">
        {trail.length ? <Breadcrumb trail={trail} /> : null}
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="page-hero__title">{title}</h1>
        {text ? <p className="page-hero__text lead">{text}</p> : null}
        {children}
      </div>
    </section>
  );
}
