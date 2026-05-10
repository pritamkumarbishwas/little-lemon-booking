import { useId, useState, useMemo, useCallback } from "react";
import { validateBooking } from "../utils/validation";

const initialState = (date) => ({
  date,
  time: "",
  guests: 2,
  occasion: "Birthday",
  seating: "Indoor",
  requests: ""
});

function BookingForm({ availableTimes, occasions, initialDate, onDateChange, onSubmit }) {
  const [formData, setFormData] = useState(() => initialState(initialDate));
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const formId = useId();

  const fieldIds = useMemo(() => ({
    date: `${formId}-date`,
    time: `${formId}-time`,
    guests: `${formId}-guests`,
    occasion: `${formId}-occasion`,
    requests: `${formId}-requests`
  }), [formId]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    const nextValue = name === "guests" ? Number(value) : value;
    const nextData =
      name === "date"
        ? { ...formData, [name]: nextValue, time: "" }
        : { ...formData, [name]: nextValue };

    if (name === "date") {
      onDateChange(value);
    }

    setFormData(nextData);

    // Only validate if form was previously submitted to avoid unnecessary validations
    if (submitted) {
      setErrors(validateBooking(nextData));
    }
  }, [formData, onDateChange, submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const result = onSubmit(formData);
    setErrors(result.errors);
    setStatusMessage(
      result.success
        ? "Reservation submitted successfully."
        : "Please review the highlighted fields and try again."
    );
  };

  return (
    <section className="form-card" aria-labelledby="booking-heading">
      <div className="form-card__header">
        <p className="eyebrow">Booking</p>
        <h2 id="booking-heading">Book your table</h2>
        <p>Choose a date, pick an available time, and tell us a little about your visit.</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <div className="status-region" role="status" aria-live="polite" aria-atomic="true">
          {statusMessage}
        </div>

        {errors.submit ? (
          <p className="error-banner" role="alert">
            {errors.submit}
          </p>
        ) : null}

        <div className="form-grid">
          <div className="field">
            <label htmlFor={fieldIds.date}>Date</label>
            <input
              id={fieldIds.date}
              name="date"
              type="date"
              min={initialDate}
              value={formData.date}
              onChange={handleChange}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? `${fieldIds.date}-error` : undefined}
              required
            />
            {errors.date ? (
              <p className="field-error" id={`${fieldIds.date}-error`} role="alert">
                {errors.date}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor={fieldIds.time}>Time</label>
            <select
              id={fieldIds.time}
              name="time"
              value={formData.time}
              onChange={handleChange}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? `${fieldIds.time}-error` : undefined}
              disabled={availableTimes.length === 0}
              required
            >
              <option value="">
                {availableTimes.length === 0 ? "No times available" : "Select a time"}
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time ? (
              <p className="field-error" id={`${fieldIds.time}-error`} role="alert">
                {errors.time}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor={fieldIds.guests}>Guests</label>
            <input
              id={fieldIds.guests}
              name="guests"
              type="number"
              min="1"
              max="10"
              value={formData.guests}
              onChange={handleChange}
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? `${fieldIds.guests}-error` : undefined}
              required
            />
            {errors.guests ? (
              <p className="field-error" id={`${fieldIds.guests}-error`} role="alert">
                {errors.guests}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor={fieldIds.occasion}>Occasion</label>
            <select
              id={fieldIds.occasion}
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            >
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="field fieldset">
            <legend>Seating preference</legend>
            <div className="radio-row">
              <label>
                <input
                  type="radio"
                  name="seating"
                  value="Indoor"
                  checked={formData.seating === "Indoor"}
                  onChange={handleChange}
                />
                Indoor
              </label>
              <label>
                <input
                  type="radio"
                  name="seating"
                  value="Patio"
                  checked={formData.seating === "Patio"}
                  onChange={handleChange}
                />
                Patio
              </label>
            </div>
          </fieldset>

          <div className="field field--full">
            <label htmlFor={fieldIds.requests}>Special requests</label>
            <textarea
              id={fieldIds.requests}
              name="requests"
              rows="4"
              maxLength="200"
              value={formData.requests}
              onChange={handleChange}
              aria-invalid={Boolean(errors.requests)}
              aria-describedby={
                errors.requests
                  ? `${fieldIds.requests}-hint ${fieldIds.requests}-error`
                  : `${fieldIds.requests}-hint`
              }
            />
            <p className="field-hint" id={`${fieldIds.requests}-hint`}>
              Optional. Please keep requests under 200 characters.
            </p>
            {errors.requests ? (
              <p className="field-error" id={`${fieldIds.requests}-error`} role="alert">
                {errors.requests}
              </p>
            ) : null}
          </div>
        </div>

        <button className="submit-button" type="submit" disabled={availableTimes.length === 0}>
          Confirm reservation
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
