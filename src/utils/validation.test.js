import { getTodayDate, validateBooking } from "./validation";

describe("booking validation helpers", () => {
  test("returns a local date string in yyyy-mm-dd format", () => {
    expect(getTodayDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("rejects past dates, missing times, and guest counts above the limit", () => {
    const errors = validateBooking({
      date: "2000-01-01",
      time: "",
      guests: 12,
      requests: ""
    });

    expect(errors.date).toMatch(/today or a future date/i);
    expect(errors.time).toMatch(/select an available booking time/i);
    expect(errors.guests).toMatch(/between 1 and 10/i);
  });

  test("rejects overly long special requests", () => {
    const errors = validateBooking({
      date: "2099-12-31",
      time: "18:00",
      guests: 2,
      requests: "a".repeat(201)
    });

    expect(errors.requests).toMatch(/under 200 characters/i);
  });
});
