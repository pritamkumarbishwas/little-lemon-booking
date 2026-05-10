function ConfirmedBooking({ booking }) {
  return (
    <section className="confirmation-card" aria-labelledby="confirmation-heading">
      <p className="eyebrow">Confirmed</p>
      <h2 id="confirmation-heading">Your table is booked</h2>
      <p>
        We're holding a table for {booking.guests} on {booking.date} at {booking.time}.
      </p>
      <dl className="confirmation-details">
        <div>
          <dt>Occasion</dt>
          <dd>{booking.occasion}</dd>
        </div>
        <div>
          <dt>Seating</dt>
          <dd>{booking.seating}</dd>
        </div>
        <div>
          <dt>Requests</dt>
          <dd>{booking.requests || "No special requests provided."}</dd>
        </div>
      </dl>
    </section>
  );
}

export default ConfirmedBooking;
