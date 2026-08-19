import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import ScrollToTop from "./components/ScrollToTop";
import { useReveal } from "./hooks/useReveal";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Bridal from "./pages/Bridal";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import Pricing from "./pages/Pricing";
import Offers from "./pages/Offers";
import Locations from "./pages/Locations";
import TestimonialsPage from "./pages/TestimonialsPage";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import { isKnownSection } from "./data/sections";

/**
 * Pages whose sections are addressable, e.g. /services/cuts-styling.
 * They render the same component as the bare route — ScrollToTop takes the
 * trailing segment and scrolls that section into view.
 */
const SECTION_PAGES = [
  ["/services", Services],
  ["/pricing", Pricing],
  ["/offers", Offers],
  ["/gallery", Gallery],
];

/** Guards a section route so an unknown id 404s instead of silently serving
    the whole page under a URL that means nothing. */
function SectionRoute({ base, children }) {
  const { section } = useParams();
  return isKnownSection(base, section) ? children : <NotFound />;
}

/** Routes that open on a dark photographic PageHero the header floats over. */
const DARK_HERO_ROUTES = new Set([
  "/about",
  "/services",
  "/bridal-makeover",
  "/pricing",
  "/offers",
  "/locations",
  "/testimonials",
  "/gallery",
  "/contact",
  "/book",
]);

export default function App() {
  const { pathname } = useLocation();
  useReveal();

  // Every hero on the site is now a dark photograph the header floats over in
  // white — the homepage included, since its cinematic stage is full-bleed
  // imagery. Anything else (the 404) has no hero and gets the solid bar from
  // the start. Matched on the first segment only, so /services/cuts-styling
  // counts as its page.
  const isHome = pathname === "/";
  const isDarkHero = isHome || DARK_HERO_ROUTES.has(`/${pathname.split("/")[1]}`);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ScrollToTop />
      <Header overlay={isHome || isDarkHero} dark={isDarkHero} topbar={!isHome} />

      <main id="main" className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bridal-makeover" element={<Bridal />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {SECTION_PAGES.map(([path, Page]) => (
            <Route
              key={path}
              path={`${path}/:section`}
              element={
                <SectionRoute base={path}>
                  <Page />
                </SectionRoute>
              }
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
