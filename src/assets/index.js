/**
 * IMAGE REGISTRY
 *
 * Every photograph the site uses, imported once so Vite fingerprints and
 * bundles it. Reference images as `IMG.hairstyle` rather than by URL: a
 * wrong name then fails the build instead of 404-ing in production, and
 * the emitted filenames are content-hashed for long-lived caching.
 *
 * Adding an image: drop the file in this folder, import it, add it below.
 */

/* The salon's own photography, carried over from naturalsthanjavur.com */
import story from "./Story.jpg";
import beautyServices from "./beauty-services.jpg";
import bridalMakeover from "./bridal-makeover.jpg";
import hairStyling from "./hair-styling.jpg";
import hairstyle from "./hairstyle.jpg";
import heroBg from "./hero_bgimage.jpg";
import logo from "./logo.png";
import logo2 from "./logo2.png";
import makeup from "./makeup.jpeg";
import mensGroomingHero from "./mens-grooming-hero.jpg";
import mensGrooming from "./mens_grooming.jpeg";
import saloon from "./saloon.jpeg";
import skincare from "./skincare.jpeg";
import spaExperience from "./spa-experience.jpg";
import spa from "./spa.jpeg";
import wellness from "./wellness.jpeg";

/* Licensed stock, one per service family the salon had no photograph for.
   Source and photographer for each are recorded in CREDITS.json — all are
   Unsplash License (free for commercial use). Replace any of these with the
   salon's own work by overwriting the file; nothing else needs to change. */
import bridalPortrait from "./bridal-portrait.jpg";
import bridalJewellery from "./bridal-jewellery.jpg";
import mehandi from "./mehandi.jpg";
import salonInterior from "./salon-interior.jpg";
import hairColour from "./hair-colour.jpg";
import hairTexture from "./hair-texture.jpg";
import hairSpa from "./hair-spa.jpg";
import scalpRitual from "./scalp-ritual.jpg";
import facial from "./facial.jpg";
import facialMask from "./facial-mask.jpg";
import bodyPolish from "./body-polish.jpg";
import reflexology from "./reflexology.jpg";
import manicure from "./manicure.jpg";
import pedicure from "./pedicure.jpg";
import mensCut from "./mens-cut.jpg";
import beardTrim from "./beard-trim.jpg";
import executiveShave from "./executive-shave.jpg";

export const IMG = {
  story,
  beautyServices,
  bridalMakeover,
  hairStyling,
  hairstyle,
  heroBg,
  logo,
  logo2,
  makeup,
  mensGroomingHero,
  mensGrooming,
  saloon,
  skincare,
  spaExperience,
  spa,
  wellness,

  bridalPortrait,
  bridalJewellery,
  mehandi,
  salonInterior,
  hairColour,
  hairTexture,
  hairSpa,
  scalpRitual,
  facial,
  facialMask,
  bodyPolish,
  reflexology,
  manicure,
  pedicure,
  mensCut,
  beardTrim,
  executiveShave,
};

export default IMG;
