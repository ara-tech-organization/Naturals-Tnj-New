/**
 * SERVICE CATALOGUE
 *
 * Category names and descriptions are taken verbatim (or with light
 * formatting only) from the client's content document — "Final Services"
 * and the Services page H2/H3 copy. The `items` arrays list the individual
 * sub-services named in the document's detailed web-structure section.
 *
 * PRICING NOTE: the content document asks for a rate card, but no prices
 * were supplied in it. No prices are invented here — the accordion shows
 * the real sub-service names and directs pricing enquiries to the salon.
 */

import { IMG } from "../assets";

export const PRICING_NOTE =
  "Above services include shampoo and conditioning. Taxes applicable. Membership not applicable for textures.";

export const PRICING_DISCLAIMER =
  "Pricing varies by hair length and service level. Call us for the current rate card.";

/* ---------------------------------------------------------------- WOMEN'S */

export const WOMENS_SERVICES = [
  {
    slug: "cuts-styling",
    name: "Cuts & Styling",
    summary: "Precision haircuts and styling suited to every hair type and face shape.",
    text: "Precision haircuts and styling suited to every hair type and face shape. Our stylists stay updated with the latest trends to give you a fresh, confident look every time.",
    image: IMG.hairstyle,
    alt: "Professional hair styling service at Naturals Thanjavur",
    items: ["Haircut", "Styling & Blow Dry"],
  },
  {
    slug: "world-of-colors",
    name: "World of Colors",
    summary: "Highlights, global colour and grey coverage using skin-friendly formulas.",
    text: "Vibrant fashion colours and seamless grey coverage using skin-friendly, premium formulas. Whether you want a subtle change or a bold transformation, our colour experts tailor every shade to you.",
    image: IMG.hairColour,
    alt: "Hair colouring and highlights at Naturals Thanjavur salon",
    items: [
      "Highlights (Full-Head Colour)",
      "Global Colour",
      "Root Touch-Up",
      "Fashion Colours",
      "Grey Coverage",
    ],
  },
  {
    slug: "texture",
    name: "Texture",
    summary: "Smoothening, straightening, keratin and botox for silkier, healthier hair.",
    text: "Smoothening, straightening, keratin, and botox treatments for silkier, healthier hair. These treatments are designed to reduce frizz and restore shine while keeping your hair's natural strength intact.",
    image: IMG.hairTexture,
    alt: "Hair smoothening and keratin treatment in Thanjavur",
    items: [
      "Smoothening (Short / Long)",
      "Straightening (Short / Long)",
      "Keratin (Short / Long)",
      "Botox (Short / Long)",
    ],
  },
  {
    slug: "hair-ritual",
    name: "Hair Ritual",
    summary: "Head massage, classic hair spa and colour-save repair for deep nourishment.",
    text: "Soothing head massage, classic hair spa, and colour-save repair for deep nourishment. This relaxing ritual leaves hair soft and revitalized, and keeps coloured hair looking freshly done for longer.",
    image: IMG.hairSpa,
    alt: "Relaxing hair spa and head massage at Naturals Thanjavur",
    items: ["Head Massage", "Classic Hair Spa", "Color Save — Repair & Rejuvenate"],
  },
  {
    slug: "facials",
    name: "Facials",
    summary: "Express, charcoal, brightening bliss and hydra facials for radiant skin.",
    text: "Express facial, charcoal facial, brightening bliss, and hydra facial for radiant, glowing skin. Each facial is chosen to target specific skin concerns, leaving you refreshed and camera-ready.",
    image: IMG.facial,
    alt: "Facial treatment for glowing skin at Naturals Thanjavur",
    items: [
      "Express Facial",
      "No-Tan Facial",
      "Detox Charcoal",
      "Brightening Bliss",
      "Forever Youthful",
      "Hydra Facial",
    ],
  },
  {
    slug: "facial-add-ons",
    name: "Facial Add-ons",
    summary: "Jelly peel-offs and bright care to enhance your facial results.",
    text: "Jelly peel-off masks and bright care treatments that enhance your facial results. These quick add-ons work alongside your regular facial for an extra glow.",
    image: IMG.facialMask,
    alt: "Jelly peel-off and bright care facial add-on treatments in Thanjavur",
    items: [
      "Jelly Peel-off — Green Tea",
      "Jelly Peel-off — Rose Petal",
      "Bright Care (Neck)",
      "Bright Care (Elbow)",
    ],
  },
  {
    slug: "reflexology",
    name: "Reflexology",
    summary: "Relaxing therapy for hands, feet, and neck & shoulder tension relief.",
    text: "Relaxing therapy for hands, feet, and neck & shoulder tension relief. A perfect way to unwind and release everyday stress from head to toe.",
    image: IMG.reflexology,
    alt: "Relaxing spa therapy at Naturals Thanjavur salon",
    items: ["Hands", "Feet", "Neck & Shoulder"],
  },
  {
    slug: "body-polish",
    name: "Body Polish",
    summary: "Back, face and neck polishing for smoother, brighter skin.",
    text: "Polishing treatments that buff away dull surface skin and even out tone — taken on their own or before an occasion, on the areas an outfit leaves on show.",
    image: IMG.bodyPolish,
    alt: "Body polishing treatment at Naturals Thanjavur",
    items: ["Back Polish", "Face & Neck"],
  },
  {
    slug: "de-tan",
    name: "De-tan",
    summary: "Tan removal that restores your natural, even skin tone.",
    text: "A de-tan session that lifts sun tan and restores your natural, even tone. Book it on its own or add it to a facial.",
    image: IMG.skincare,
    alt: "De-tan treatment at Naturals Thanjavur",
    items: ["De-tan"],
  },
  {
    slug: "mani-pedi",
    name: "Mani-Pedi",
    summary: "Cocoa butter, coffee & crème, dead sea and organic spa options.",
    text: "Cocoa butter, coffee & crème, dead sea, and organic spa mani-pedicure options for well-groomed hands and feet. Choose the level of pampering that suits your schedule and style.",
    image: IMG.manicure,
    alt: "Manicure and pedicure spa treatment at Naturals Thanjavur",
    items: ["Cocoa Butter", "Coffee & Crème", "Dead Sea", "Organic Spa Combo"],
  },
  {
    slug: "foot-treatment",
    name: "Foot Treatment",
    summary: "Heel peel for cracked, hardened heels.",
    text: "A heel peel that softens hardened, cracked skin and leaves feet comfortable again — the treatment to book when a regular pedicure isn't enough.",
    image: IMG.pedicure,
    alt: "Heel peel foot treatment at Naturals Thanjavur",
    items: ["Heel Peel"],
  },
  {
    slug: "womens-specials",
    name: "Women's Specials",
    summary: "The under eye ritual and the ice cream mani-pedi combo.",
    text: "Two signature treatments you won't find on the standard menu — a course-based under eye ritual, and the ice cream manicure and pedicure combo.",
    image: IMG.makeup,
    alt: "Signature beauty treatments for women at Naturals Thanjavur",
    items: ["Under Eye Ritual (5+1)", "Ice Cream Manicure & Pedicure Combo"],
  },
];

/* ------------------------------------------------------------------ MEN'S */

export const MENS_SERVICES = [
  {
    slug: "mens-cuts-styling",
    name: "Cuts & Styling",
    summary: "Modern, sharp haircuts and styling for every look.",
    text: "Modern, sharp haircuts and styling for every look. Our barbers combine classic techniques with the latest trends to keep you looking effortlessly sharp.",
    image: IMG.mensCut,
    alt: "Men's haircut and grooming service in Thanjavur",
    items: ["Haircut", "Styling"],
  },
  {
    slug: "mens-beard-moustache",
    name: "Beard & Moustache",
    summary: "Shaping, trimming and colouring for beard and moustache.",
    text: "Beard and moustache work handled properly — shaping and trimming to your face, and colouring that covers greys without looking painted on.",
    image: IMG.beardMoustacheMen,
    alt: "Beard styling and colouring for men at Naturals Thanjavur",
    items: ["Beard Styling & Trim", "Beard Coloring", "Moustache Color"],
  },
  {
    slug: "mens-world-of-colors",
    name: "World of Colors",
    summary: "Fashion colours, grey coverage and global colour for men's hair.",
    text: "Fashion colours, grey coverage, and global colour for a fresh new style. A great way to update your look while covering greys naturally and confidently.",
    image: IMG.worldOfColorsMen,
    alt: "Men's hair colouring and grey coverage at Naturals Thanjavur",
    items: ["Fashion Colours", "Grey Coverage", "Global & Root Colour"],
  },
  {
    slug: "mens-texture",
    name: "Texture",
    summary: "Smoothening, straightening, keratin and botox for stronger hair.",
    text: "Smoothening, straightening, keratin, and botox treatments for stronger, healthier hair. These treatments help manage frizz and improve hair texture for long-lasting results.",
    image: IMG.hairTexture,
    alt: "Men's hair smoothening and keratin treatment in Thanjavur",
    items: ["Smoothening", "Straightening", "Keratin", "Botox"],
  },
  {
    slug: "mens-hair-ritual",
    name: "Hair Ritual",
    summary: "Head massage, hair spa and dandruff control treatment.",
    text: "Relaxing head massage, hair spa, and dandruff control treatment. A rejuvenating experience that improves scalp health and leaves hair feeling refreshed.",
    image: IMG.hairRitualMen,
    alt: "Men's head massage and hair spa at Naturals Thanjavur",
    items: ["Head Massage", "Hair Spa", "Dandruff Control Treatment"],
  },
  {
    slug: "mens-facials",
    name: "Facials",
    summary: "Manly radiance, detox charcoal, brightening bliss and hydra facial.",
    text: "Manly radiance, detox charcoal, brightening bliss, and hydra facial for refreshed skin. Designed specifically for men's skin, these facials help combat dullness and daily grime.",
    image: IMG.facialsMen,
    alt: "Men's facial treatment in Thanjavur at Naturals",
    items: ["Manly Radiance", "Detox Charcoal", "Brightening Bliss", "Hydra Facial"],
  },
  {
    slug: "mens-facial-add-ons",
    name: "Facial Add-ons",
    summary: "Bright care for the neck and elbows alongside your facial.",
    text: "Bright care for the areas a facial doesn't reach. A simple add-on that evens out tone on the neck and elbows while you're already in the chair.",
    image: IMG.facialAddOnsMen,
    alt: "Bright care facial add-on for men at Naturals Thanjavur",
    items: ["Bright Care (Neck)", "Bright Care (Elbow)"],
  },
  {
    slug: "mens-executive-shave",
    name: "Executive Shave",
    summary: "A traditional shave finished with an express clean-up.",
    text: "The full shave, taken slowly — hot towel, close finish, and an express clean-up afterwards so you leave with skin that feels as sharp as the shave looks.",
    image: IMG.executiveShave,
    alt: "Executive shave for men at Naturals Thanjavur",
    items: ["Shave", "Express Clean-up"],
  },
  {
    slug: "mens-reflexology",
    name: "Reflexology",
    summary: "Therapeutic relief for hands, feet, and neck & shoulder.",
    text: "Therapeutic relief for hands, feet, and neck & shoulder. Ideal for relieving tension after a long day, leaving you relaxed and recharged.",
    image: IMG.reflexology,
    alt: "Men's reflexology and relaxation therapy in Thanjavur",
    items: ["Hands", "Feet", "Neck & Shoulder"],
  },
  {
    slug: "mens-de-tan",
    name: "De-tan",
    summary: "Tan removal for face, neck and arms.",
    text: "A de-tan session that lifts sun tan and restores your natural tone — the quickest fix for a summer of riding to work.",
    image: IMG.deTanMen,
    alt: "De-tan treatment for men at Naturals Thanjavur",
    items: ["De-tan"],
  },
  {
    slug: "mens-mani-pedi",
    name: "Mani-Pedi",
    summary: "Basic, advanced and organic spa grooming for hands and feet.",
    text: "Basic, advanced, and organic spa grooming for hands and feet. A grooming essential that keeps your hands and feet clean, healthy, and well-maintained.",
    image: IMG.maniPediMen,
    alt: "Men's manicure and pedicure grooming at Naturals Thanjavur",
    items: ["Basic", "Advanced", "Organic Spa"],
  },
  {
    slug: "mens-specials",
    name: "Men's Specials",
    summary: "The Gentlemen's Club grooming combo.",
    text: "Our signature men's combo — several of the services above bundled into one sitting at a combo rate. Ask for the current inclusions when you book.",
    image: IMG.mensSpecialsCard,
    alt: "Gentlemen's Club grooming combo at Naturals Thanjavur",
    items: ["Gentlemen's Club Combo"],
  },
];

/* -------------------------------------------------- GLAM UP YOUR SPECIAL DAY */

export const OCCASION_SERVICES = [
  {
    name: "Bridal Makeup",
    text: "A flawless, camera-ready bridal look built around your outfit, skin tone and style — with a personalised trial session before the day itself.",
  },
  {
    name: "Groom Makeup",
    text: "Refined, natural grooming and makeup for the groom, so both of you look your best in every frame.",
  },
  {
    name: "Party Makeup",
    text: "Reception, sangeet or celebration looks — polished, long-wearing and made for photographs.",
  },
  {
    name: "Saree Draping",
    text: "Expert draping in the style you want, pinned to hold beautifully through the longest of days.",
  },
  {
    name: "Hairdo",
    text: "Bridal and occasion hairstyling, from classic South Indian sets to contemporary finishes.",
  },
  {
    name: "Mehandi",
    text: "Intricate bridal and guest mehandi applied by experienced artists.",
  },
];

/* -------------------------------------------------------- HOMEPAGE PILLARS */

/**
 * The four service pillars written for the homepage, using the H3 copy
 * from the content document's "Our Premium Salon Services in Thanjavur".
 */
export const SERVICE_PILLARS = [
  {
    tag: "Hair",
    title: "Hair Salon Services in Thanjavur",
    text: "From precision haircuts to advanced hair spa therapy, keratin treatments, and smoothening, our hair salon in Thanjavur is built around the latest techniques and premium, salon-grade products. Whether you're after a bold transformation or subtle upkeep, our stylists tailor every service to you.",
    image: IMG.hairstyle,
    alt: "Professional hair styling service at Naturals Thanjavur",
    to: "/services/womens",
    cta: "Book Your Session",
  },
  {
    tag: "Women",
    title: "Women's Beauty Parlour Services",
    text: "As a trusted beauty parlour for women in Thanjavur, we offer everything from hair spa and skin whitening facials to full body spa treatments, all designed around what makes you feel most confident.",
    image: IMG.skincare,
    alt: "Women's beauty parlour and facial services at Naturals Thanjavur",
    to: "/services/womens",
    cta: "Book Your Session",
  },
  {
    tag: "Men",
    title: "Men's Grooming & Salon Services",
    text: "Our unisex salon for men in Thanjavur offers sharp haircuts, expert beard styling and trimming, facial treatments, and complete grooming packages for the modern man who wants to look effortlessly put-together.",
    image: IMG.mensGrooming,
    alt: "Men's haircut and grooming service in Thanjavur",
    to: "/services/mens",
    cta: "Book Your Session",
  },
  {
    tag: "Bridal",
    title: "Bridal Makeup Artist in Thanjavur",
    text: "As one of Thanjavur's most trusted bridal makeup artists, we craft flawless, camera-ready looks tailored to your outfit, skin tone, and style. From engagement to wedding day, our bridal packages include personalized trial sessions. Walk down the aisle with total confidence.",
    image: IMG.bridalPortrait,
    alt: "South Indian bridal makeup by Naturals Thanjavur",
    to: "/bridal-makeover",
    cta: "Book Your Session",
  },
];

/**
 * Gallery groups mirror the four H2 sections of the content document's
 * Gallery page. Images are the salon's own photography plus the imagery
 * already in use on naturalsthanjavur.com.
 */
export const GALLERY_GROUPS = [
  {
    id: "bridal",
    title: "Bridal Makeup Transformations",
    images: [
      { src: IMG.bridalPortrait, alt: "South Indian bridal makeup and jewellery styling" },
      { src: IMG.makeup, alt: "Bridal makeover by Naturals Thanjavur makeup artists" },
      { src: IMG.bridalJewellery, alt: "Bride in red and gold, styled and ready for the ceremony" },
      { src: IMG.bridalMakeover, alt: "Bridal makeup and hairstyling at Naturals Thanjavur" },
      { src: IMG.mehandi, alt: "Bridal mehandi applied by hand" },
    ],
  },
  {
    id: "hair",
    title: "Hair Styling & Treatments",
    images: [
      { src: IMG.hairstyle, alt: "Before and after hair transformation at Naturals Thanjavur" },
      { src: IMG.hairColour, alt: "Highlights and colour work in progress" },
      { src: IMG.hairTexture, alt: "Hair smoothening and keratin treatment at Naturals Thanjavur" },
      { src: IMG.hairSpa, alt: "Hair spa and wash at the basin" },
      { src: IMG.scalpRitual, alt: "Scalp ritual and head massage" },
      { src: IMG.hairStyling, alt: "Styling and blow dry at Naturals Thanjavur" },
    ],
  },
  {
    id: "mens",
    title: "Men's Grooming Highlights",
    images: [
      { src: IMG.mensCut, alt: "Men's haircut in the barber chair" },
      { src: IMG.beardTrim, alt: "Beard shaping and trimming" },
      { src: IMG.executiveShave, alt: "Executive shave for men" },
      { src: IMG.mensGrooming, alt: "Men's haircut and grooming service in Thanjavur" },
      { src: IMG.beardMoustacheMen, alt: "Beard styling and grooming for men at Naturals Thanjavur" },
    ],
  },
  {
    id: "spa",
    title: "Spa & Skin Care Moments",
    images: [
      { src: IMG.facial, alt: "Facial treatment at Naturals Thanjavur" },
      { src: IMG.facialMask, alt: "Face mask and add-on treatment" },
      { src: IMG.bodyPolish, alt: "Body polish and spa therapy" },
      { src: IMG.reflexology, alt: "Reflexology and foot therapy" },
      { src: IMG.manicure, alt: "Manicure at Naturals Thanjavur" },
      { src: IMG.pedicure, alt: "Pedicure and foot treatment" },
      { src: IMG.spa, alt: "Relaxing spa therapy at Naturals Thanjavur salon" },
      { src: IMG.salonInterior, alt: "Inside the salon at Naturals Thanjavur" },
      { src: IMG.beautyServices, alt: "The styling stations at Naturals Thanjavur" },
    ],
  },
];

/** Flat list used to populate the booking form's service picker. */
export const BOOKING_SERVICES = [
  {
    id: "women",
    group: "Women's Services",
    options: WOMENS_SERVICES.map((s) => s.name),
  },
  {
    id: "men",
    group: "Men's Services",
    options: MENS_SERVICES.map((s) => s.name),
  },
  {
    id: "occasion",
    group: "Glam Up Your Special Day",
    options: OCCASION_SERVICES.map((s) => s.name),
  },
];

/* -------------------------------------------------- POPULAR SERVICES STRIP */

/**
 * The homepage shortcut row. Each entry points at a category anchor inside the
 * Women's or Men's page — the same destinations the Services mega-menu uses —
 * so the strip is a genuine short-cut into the menu rather than a second,
 * competing set of links.
 */
const POPULAR = [
  { name: "Haircut & Styling", tag: "Women's", to: "/services/cuts-styling" },
  { name: "Hair Colour", tag: "Women's", to: "/services/world-of-colors" },
  { name: "Keratin & Smoothening", tag: "Women's", to: "/services/texture" },
  { name: "Hair Spa", tag: "Women's", to: "/services/hair-ritual" },
  { name: "Facials", tag: "Women's", to: "/services/facials" },
  { name: "Men's Haircut", tag: "Men's", to: "/services/mens-cuts-styling" },
  { name: "Beard Colour & Styling", tag: "Men's", to: "/services/mens-beard-moustache" },
  { name: "Men's Facial", tag: "Men's", to: "/services/mens-facials" },
  { name: "Mani-Pedi", tag: "Both", to: "/services/mani-pedi" },
  { name: "Bridal Makeup", tag: "Bridal", to: "/bridal-makeover" },
];

/**
 * Each entry carries the photograph of the category it opens, resolved from
 * the catalogue by the slug in its own `to` — so the strip is image-led
 * without a second list of images to keep in step. Change a category's photo
 * and the shortcut to it changes with it.
 *
 * The bridal entry points at a page rather than a category, so it falls
 * through to the bridal portrait.
 */
const CATEGORIES_BY_SLUG = new Map(
  [...WOMENS_SERVICES, ...MENS_SERVICES].map((c) => [c.slug, c]),
);

export const POPULAR_SERVICES = POPULAR.map((s) => {
  const category = CATEGORIES_BY_SLUG.get(s.to.split("/").pop());
  return {
    ...s,
    image: category?.image ?? IMG.bridalPortrait,
    alt: category?.alt ?? "Bridal makeup at Naturals Thanjavur",
  };
});

/* ------------------------------------------ SPECIAL PACKAGES / COMBOS */

/* ---------------------------------------------------------------- PRICING */

/**
 * RATE CARD PRICES
 *
 * PLACEHOLDER — the content document specifies a rate card page but supplies
 * no figures, and the printed card was not shared. Keys are
 * `${categorySlug}::${sub-service name}`; values are display strings exactly as
 * they should be printed (e.g. "₹450", "₹1,200 onwards", "₹800 / ₹1,400" for a
 * short/long split). Anything absent renders as "On request" rather than as an
 * invented number, so the page is publishable today and correct the moment the
 * real card arrives.
 */
export const PRICES = {};

export function priceFor(categorySlug, item) {
  return PRICES[`${categorySlug}::${item}`] ?? null;
}

/** True once at least one real price exists — flips the page out of "call us" mode. */
export const HAS_PRICES = Object.keys(PRICES).length > 0;
