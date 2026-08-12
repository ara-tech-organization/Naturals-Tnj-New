/**
 * KEYWORDS — verbatim from the client's content document.
 *
 * Grouped exactly as the document groups them, then mapped onto the page that
 * actually serves each search intent. One keyword belongs to one primary page
 * wherever possible: pointing the same phrase at several pages makes them
 * compete with each other for it.
 *
 * A note on `<meta name="keywords">`: Google has not used it as a ranking
 * signal since 2009, and `PAGE_KEYWORDS` is written into it mainly because the
 * document asks for it. The phrases below do real work through the visible
 * copy, headings, internal-link anchor text and schema on each page — not
 * through the meta tag.
 */

/* ---------------------------------------------- Source list, as supplied */

export const GOOGLE_KEYWORDS = [
  "best hair salon in thanjavur",
  "unisex salon thanjavur",
  "hair salon thanjavur",
  "best bridal makeup in thanjavur",
  "bridal makeup artist in thanjavur",
  "makeup artist in thanjavur",
  "best salon in thanjavur",
  "makeup artist thanjavur",
  "salon in thanjavur",
  "thanjavur makeup artist",
  "thanjavur bridal makeup",
  "best bridal makeup artist in thanjavur",
  "best beauty parlour in thanjavur",
  "best makeup artist in thanjavur",
  "ladies beauty parlour in thanjavur",
  "bridal makeup thanjavur",
  "naturals beauty parlour in thanjavur",
];

export const KEYWORD_GROUPS = {
  brand: [
    "Salon in Thanjavur",
    "Best salon in Thanjavur",
    "Beauty parlour in Thanjavur",
    "Naturals salon Thanjavur",
    "Unisex salon Thanjavur",
  ],
  hair: [
    "Hair salon Thanjavur",
    "Hair spa in Thanjavur",
    "Hair styling salon near me",
    "Hair smoothening Thanjavur",
    "Keratin treatment Thanjavur",
  ],
  bridal: [
    "Bridal makeup Thanjavur",
    "Bridal makeover salon Thanjavur",
    "Wedding makeup artist Thanjavur",
    "Bridal package salon near me",
  ],
  mens: [
    "Men's salon Thanjavur",
    "Men's grooming Thanjavur",
    "Beard styling salon near me",
    "Haircut for men Thanjavur",
  ],
  skinSpa: [
    "Facial treatment Thanjavur",
    "Skin care salon Thanjavur",
    "Spa in Thanjavur",
    "Body spa near me",
  ],
  packages: [
    "Salon packages in Thanjavur",
    "Couple spa package Thanjavur",
    "Family salon Thanjavur",
  ],
  womens: [
    "Women's salon Thanjavur",
    "Beauty parlour for women Thanjavur",
    "Ladies salon near me",
    "Women's hair spa Thanjavur",
    "Hair smoothening for women Thanjavur",
    "Keratin treatment for women Thanjavur",
    "Facial treatment for women Thanjavur",
    "Skin whitening facial Thanjavur",
    "Women's spa Thanjavur",
    "Body spa for women near me",
  ],
  mensFull: [
    "Men's salon Thanjavur",
    "Men's grooming Thanjavur",
    "Unisex salon for men Thanjavur",
    "Haircut for men Thanjavur",
    "Men's hair styling near me",
    "Beard styling salon near me",
    "Beard trimming Thanjavur",
    "Men's facial treatment Thanjavur",
    "Men's spa Thanjavur",
    "Men's skin care salon near me",
  ],
  neutral: [
    "Unisex salon Thanjavur",
    "Couple spa package Thanjavur",
    "Family salon Thanjavur",
    "Salon packages in Thanjavur",
  ],
};

/* -------------------------------------------------------- Helpers */

/** Lower-cases, de-duplicates and joins into a meta-keywords string. */
function meta(...lists) {
  const seen = new Set();
  const out = [];
  for (const phrase of lists.flat()) {
    const key = phrase.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out.join(", ");
}

/* --------------------------------------- Keyword → page assignment */

const G = KEYWORD_GROUPS;

export const PAGE_KEYWORDS = {
  /** Head terms and the brand name — the page most likely to rank for them. */
  home: meta(
    [
      "best salon in thanjavur",
      "salon in thanjavur",
      "best beauty parlour in thanjavur",
      "beauty parlour in thanjavur",
      "naturals beauty parlour in thanjavur",
      "naturals salon thanjavur",
      "unisex salon thanjavur",
      "best hair salon in thanjavur",
    ],
    G.brand,
    G.neutral,
  ),

  about: meta(
    [
      "naturals salon thanjavur",
      "naturals beauty parlour in thanjavur",
      "best salon in thanjavur",
      "about naturals thanjavur",
    ],
    G.brand,
  ),

  /** The catalogue page carries the service-category terms. */
  services: meta(G.hair, G.skinSpa, G.packages, [
    "salon services thanjavur",
    "unisex salon thanjavur",
  ]),

  womensServices: meta(G.womens, [
    "ladies beauty parlour in thanjavur",
    "best beauty parlour in thanjavur",
    "hair spa in thanjavur",
    "keratin treatment thanjavur",
    "hair smoothening thanjavur",
    "facial treatment thanjavur",
    "skin care salon thanjavur",
  ]),

  mensGrooming: meta(G.mensFull, G.mens, ["men's haircut thanjavur"]),

  /** Every bridal and makeup-artist phrase lands on the bridal page. */
  bridal: meta(
    [
      "bridal makeup thanjavur",
      "thanjavur bridal makeup",
      "bridal makeup artist in thanjavur",
      "best bridal makeup in thanjavur",
      "best bridal makeup artist in thanjavur",
      "makeup artist in thanjavur",
      "makeup artist thanjavur",
      "thanjavur makeup artist",
      "best makeup artist in thanjavur",
    ],
    G.bridal,
  ),

  gallery: meta([
    "naturals thanjavur gallery",
    "hair transformation thanjavur",
    "bridal makeup thanjavur photos",
    "best salon in thanjavur",
    "salon in thanjavur",
  ]),

  contact: meta([
    "salon in thanjavur",
    "beauty parlour in thanjavur",
    "naturals salon thanjavur",
    "salon near me thanjavur",
    "unisex salon thanjavur",
  ]),

  book: meta([
    "book salon appointment thanjavur",
    "salon booking thanjavur",
    "bridal makeup booking thanjavur",
    "hair salon appointment thanjavur",
    "best salon in thanjavur",
  ]),

  /** Price-intent searches — a distinct intent from the catalogue page. */
  pricing: meta([
    "salon price list thanjavur",
    "naturals salon rate card thanjavur",
    "haircut price in thanjavur",
    "bridal makeup price in thanjavur",
    "keratin treatment price thanjavur",
    "facial price in thanjavur",
    "beauty parlour price list thanjavur",
  ]),

  offers: meta(G.packages, [
    "salon offers in thanjavur",
    "salon membership thanjavur",
    "beauty parlour offers thanjavur",
    "salon discount thanjavur",
  ]),

  /** "Near me" and branch-finding intent. */
  locations: meta([
    "salon near me thanjavur",
    "naturals salon branches thanjavur",
    "beauty parlour near me thanjavur",
    "unisex salon arulananda nagar",
    "salon in thanjavur",
  ]),

  testimonials: meta([
    "naturals thanjavur reviews",
    "best salon in thanjavur reviews",
    "salon customer reviews thanjavur",
    "beauty parlour in thanjavur",
  ]),
};

/**
 * "Popular searches" links for the footer.
 *
 * Each entry is a real navigational shortcut to a distinct destination — a
 * page or a specific service anchor — using the phrase people actually search
 * for as the anchor text. Deliberately kept short and pointed at *different*
 * targets: a long list of keyword variants all aimed at the same page is the
 * spam pattern Google discounts.
 */
export const POPULAR_SEARCHES = [
  { label: "Hair Salon in Thanjavur", to: "/womens-services/cuts-styling" },
  { label: "Hair Spa in Thanjavur", to: "/womens-services/hair-ritual" },
  { label: "Keratin Treatment Thanjavur", to: "/womens-services/texture" },
  { label: "Facial Treatment Thanjavur", to: "/womens-services/facials" },
  { label: "Bridal Makeup Thanjavur", to: "/bridal-makeover" },
  { label: "Men's Grooming Thanjavur", to: "/mens-grooming" },
  { label: "Beard Styling & Trimming", to: "/mens-grooming/mens-beard-moustache" },
  { label: "Spa & Reflexology in Thanjavur", to: "/womens-services/reflexology" },
];
