import PageHero from "../components/PageHero";
import Icon from "../components/Icon";
import { CtaBanner, FaqSection } from "../components/Blocks";
import { Btn, SectionHeading } from "../components/Ui";
import { BRANCHES, CONTACT, WHATSAPP } from "../data/site";
import { localBusinessSchema, useSeo } from "../hooks/useSeo";
import { PAGE_KEYWORDS } from "../data/keywords";
import { IMG } from "../assets";

const SCHEMA = localBusinessSchema(CONTACT);

function Branch({ branch }) {
  return (
    <article className="branch" id={branch.id}>
      <div className="branch__media" data-reveal="clip">
        <img src={branch.image} alt={branch.imageAlt} loading="lazy" decoding="async" />
        {branch.isPrimary ? <span className="branch__flag">Main Branch</span> : null}
      </div>

      <div className="branch__body" data-reveal="right">
        <h3 className="branch__name">{branch.name}</h3>
        <p className="branch__services">{branch.services}</p>

        <ul className="visit__list">
          <li>
            <Icon name="mapPin" size={18} />
            <div>
              <span className="visit__label">Address</span>
              {branch.addressLines.map((l) => (
                <span key={l} className="visit__value">
                  {l}
                </span>
              ))}
              <span className="visit__hint">{branch.landmark}</span>
            </div>
          </li>
          <li>
            <Icon name="phone" size={18} />
            <div>
              <span className="visit__label">Phone</span>
              <a className="visit__value inline-link" href={branch.phoneHref}>
                {branch.phoneDisplay}
              </a>
            </div>
          </li>
          <li>
            <Icon name="clock" size={18} />
            <div>
              <span className="visit__label">Working Hours</span>
              {branch.hours.map((h) => (
                <span key={h.days} className="visit__value">
                  {h.days}: {h.time}
                </span>
              ))}
            </div>
          </li>
        </ul>

        <div className="branch__directions">
          <span className="visit__label">How To Find Us</span>
          <ul>
            {branch.directions.map((line) => (
              <li key={line}>
                <Icon name="check" size={14} />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="branch__actions">
          <Btn href={branch.mapsDirections} size="sm" icon="arrowUpRight">
            Get Directions
          </Btn>
          <Btn href={branch.phoneHref} variant="outline" size="sm" icon="phone">
            Call This Branch
          </Btn>
          <Btn to="/book" variant="ghost" size="sm" icon="calendar">
            Book Here
          </Btn>
        </div>

        <div className="branch__map">
          <iframe
            src={branch.mapsEmbed}
            title={`Map showing ${branch.name} in Thanjavur`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </article>
  );
}

export default function Locations() {
  useSeo({
    title: "Our Branches in Thanjavur | Naturals Salon",
    description:
      "Find your nearest Naturals unisex salon in Thanjavur. Address, working hours, landmarks and directions for every branch — or call +91 90870 00049 to book.",
    path: "/locations",
    keywords: PAGE_KEYWORDS.locations,
    image: IMG.saloon,
    schema: SCHEMA,
  });

  return (
    <>
      <PageHero
        eyebrow="Find Us"
        title="Our Branches in Thanjavur"
        text="Every Naturals branch runs the same menu, the same standards and the same certified team. Pick the one nearest you and book your chair."
        image={IMG.saloon}
        alt="Interior of Naturals unisex salon in Thanjavur"
        trail={[{ label: "Locations" }]}
      />

      <section className="section" aria-labelledby="branches-title">
        <div className="container">
          <SectionHeading
            eyebrow={BRANCHES.length > 1 ? `${BRANCHES.length} Branches` : "Visit Us"}
            title="Where to Find Naturals"
            titleId="branches-title"
            text="Full address, landmarks, hours and a map for each salon — everything you need to walk in today."
            split
            aside={
              <Btn href={WHATSAPP} variant="outline" size="sm" icon="whatsapp">
                Ask which branch suits you
              </Btn>
            }
          />

          <div className="branch-list">
            {BRANCHES.map((b) => (
              <Branch key={b.id} branch={b} />
            ))}
          </div>

          {/* The About copy refers to multiple branches, but only this address
              was ever published. Say so plainly rather than invent the rest. */}
          <p className="pricing-note" data-reveal="fade">
            <Icon name="sparkle" size={15} />
            Additional branch addresses have not been published yet. Call{" "}
            <a className="inline-link" href={CONTACT.phoneHref}>
              {CONTACT.phoneDisplay}
            </a>{" "}
            and we&rsquo;ll point you to the salon closest to you.
          </p>
        </div>
      </section>

      <FaqSection />
      <CtaBanner
        eyebrow="See You Soon"
        title="Walk In or Book Ahead"
        text="Walk-ins are welcome at every branch. Booking ahead secures your preferred stylist and time slot."
      />
    </>
  );
}
