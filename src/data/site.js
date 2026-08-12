
import { IMG } from "../assets";/**
 * SITE DATA — single source of truth for brand, contact, nav and social.
 *
 * Every value here is taken from the client's content document or the live
 * naturalsthanjavur.com site. Nothing in this file is invented. Where the
 * sources did not supply a value it is marked with `PLACEHOLDER` so it is
 * obvious what still needs the client's real information.
 */

export const BRAND = {
  name: "Naturals",
  place: "Thanjavur",
  full: "Naturals Thanjavur",
  legal: "Naturals Beauty Salon — Thanjavur",
  tagline: "Premium Beauty & Wellness",
  logo: IMG.logo,
  since: 2009,
  url: "https://naturalsthanjavur.com",
};

export const CONTACT = {
  branch: "Naturals — Arulananda Nagar",
  addressLines: [
    "No 2851/14, No 2, 1st Floor, Philomena Shop",
    "Arulananda Nagar, Thanjavur",
    "Tamil Nadu — 613007",
  ],
  addressShort: "Arulananda Nagar, Thanjavur — 613007",
  landmark: "Opposite Vinodhagan Hospital, Arulananda Nagar",
  /**
   * Landmark-led wayfinding for "salon near me" searches, where the visitor
   * needs recognisable local reference points rather than a postal address.
   * Every line is derived from the address the salon publishes — no distances
   * or routes are estimated here.
   */
  directions: [
    "Look for the Philomena Shop building — we're on the 1st floor.",
    "Directly opposite Vinodhagan Hospital, on the Arulananda Nagar main stretch.",
    "Searching \"Naturals unisex salon Thanjavur\" in Google Maps drops you at our door.",
  ],
  phoneDisplay: "+91 90870 00049",
  phoneHref: "tel:+919087000049",
  phoneRaw: "919087000049",
  email: "naturals.tj2@gmail.com",
  emailHref: "mailto:naturals.tj2@gmail.com",
  hours: [
    { days: "Monday — Saturday", time: "9:00 AM – 8:00 PM" },
    { days: "Sunday", time: "10:00 AM – 6:00 PM" },
  ],
  hoursShort: "Mon – Sat: 9 AM – 8 PM",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Naturals+unisex+salon+Arulanthar+nagar+Thanjavur",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4931029823315!2d79.13116237596353!3d10.773494531878411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab9b069029cff%3A0x58f9279539ef68c4!2sNaturals%20unisex%20salon!5e0!3m2!1sen!2sin!4v1700000000000",
  geo: { lat: 10.7734945, lng: 79.1311624 },
};

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/naturals.thanjavur",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/naturals.thanjavur/",
    icon: "facebook",
  },
];

/** Pre-filled WhatsApp enquiry on the salon's listed number. */
export const WHATSAPP = `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(
  "Hi Naturals Thanjavur, I'd like to book an appointment.",
)}`;

/**
 * BRANCHES
 *
 * The About copy and the live site both refer to "multiple branches", but only
 * the Arulananda Nagar address, phone and map embed were ever published. That
 * one branch is listed in full below; the rest are not invented. Add an object
 * of the same shape per branch as the client supplies them and the Locations
 * page, the branch picker in the booking form and the footer all pick it up.
 */
export const BRANCHES = [
  {
    id: "arulananda-nagar",
    name: CONTACT.branch,
    area: "Arulananda Nagar",
    addressLines: CONTACT.addressLines,
    addressShort: CONTACT.addressShort,
    landmark: CONTACT.landmark,
    directions: CONTACT.directions,
    phoneDisplay: CONTACT.phoneDisplay,
    phoneHref: CONTACT.phoneHref,
    email: CONTACT.email,
    emailHref: CONTACT.emailHref,
    hours: CONTACT.hours,
    mapsDirections: CONTACT.mapsDirections,
    mapsEmbed: CONTACT.mapsEmbed,
    image: IMG.saloon,
    imageAlt: "Interior of Naturals unisex salon in Thanjavur",
    services: "Full menu — women's, men's, bridal, spa",
    isPrimary: true,
  },
];

/**
 * OFFERS & MEMBERSHIP
 *
 * PLACEHOLDER — the printed rate card references a membership programme but
 * never sets out its price, tiers, benefits or validity, and no offer was
 * supplied in writing. The single verifiable rule is the exclusion below, which
 * is printed on the rate card itself. `tiers` and `offers` stay empty rather
 * than carrying invented discounts; fill them in and the Offers page renders
 * them in place of the "ask us" panel.
 */
export const MEMBERSHIP = {
  knownRules: [
    "Membership is not applicable for texture services (smoothening, straightening, keratin and botox).",
    "Listed service rates include shampoo and conditioning. Taxes applicable.",
    "Pricing varies by hair length and service level — ask for the current rate card in salon.",
  ],
  tiers: [],
  offers: [],
};

/**
 * Primary navigation.
 *
 * Services carries `mega: true` — it opens a two-tab panel (Women's / Men's)
 * listing the service categories beneath it, rather than sitting alongside
 * them as three separate top-level items. The tab contents are read from
 * `services.js` so the menu can never drift from the catalogue.
 */
export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services", mega: true },
  { label: "Bridal", to: "/bridal-makeover" },
  { label: "Pricing", to: "/pricing" },
  { label: "Offers", to: "/offers" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

/**
 * Secondary destinations. These are real pages with their own routes and
 * schema, kept out of the top bar so it stays readable at laptop widths —
 * they are reached from the footer and from in-page links instead.
 */
export const SECONDARY_NAV = [
  { label: "Packages & Combos", to: "/offers/packages" },
  { label: "Locations", to: "/locations" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Book Appointment", to: "/book" },
];

/** The two top-level tabs inside the Services mega-menu. */
export const SERVICE_TABS = [
  {
    id: "women",
    label: "Women's Services",
    to: "/womens-services",
    blurb: "Tailored beauty and hair care, crafted with premium products and modern techniques.",
    image: IMG.skincare,
    alt: "Women's beauty parlour and facial services at Naturals Thanjavur",
  },
  {
    id: "men",
    label: "Men's Services",
    to: "/mens-grooming",
    blurb: "Complete grooming for the modern man, from classic cuts to relaxing spa therapies.",
    image: IMG.mensGrooming,
    alt: "Men's haircut and grooming service in Thanjavur",
  },
];

/**
 * HOMEPAGE HERO SLIDES
 *
 * One slide per keyword theme rather than three rewordings of the same
 * headline — the H1 is the most heavily weighted text on the page, so each
 * rotation targets a search intent the site actually ranks for: the unisex
 * salon head term, bridal makeover, and men's grooming.
 *
 * `title` is a segment list so the italic accent can fall on the phrase that
 * carries the keyword, which differs slide to slide.
 */
/**
 * HERO MEDIA — PLACEHOLDER
 *
 * The hero is built to run a cinematic loop behind the headline. No film was
 * supplied, and stock footage would misrepresent the salon, so `video` stays
 * null and the same composition runs on the salon's own photography instead.
 *
 * To switch it on: drop an .mp4 in src/assets, import it here, and set `video`
 * to the import. Nothing else in the hero changes — the plates below become
 * the poster and the fallback. Keep it muted, looped and under ~3 MB; it is
 * loaded lazily (`preload="none"`) so it never blocks the first paint.
 */
export const HERO_MEDIA = {
  video: null,
};

export const HERO_SLIDES = [
  {
    id: "unisex",
    eyebrow: `${BRAND.name} ${BRAND.place} · Since ${BRAND.since}`,
    title: [{ t: "Thanjavur's Trusted Salon for " }, { t: "Hair, Bridal & Grooming", em: true }],
    text: "Looking for the best salon in Thanjavur? Naturals Beauty Parlour brings together expert hair styling, bridal makeup artistry, rejuvenating spa therapies, and complete grooming solutions under one roof. With 15+ years of trusted service, we've become one of the most recommended unisex salons in Thanjavur for both everyday beauty needs and once-in-a-lifetime moments.",
    cta: { label: "Book Your Appointment", to: "/book" },
    alt: { label: "Explore Services", to: "/services" },
    main: {
      src: IMG.hairstyle,
      alt: "Professional hair styling service at Naturals Thanjavur",
    },
    sub: {
      src: IMG.skincare,
      alt: "Facial treatment for glowing skin at Naturals Thanjavur",
    },
  },
  {
    id: "bridal",
    eyebrow: "Glam Up Your Special Day",
    title: [{ t: "Bridal Makeover in Thanjavur" , em: true }, { t: ", Crafted for Your Big Day" }],
    text: "As one of Thanjavur's most trusted bridal makeup artists, we craft flawless, camera-ready looks tailored to your outfit, skin tone, and style — with a personalised trial session before the day itself.",
    cta: { label: "Explore Bridal Services", to: "/bridal-makeover" },
    alt: { label: "Book a Bridal Trial", to: "/book" },
    main: {
      src: IMG.bridalPortrait,
      alt: "South Indian bridal makeup and jewellery styling at Naturals Thanjavur",
    },
    sub: {
      src: IMG.mehandi,
      alt: "Bridal mehandi applied by hand at Naturals Thanjavur",
    },
  },
  {
    id: "mens",
    eyebrow: "For Him",
    title: [{ t: "Men's Grooming Salon in Thanjavur", em: true }, { t: " for the Modern Man" }],
    text: "Sharp haircuts, expert beard styling and trimming, facials built for men's skin, and complete grooming packages — all in a unisex salon the men of Thanjavur have trusted for over 15 years.",
    cta: { label: "Explore Men's Grooming", to: "/mens-grooming" },
    alt: { label: "Book Your Session", to: "/book" },
    main: {
      src: IMG.mensCut,
      alt: "Men's haircut in the chair at Naturals Thanjavur",
    },
    sub: {
      src: IMG.beardTrim,
      alt: "Beard shaping and trimming at Naturals Thanjavur",
    },
  },
];

/**
 * PLACEHOLDER — the salon's Google Business Profile review link and any
 * embeddable widget ID were not supplied. Setting `reviewsUrl` lights up the
 * "Read our Google reviews" call to action under the testimonials; leaving it
 * null keeps the section to the reviews we can actually verify.
 */
export const GOOGLE_BUSINESS = {
  reviewsUrl: null,
  ratingDisplay: null,
  reviewCountDisplay: null,
};

/**
 * Counter figures carried over from the live site's stats section —
 * these are the client's own published numbers.
 */
export const STATS = [
  { value: 10000, suffix: "+", display: "10,000+", label: "Happy Customers" },
  { value: 15, suffix: "+", display: "15+", label: "Years Experience" },
  { value: 100, suffix: "+", display: "100+", label: "Bridal Works" },
  { value: 25, suffix: "+", display: "25+", label: "Expert Stylists" },
];

/** Trust signals — from the content document's "Trust Bar / USP Strip". */
export const TRUST_POINTS = [
  "15+ Years Experience",
  "10,000+ Happy Customers",
  "Certified Stylists",
  "Hygienic & Safe Environment",
];

/** "Why Thanjavur Trusts Naturals" — verbatim from the content document. */
export const WHY_US = [
  {
    title: "15+ Years of Proven Expertise",
    text: "Serving Thanjavur since 2009, with a track record built on consistent, dependable results.",
  },
  {
    title: "Certified & Experienced Stylists",
    text: "A trained team that stays current with global styling techniques and trends.",
  },
  {
    title: "Premium, Skin-Friendly Products",
    text: "Salon-grade products chosen to suit Indian skin and hair, never harsh on either.",
  },
  {
    title: "Hygienic, Comfortable Environment",
    text: "Clean, well-maintained spaces where every tool and station is prepared for you.",
  },
  {
    title: "Thousands of Happy Customers",
    text: "Trusted by more than 10,000 clients across Thanjavur and the surrounding districts.",
  },
  {
    title: "Personalized Beauty Solutions",
    text: "Every service is shaped around your hair type, skin type and the look you want.",
  },
];

/** Genuine testimonials carried over from the live site. */
export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    service: "Bridal Package",
    rating: 5,
    text: "Absolutely amazing service! The team made my wedding day perfect with their bridal package.",
  },
  {
    name: "Rajesh Kumar",
    service: "Men's Grooming",
    rating: 5,
    text: "Professional service and great ambiance. Best salon in Thanjavur for men's grooming.",
  },
  {
    name: "Meera Devi",
    service: "Hair Treatment",
    rating: 5,
    text: "My hair has never looked better! The hair treatment package worked wonders.",
  },
];

/** FAQs — verbatim from the content document's Home page FAQ block. */
export const FAQS = [
  {
    q: "What is the best salon in Thanjavur for hair and bridal makeovers?",
    a: "Naturals Thanjavur is one of the city's most trusted unisex salons, known for expert hair styling, bridal makeovers, and premium spa treatments backed by 15+ years of experience.",
  },
  {
    q: "Where can I find a good bridal makeup artist in Thanjavur?",
    a: "Naturals Thanjavur offers professional bridal makeup packages, including trial sessions, to help every bride look flawless on her big day.",
  },
  {
    q: "Does Naturals Thanjavur offer men's grooming services too?",
    a: "Yes! We're a complete unisex salon offering dedicated men's grooming services in Thanjavur, from haircuts and beard styling to facials and spa treatments.",
  },
  {
    q: "What hair treatments are available at Naturals Thanjavur?",
    a: "We offer a full range of hair care services in Thanjavur, including keratin treatments, hair smoothening, hair spa therapy, and expert styling for all hair types.",
  },
  {
    q: "Is there a good spa near me in Thanjavur for relaxation?",
    a: "Naturals Thanjavur provides rejuvenating spa and body treatments designed to help you relax and unwind, right in the heart of the city.",
  },
  {
    q: "Do I need to book an appointment in advance at a salon in Thanjavur?",
    a: "While walk-ins are welcome, we recommend booking your appointment in advance, especially for bridal packages and spa sessions, to secure your preferred time slot.",
  },
  {
    q: "What facial treatments does Naturals Thanjavur offer for glowing skin?",
    a: "Our skincare experts offer customized facial treatments in Thanjavur using premium products suited to your skin type, helping you achieve a healthy, natural glow.",
  },
  {
    q: "Are there special couple or family salon packages in Thanjavur?",
    a: "Yes, Naturals Thanjavur offers Couple's Special and Family Care packages, making it easy for loved ones to enjoy premium beauty and grooming services together.",
  },
  {
    q: "What makes Naturals Thanjavur different from other salons nearby?",
    a: "With 15+ years of expertise, certified stylists, premium products, and a strong focus on hygiene, Naturals Thanjavur has earned the trust of thousands of customers across the city.",
  },
  {
    q: "How do I book an appointment at Naturals Thanjavur?",
    a: `You can easily book an appointment by calling ${CONTACT.phoneDisplay} or visiting our salon at Arulananda Nagar, Thanjavur — walk-ins are welcome too!`,
  },
];

/**
 * PAGE-SPECIFIC FAQs
 *
 * Search queries are mostly phrased as questions, so this is where the
 * long-tail keywords earn their place — in visible copy and FAQPage schema
 * rather than in a meta tag Google stopped reading in 2009.
 *
 * Every answer is built from services the content document actually lists.
 * No prices, guarantees or capabilities are claimed that the sources do not
 * already state.
 */
export const PAGE_FAQS = {
  womens: [
    {
      q: "Which is the best ladies beauty parlour in Thanjavur for hair and skin?",
      a: "Naturals is a trusted women's salon in Thanjavur, offering cuts and colour, texture services, scalp and hair rituals, facials, body polish, reflexology and mani-pedi under one roof — backed by 15+ years of service and certified stylists.",
    },
    {
      q: "Do you offer hair smoothening and keratin treatment for women in Thanjavur?",
      a: "Yes. Our Texture range covers smoothening, straightening, keratin and botox, each available for short and long hair. Pricing varies by hair length, so call us for the current rate card.",
    },
    {
      q: "What facial treatments for women are available?",
      a: "Express Facial, No-Tan, Detox Charcoal, Brightening Bliss, Forever Youthful and Hydra Facial. Jelly peel-off and Bright Care add-ons can be combined with any of them, and De-tan can be booked alongside or on its own.",
    },
    {
      q: "Is there a women's hair spa in Thanjavur at Naturals?",
      a: "Our Hair Ritual range covers head massage, Classic Hair Spa and Color Save repair for coloured hair, and our Scalp Ritual range adds dandruff control and hair fall control as 5+1 courses.",
    },
    {
      q: "Do you have a women's spa or body spa near me in Thanjavur?",
      a: "We offer reflexology for hands, feet and neck & shoulder, along with organic spa mani-pedi options — relaxation treatments you can book on their own or alongside a facial.",
    },
  ],

  mens: [
    {
      q: "Which men's salon in Thanjavur should I go to for a haircut?",
      a: "Naturals is a complete unisex salon for men in Thanjavur. Our barbers handle modern cuts and styling, and every service starts with a consultation on your hair growth and routine.",
    },
    {
      q: "Do you offer beard styling and beard trimming in Thanjavur?",
      a: "Yes — beard and moustache shaping, trimming and colouring, plus our Executive Shave with express clean-up.",
    },
    {
      q: "What men's facial treatments do you offer?",
      a: "Manly Radiance, Detox Charcoal, Brightening Bliss and Hydra Facial, all suited to men's skin, with Bright Care and De-tan available as add-ons.",
    },
    {
      q: "Is there a men's spa in Thanjavur at Naturals?",
      a: "We offer reflexology for hands, feet and neck & shoulder, head massage and hair spa, plus the Gentlemen's Club grooming combo.",
    },
    {
      q: "Can men book hair smoothening or keratin treatment here?",
      a: "Yes. Smoothening, straightening, keratin and botox are all available for men, to manage frizz and improve hair texture.",
    },
  ],

  bridal: [
    {
      q: "Where can I find the best bridal makeup in Thanjavur?",
      a: "Naturals is one of Thanjavur's most trusted bridal makeup artists, crafting camera-ready looks tailored to your outfit, skin tone and style — from engagement through to the wedding day.",
    },
    {
      q: "Do you offer a bridal trial session before the wedding?",
      a: "Yes. Our bridal packages include a personalised trial session so you can adjust anything you want changed well before the morning itself.",
    },
    {
      q: "What does a bridal package at Naturals include?",
      a: "Bridal makeup, hairdo and saree draping, with groom makeup, party makeup and mehandi available alongside for the rest of the celebration.",
    },
    {
      q: "Do you do wedding makeup for the groom and family too?",
      a: "We offer groom makeup so both of you photograph consistently, plus party makeup, hairdo and mehandi for family and guests.",
    },
    {
      q: "How far ahead should I book a bridal package in Thanjavur?",
      a: `Bridal dates book out well ahead of the season. Call ${CONTACT.phoneDisplay} to check availability for your date and to schedule your trial.`,
    },
  ],
};

/** Core values and achievements retained from the live site's About page. */
export const CORE_VALUES = [
  {
    title: "Excellence",
    text: "We hold every service to a standard we would be happy to receive ourselves.",
  },
  {
    title: "Integrity",
    text: "We operate with complete transparency and honesty in all our dealings.",
  },
  {
    title: "Care",
    text: "Personalised attention for every client, on every visit, without exception.",
  },
  {
    title: "Innovation",
    text: "We keep evolving with the latest styling trends, tools and techniques.",
  },
];

/**
 * PLACEHOLDER — the live site lists the team as "XXX / YYY / ZZZ" and the
 * content document asks for real names and photos, which were not supplied.
 * Replace `name` and add `photo` once the client provides them.
 */
export const TEAM = [
  {
    name: "PLACEHOLDER — Stylist name",
    role: "Senior Hair Stylist",
    experience: "12+ Years",
    specialty: "Bridal Hair & Advanced Styling",
  },
  {
    name: "PLACEHOLDER — Stylist name",
    role: "Men's Grooming Specialist",
    experience: "8+ Years",
    specialty: "Modern Cuts & Beard Styling",
  },
  {
    name: "PLACEHOLDER — Stylist name",
    role: "Skin Care Expert",
    experience: "10+ Years",
    specialty: "Anti-ageing & Facial Treatments",
  },
];
