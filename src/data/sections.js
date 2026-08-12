import { GALLERY_GROUPS, MENS_SERVICES, WOMENS_SERVICES } from "./services";

/**
 * Deep-linkable sections, addressed as a second path segment rather than a
 * fragment — /womens-services/cuts-styling, not /womens-services#cuts-styling.
 *
 * The ids here must match the `id` attributes rendered on the page; ScrollToTop
 * looks the element up by id, and App treats anything not listed as a 404 so a
 * mistyped section does not quietly return the whole page.
 */
export const PAGE_SECTIONS = {
  "/services": ["womens", "mens", "occasion"],
  "/womens-services": WOMENS_SERVICES.map((s) => s.slug),
  "/mens-grooming": MENS_SERVICES.map((s) => s.slug),
  "/pricing": ["rates", "occasion-rates", "terms"],
  "/offers": ["packages"],
  "/gallery": GALLERY_GROUPS.map((g) => g.id),
};

/** True when `section` is a real section of the page mounted at `base`. */
export function isKnownSection(base, section) {
  return Boolean(PAGE_SECTIONS[base]?.includes(section));
}
