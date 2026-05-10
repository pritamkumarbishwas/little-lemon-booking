import { useMemo, useState, useCallback } from "react";
import BookingForm from "./components/BookingForm";
import ConfirmedBooking from "./components/ConfirmedBooking";
import { fetchAPI, submitAPI } from "./utils/api";
import { getTodayDate, validateBooking } from "./utils/validation";

const occasions = ["Birthday", "Anniversary", "Engagement", "Date night", "Other"];

function App() {
  const today = useMemo(() => getTodayDate(), []);
  const [availableTimes, setAvailableTimes] = useState(() => fetchAPI(today));
  const [booking, setBooking] = useState(null);

  const updateTimes = useCallback((date) => {
    // Keep times in sync with the selected date so stale options cannot be reused.
    setAvailableTimes(fetchAPI(date));
  }, []);

  const handleSubmit = useCallback((formData) => {
    const errors = validateBooking(formData);

    if (formData.time && !availableTimes.includes(formData.time)) {
      errors.time = "That time is no longer available. Please choose another slot.";
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const success = submitAPI(formData);

    if (success) {
      setBooking(formData);
      return { success: true, errors: {} };
    }

    return {
      success: false,
      errors: { submit: "We could not complete your reservation. Please try again." }
    };
  }, [availableTimes]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to booking form
      </a>
      <header className="hero">
        <div className="hero__content">
          <p className="eyebrow">Little Lemon</p>
          <h1>Reserve a table in minutes</h1>
          <p className="hero__text">
            Fresh Mediterranean flavors, a warm neighborhood setting, and a booking
            flow that keeps things simple.
          </p>
        </div>
      </header>

      <main id="main-content" className="main-grid">
        <section className="info-card" aria-labelledby="experience-heading">
          <h2 id="experience-heading">What to expect</h2>
          <ul className="feature-list">
            <li>Indoor and patio seating options</li>
            <li>Accessibility-friendly layout and form guidance</li>
            <li>Instant confirmation after a valid reservation</li>
          </ul>
        </section>

        {booking ? (
          <ConfirmedBooking booking={booking} />
        ) : (
          <BookingForm
            availableTimes={availableTimes}
            occasions={occasions}
            initialDate={today}
            onDateChange={updateTimes}
            onSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
