import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONTACT } from "../data/site";
import { BOOKING_SERVICES } from "../data/services";
import Select from "./Select";
import { Btn } from "./Ui";

const ENQUIRY_API = "https://naturalsthanjavur.com/api/email.php";

/** Every bookable service in one flat list, tagged with its category since
 *  there's no separate audience toggle narrowing it first. */
const SERVICE_OPTIONS = BOOKING_SERVICES.flatMap((g) => {
  const category = g.id === "occasion" ? "Special Day" : g.group.replace(" Services", "");
  return g.options.map((opt) => ({
    value: `${g.group} — ${opt}`,
    label: `${opt} · ${category}`,
  }));
});

/**
 * Posts the enquiry to the salon's lead sheet via email.php. Field set
 * matches the sheet payload exactly: name, email, phone, service, city,
 * date, message, source. `city` has no form field any more — sent as "N/A"
 * so the sheet shows plainly that no value was collected. `date` also has
 * no field, but stands for when the enquiry was made rather than a
 * requested slot, so it's filled with today's date automatically.
 *
 * The endpoint reads its body as JSON (`json_decode(file_get_contents(
 * "php://input"))`) — posting it as `application/x-www-form-urlencoded`
 * (e.g. via `URLSearchParams`) makes that decode to `null` server-side and
 * every submission gets rejected as `{"success":false,"message":"Invalid
 * input"}`, whatever the field values actually were.
 *
 * `res.ok` only means the HTTP request landed — this endpoint answers 200
 * even when it rejects the input, so the JSON body's own `success` flag is
 * what actually decides whether the enquiry went through.
 */
async function submitEnquiry(values, source) {
  const res = await fetch(ENQUIRY_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      phone: values.phone,
      service: values.service,
      city: "N/A",
      date: new Date().toISOString().split("T")[0],
      message: values.message,
      source,
    }),
  });

  if (!res.ok) return { ok: false };

  const data = await res.json().catch(() => null);
  return { ok: Boolean(data?.success), message: data?.message };
}

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

/** Indian mobile numbers: 10 digits, optionally with +91/0 and spacing. */
const PHONE_RE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) {
    errors.email = "We need an email to send your confirmation.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!values.phone.trim()) {
    errors.phone = "We need a number to confirm your slot.";
  } else if (!PHONE_RE.test(values.phone.replace(/\s|-/g, ""))) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }
  if (!values.service) errors.service = "Choose the service you'd like.";
  return errors;
}

/**
 * Appointment/enquiry form — one screen, five fields, submitted straight to
 * the salon's email API. Only routes to /thank-you once that request has
 * actually gone through.
 */
export default function BookingForm({ source = "Booking Form" }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first problem so keyboard and screen-reader users
      // land on it instead of hunting for the message.
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    const result = await submitEnquiry(values, source).catch(() => ({ ok: false }));
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ submit: "Something went wrong sending your request — please call us instead." });
      return;
    }
    navigate("/thank-you", { state: { name: values.name } });
  };

  const field = (key, label, type = "text", extra = {}) => (
    <div className={`field${errors[key] ? " field--error" : ""}${extra.full ? " field--full" : ""}`}>
      <label className="field__label" htmlFor={`bk-${key}`}>
        {label}
      </label>
      <input
        id={`bk-${key}`}
        name={key}
        type={type}
        value={values[key]}
        onChange={update(key)}
        autoComplete={extra.autoComplete}
        inputMode={extra.inputMode}
        placeholder={extra.placeholder}
        aria-required={extra.required ? "true" : undefined}
        aria-invalid={errors[key] ? "true" : undefined}
        aria-describedby={errors[key] ? `bk-${key}-err` : undefined}
      />
      {errors[key] ? (
        <span className="field__error" id={`bk-${key}-err`}>
          {errors[key]}
        </span>
      ) : null}
    </div>
  );

  return (
    <form className="booking-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        {field("name", "Full Name", "text", {
          required: true,
          autoComplete: "name",
          placeholder: "Enter your full name",
        })}
        {field("email", "Email Address", "email", {
          required: true,
          autoComplete: "email",
          placeholder: "Enter your email",
        })}
        {field("phone", "Phone Number", "tel", {
          required: true,
          autoComplete: "tel",
          inputMode: "numeric",
          placeholder: "Enter your phone number",
        })}

        <div className={`field${errors.service ? " field--error" : ""}`}>
          <label className="field__label" htmlFor="bk-service">
            Service Interest
          </label>
          <Select
            id="bk-service"
            name="service"
            value={values.service}
            onChange={(val) => {
              setValues((v) => ({ ...v, service: val }));
              setErrors((prev) => (prev.service ? { ...prev, service: undefined } : prev));
            }}
            options={SERVICE_OPTIONS}
            placeholder="Select a service"
            invalid={Boolean(errors.service)}
            describedBy={errors.service ? "bk-service-err" : undefined}
            required
          />
          {errors.service ? (
            <span className="field__error" id="bk-service-err">
              {errors.service}
            </span>
          ) : null}
        </div>

        <div className="field field--full">
          <label className="field__label" htmlFor="bk-message">
            Message
          </label>
          <textarea
            id="bk-message"
            name="message"
            value={values.message}
            onChange={update("message")}
            placeholder="Tell us about your requirements…"
            rows={5}
          />
        </div>
      </div>

      <div className="booking-form__foot">
        {errors.submit ? (
          <span className="field__error" role="alert">
            {errors.submit}
          </span>
        ) : null}
        <Btn size="lg" type="submit" icon={null} block disabled={submitting}>
          {submitting ? "Sending…" : "Send Message"}
        </Btn>
        <p className="form-note">
          Prefer to talk? Call{" "}
          <a className="inline-link" href={CONTACT.phoneHref}>
            {CONTACT.phoneDisplay}
          </a>{" "}
          — {CONTACT.hoursShort}.
        </p>
      </div>
    </form>
  );
}
