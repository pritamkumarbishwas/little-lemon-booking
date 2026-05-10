// Memoized today's date to avoid recalculation on every validation call
let todayDateCache = null;
let todayDateCacheDate = null;

export function getTodayDate() {
  const today = new Date();
  // Only update cache if the date has changed (different day)
  if (!todayDateCacheDate || todayDateCacheDate.toDateString() !== today.toDateString()) {
    todayDateCacheDate = new Date(today);
    const year = todayDateCacheDate.getFullYear();
    const month = String(todayDateCacheDate.getMonth() + 1).padStart(2, "0");
    const day = String(todayDateCacheDate.getDate()).padStart(2, "0");
    todayDateCache = `${year}-${month}-${day}`;
  }
  return todayDateCache;
}

export function validateBooking(formData) {
  const errors = {};
  const requestsLength = formData.requests?.trim().length ?? 0;

  if (!formData.date) {
    errors.date = "Please choose a reservation date.";
  } else if (formData.date < getTodayDate()) {
    errors.date = "Please select today or a future date.";
  }

  if (!formData.time) {
    errors.time = "Please select an available booking time.";
  }

  if (!Number.isInteger(formData.guests) || formData.guests < 1 || formData.guests > 10) {
    errors.guests = "Guest count must be between 1 and 10.";
  }

  if (requestsLength > 200) {
    errors.requests = "Special requests must stay under 200 characters.";
  }

  return errors;
}
