import { Btn, Eyebrow } from "../components/Ui";
import { NAV } from "../data/site";
import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo({
    title: "Page Not Found | Naturals Salon Thanjavur",
    description:
      "The page you're looking for isn't here. Explore our hair, bridal, spa and grooming services at Naturals Thanjavur.",
    path: "/404",
  });

  return (
    <section className="section notfound">
      <div className="container container--narrow center">
        <Eyebrow center>Error 404</Eyebrow>
        <h1 className="notfound__title">This page has stepped out.</h1>
        <p className="lead" style={{ marginInline: "auto", maxWidth: "48ch" }}>
          The page you were looking for isn&rsquo;t here — but everything else at Naturals Thanjavur
          still is.
        </p>

        <div className="notfound__actions">
          <Btn to="/">Back to Home</Btn>
          <Btn to="/book" variant="outline" icon="calendar">
            Book an Appointment
          </Btn>
        </div>

        <ul className="notfound__links">
          {NAV.filter((n) => n.to !== "/").map((n) => (
            <li key={n.to}>
              <Link className="inline-link" to={n.to}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
