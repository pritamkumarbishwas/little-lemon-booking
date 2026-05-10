const seededTimes = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00"
];

export function fetchAPI(date) {
  const seed = new Date(date).getDate() || 1;

  return seededTimes.filter((_, index) => (index + seed) % 2 === 0 || index < 4);
}

export function submitAPI(formData) {
  return Boolean(formData.date && formData.time && formData.guests);
}
