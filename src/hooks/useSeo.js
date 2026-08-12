import { useEffect } from "react";
import { BRAND } from "../data/site";
import { IMG } from "../assets";

function setMeta(selector, attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-route SEO. Writes title, description, keywords, canonical, Open Graph
 * and Twitter tags directly into <head>, plus an optional JSON-LD block that
 * is removed again on unmount so schema never leaks across routes.
 */
export function useSeo({
  title,
  description,
  path = "/",
  keywords,
  image = IMG.logo,
  schema,
}) {
  useEffect(() => {
    const canonical = `${BRAND.url}${path === "/" ? "/" : path}`;
    const absImage = image.startsWith("http") ? image : `${BRAND.url}${image}`;

    if (title) document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="keywords"]', "name", "keywords", keywords);
    setLink("canonical", canonical);

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:image"]', "property", "og:image", absImage);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", BRAND.legal);

    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", absImage);

    if (!schema) return undefined;

    const node = document.createElement("script");
    node.type = "application/ld+json";
    node.textContent = JSON.stringify(schema);
    document.head.appendChild(node);
    return () => node.remove();
  }, [title, description, path, keywords, image, schema]);
}

/** LocalBusiness / BeautySalon schema — reused as the site-wide base. */
export function localBusinessSchema(contact) {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: BRAND.legal,
    url: BRAND.url,
    image: `${BRAND.url}${IMG.saloon}`,
    logo: `${BRAND.url}${BRAND.logo}`,
    telephone: contact.phoneDisplay,
    email: contact.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No 2851/14, No 2, 1st Floor, Philomena Shop, Arulananda Nagar",
      addressLocality: "Thanjavur",
      addressRegion: "Tamil Nadu",
      postalCode: "613007",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.lat,
      longitude: contact.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/naturals.thanjavur",
      "https://www.facebook.com/naturals.thanjavur/",
    ],
  };
}

/** FAQPage schema built from the shared FAQ list. */
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
