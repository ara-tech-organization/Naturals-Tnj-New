import { GALLERY_GROUPS, MENS_SERVICES, WOMENS_SERVICES } from "./services";

/**
 * Deep-linkable sections, addressed as a second path segment rather than a
 * fragment — /services/cuts-styling, not /services#cuts-styling.
 *
 * The ids here must match the `id` attributes rendered on the page; ScrollToTop
 * looks the element up by id, and App treats anything not listed as a 404 so a
 * mistyped section does not quietly return the whole page.
 *
 * Women's and Men's services used to be separate pages (/womens-services,
 * /mens-grooming), each with its own section list. They're now both part of
 * /services, so every category slug from both catalogues — plus the
 * "womens"/"mens"/"occasion" anchors for the three category groups — lives
 * in this one list. Category slugs are unique across the two catalogues
 * (the men's ones are all prefixed "mens-"), so there's no collision.
 */
export const PAGE_SECTIONS = {
  "/services": [
    "womens",
    "mens",
    "occasion",
    ...WOMENS_SERVICES.map((s) => s.slug),
    ...MENS_SERVICES.map((s) => s.slug),
  ],
  "/pricing": ["rates", "occasion-rates", "terms"],
  "/offers": ["packages"],
  "/gallery": GALLERY_GROUPS.map((g) => g.id),
};

/** True when `section` is a real section of the page mounted at `base`. */
export function isKnownSection(base, section) {
  return Boolean(PAGE_SECTIONS[base]?.includes(section));
}
