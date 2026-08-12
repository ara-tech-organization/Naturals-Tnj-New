import { useState } from "react";
import { BRANCHES, CONTACT } from "../data/site";
import { BOOKING_SERVICES } from "../data/services";
import Icon from "./Icon";
import { Btn } from "./Ui";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  service: "",
  branch: BRANCHES[0].id,
  date: "",
  time: "",
  message: "",
};

/** Tabs over the service picker — the same women's / men's / occasion split
 *  the menu uses, so the list stays short enough to scan on a phone. */
const AUDIENCES = BOOKING_SERVICES.map((g) => ({
  id: g.id,
  label: g.id === "occasion" ? "Special Day" : g.group.replace(" Services", ""),
}));

/** The form's two screens — contact details first, then what/when. Splitting
 *  it keeps each screen short enough to finish without scrolling on a phone. */
const STEPS = ["Your Details", "Service & Time"];

/** Indian mobile numbers: 10 digits, optionally with +91/0 and spacing. */
const PHONE_RE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateDetails(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.phone.trim()) {
    errors.phone = "We need a number to confirm your slot.";
  } else if (!PHONE_RE.test(values.phone.replace(/\s|-/g, ""))) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }
  // Email is optional — most salon bookings are confirmed by phone.
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  return errors;
}

function validateSelection(values) {
  const errors = {};
  if (!values.service) errors.service = "Choose the service you'd like.";
  return errors;
}

/**
 * Appointment request form.
 *
 * There is no booking backend on this project, so rather than pretending a
 * submission was stored, the form composes the enquiry and hands it to
 * WhatsApp on the salon's own number — the channel the content document
 * identifies as the common booking route in Tamil Nadu. Swap `handoff` for a
 * POST once an endpoint exists; the validation above stays as-is.
 */
export default function BookingForm({ compact = false }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [audience, setAudience] = useState(0);
  const [step, setStep] = useState(0);

  const group = BOOKING_SERVICES[audience];

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  // Switching tab clears the chosen service — keeping a women's selection
  // while the men's list is showing would send us a mismatched booking.
  const switchAudience = (i) => {
    setAudience(i);
    setValues((v) => ({ ...v, service: "" }));
  };

  const handoff = (v) => {
    const branch = BRANCHES.find((b) => b.id === v.branch) ?? BRANCHES[0];
    const lines = [
      "New appointment request — Naturals Thanjavur",
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      v.email ? `Email: ${v.email}` : null,
      `Branch: ${branch.name}`,
      `Service: ${v.service}`,
      v.date ? `Preferred date: ${v.date}` : null,
      v.time ? `Preferred time: ${v.time}` : null,
      v.message ? `Notes: ${v.message}` : null,
    ].filter(Boolean);

    window.open(
      `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Move focus to the first problem so keyboard and screen-reader users land
  // on it instead of hunting for the message.
  const focusFirstError = (found) => {
    document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
  };

  const goBack = () => {
    setErrors({});
    setStep(0);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (step === 0) {
      const found = validateDetails(values);
      setErrors(found);
      if (Object.keys(found).length) {
        focusFirstError(found);
        return;
      }
      setStep(1);
      return;
    }

    const found = validateSelection(values);
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirstError(found);
      return;
    }
    handoff(values);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-success" role="status">
        <Icon name="check" size={30} style={{ margin: "0 auto var(--space-s)", color: "var(--plum-600)" }} />
        <h3>Thank you, {values.name.split(" ")[0]}.</h3>
        <p style={{ marginTop: "var(--space-2xs)", color: "var(--text-muted)" }}>
          Your request has been prepared in WhatsApp. Send the message and our team will confirm
          your slot shortly — or call us directly on{" "}
          <a className="inline-link" href={CONTACT.phoneHref}>
            {CONTACT.phoneDisplay}
          </a>
          .
        </p>
        <div style={{ marginTop: "var(--space-m)" }}>
          <Btn
            variant="outline"
            size="sm"
            icon="arrowLeft"
            onClick={() => {
              setValues(EMPTY);
              setSent(false);
              setStep(0);
            }}
          >
            Book another appointment
          </Btn>
        </div>
      </div>
    );
  }

  const field = (key, label, type = "text", extra = {}) => (
    <div className={`field${errors[key] ? " field--error" : ""}${extra.full ? " field--full" : ""}`}>
      <label className="field__label" htmlFor={`bk-${key}`}>
        {label} {extra.required ? <span className="field__req">*</span> : null}
      </label>
      <input
        id={`bk-${key}`}
        name={key}
        type={type}
        value={values[key]}
        onChange={update(key)}
        autoComplete={extra.autoComplete}
        inputMode={extra.inputMode}
        min={extra.min}
        placeholder={extra.placeholder}
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

  const today = new Date().toISOString().split("T")[0];

  return (
    <form className="booking-form" onSubmit={onSubmit} noValidate>
      <ol className="stepper" aria-label="Booking steps">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`stepper__item${i === step ? " is-active" : ""}${i < step ? " is-done" : ""}`}
            aria-current={i === step ? "step" : undefined}
          >
            <span className="stepper__dot">
              {i < step ? <Icon name="check" size={12} /> : i + 1}
            </span>
            <span className="stepper__label">{label}</span>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div className="step-panel" key="details">
          <div className="form-grid">
            {field("name", "Your Name", "text", { required: true, autoComplete: "name" })}
            {field("phone", "Phone Number", "tel", {
              required: true,
              autoComplete: "tel",
              inputMode: "numeric",
              placeholder: "90870 00049",
            })}

            <div className={`field field--full${errors.email ? " field--error" : ""}`}>
              <label className="field__label" htmlFor="bk-email">
                Email <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span>
              </label>
              <input
                id="bk-email"
                name="email"
                type="email"
                value={values.email}
                onChange={update("email")}
                autoComplete="email"
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "bk-email-err" : undefined}
              />
              {errors.email ? (
                <span className="field__error" id="bk-email-err">
                  {errors.email}
                </span>
              ) : null}
            </div>
          </div>

          <div className="booking-form__foot">
            <Btn size="lg" icon="arrowRight" type="submit">
              Continue
            </Btn>
            <p className="form-note">Step 1 of 2 — your name and number to get started.</p>
          </div>
        </div>
      ) : (
        <div className="step-panel" key="service">
          <div className="form-grid">
            <div className="field field--full">
              <span className="field__label" id="bk-audience-label">
                Who is this for? <span className="field__req">*</span>
              </span>
              {/* A filter over the select below, not a tab panel — so these are
                  toggle buttons rather than ARIA tabs. */}
              <div className="seg" role="group" aria-labelledby="bk-audience-label">
                {AUDIENCES.map((a, i) => (
                  <button
                    key={a.id}
                    type="button"
                    id={`bk-aud-${a.id}`}
                    aria-pressed={i === audience}
                    className={`seg__btn${i === audience ? " is-active" : ""}`}
                    onClick={() => switchAudience(i)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`field${errors.service ? " field--error" : ""}`}>
              <label className="field__label" htmlFor="bk-service">
                Service <span className="field__req">*</span>
              </label>
              <select
                id="bk-service"
                name="service"
                value={values.service}
                onChange={update("service")}
                aria-invalid={errors.service ? "true" : undefined}
                aria-describedby={errors.service ? "bk-service-err" : undefined}
              >
                <option value="">Select a service</option>
                {group.options.map((opt) => (
                  <option key={opt} value={`${group.group} — ${opt}`}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.service ? (
                <span className="field__error" id="bk-service-err">
                  {errors.service}
                </span>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="bk-branch">
                Branch
              </label>
              <select id="bk-branch" name="branch" value={values.branch} onChange={update("branch")}>
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {field("date", "Preferred Date", "date", { min: today })}

            <div className="field">
              <label className="field__label" htmlFor="bk-time">
                Preferred Time
              </label>
              <select id="bk-time" name="time" value={values.time} onChange={update("time")}>
                <option value="">Any time</option>
                <option>Morning (9 AM – 12 PM)</option>
                <option>Afternoon (12 PM – 4 PM)</option>
                <option>Evening (4 PM – 8 PM)</option>
              </select>
            </div>

            {!compact ? (
              <div className="field field--full">
                <label className="field__label" htmlFor="bk-message">
                  Anything else we should know?
                </label>
                <textarea
                  id="bk-message"
                  name="message"
                  value={values.message}
                  onChange={update("message")}
                  rows={4}
                />
              </div>
            ) : null}
          </div>

          <div className="booking-form__foot">
            <div className="booking-form__actions">
              <Btn variant="outline" size="lg" icon="arrowLeft" type="button" onClick={goBack}>
                Back
              </Btn>
              <Btn size="lg" icon="calendar" type="submit">
                Book My Appointment
              </Btn>
            </div>
            <p className="form-note">
              Prefer to talk? Call{" "}
              <a className="inline-link" href={CONTACT.phoneHref}>
                {CONTACT.phoneDisplay}
              </a>{" "}
              — {CONTACT.hoursShort}.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}
