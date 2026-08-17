import { useLocation } from "react-router-dom";
import { Btn, Eyebrow } from "../components/Ui";
import Icon from "../components/Icon";
import { CONTACT } from "../data/site";
import { useSeo } from "../hooks/useSeo";

/**
 * Landed on after a successful booking/enquiry submission (see BookingForm's
 * `onSubmit`). Reads the visitor's first name from router state when it's
 * there, but stands on its own — nothing breaks if this URL is opened
 * directly rather than reached via a form submit.
 */
export default function ThankYou() {
  const { state } = useLocation();
  const firstName = state?.name?.split(" ")[0];

  useSeo({
    title: "Thank You | Naturals Salon Thanjavur",
    description:
      "Your appointment request has been received. Our team at Naturals Thanjavur will be in touch shortly to confirm your slot.",
    path: "/thank-you",
  });

  return (
    <section className="section thankyou">
      <div className="container container--narrow center">
        <Icon name="check" size={40} className="thankyou__icon" />
        <Eyebrow center>Request Received</Eyebrow>
        <h1 className="thankyou__title">Thank you{firstName ? `, ${firstName}` : ""}.</h1>
        <p className="lead" style={{ marginInline: "auto", maxWidth: "48ch" }}>
          We&rsquo;ve received your request and will be in touch shortly to confirm your slot —
          or call us directly on{" "}
          <a className="inline-link" href={CONTACT.phoneHref}>
            {CONTACT.phoneDisplay}
          </a>
          .
        </p>

        <div className="thankyou__actions">
          <Btn to="/">Back to Home</Btn>
          <Btn to="/book" variant="outline" icon="calendar">
            Book Another Appointment
          </Btn>
        </div>
      </div>
    </section>
  );
}
