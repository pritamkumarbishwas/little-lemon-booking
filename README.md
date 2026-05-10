# Little Lemon Booking App

This project is a React web app for the Little Lemon restaurant booking experience. It focuses on a clean, accessible reservation form with validation, responsive design, semantic HTML, and unit tests.

## Features

- Responsive landing and booking layout
- Accessible form labels, fieldsets, live region updates, and error messaging
- Client-side validation for date, time, and guest count
- Mock booking API helpers for available times and submission
- Confirmation view after successful submission
- Unit tests with Vitest and Testing Library

## Tech Stack

- React 18
- Vite
- Vitest
- Testing Library

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

4. Build for production:

```bash
npm run build
```

## Project Structure

- `src/App.jsx`: top-level layout and booking flow
- `src/components/BookingForm.jsx`: accessible booking form
- `src/components/ConfirmedBooking.jsx`: success state
- `src/utils/api.js`: mock availability and submit helpers
- `src/utils/validation.js`: booking validation rules
- `src/App.test.jsx`: unit tests

## Peer Review Notes

This submission includes:

- UX and UI implementation for a Little Lemon reservation flow
- Accessibility-friendly markup and feedback
- Functional form validation with error states
- Edge-case handling for past dates, invalid guest counts, unavailable time slots, and long request text
- Responsive behavior for mobile and desktop
- Clear structure and maintainable component separation
- Unit tests for the main booking flow and validation helpers
- README setup instructions for local development

## Git

This project has been initialized as a local Git repository. To create or update your submission commit:

```bash
git add .
git commit -m "Create Little Lemon booking app"
```
