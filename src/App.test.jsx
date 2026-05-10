import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Little Lemon booking app", () => {
  test("renders the booking form heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /book your table/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when required fields are missing", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.clear(screen.getByLabelText(/date/i));
    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(screen.getByText(/please choose a reservation date/i)).toBeInTheDocument();
    expect(screen.getByText(/please select an available booking time/i)).toBeInTheDocument();
  });

  test("submits the form and shows confirmation for valid entries", async () => {
    const user = userEvent.setup();
    render(<App />);

    const dateInput = screen.getByLabelText(/date/i);
    const timeSelect = screen.getByLabelText(/time/i);
    const guestsInput = screen.getByLabelText(/guests/i);

    await user.clear(dateInput);
    await user.type(dateInput, "2099-12-31");
    await user.selectOptions(timeSelect, screen.getAllByRole("option")[1]);
    await user.clear(guestsInput);
    await user.type(guestsInput, "4");
    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(screen.getByRole("heading", { name: /your table is booked/i })).toBeInTheDocument();
    expect(screen.getByText(/we're holding a table for 4/i)).toBeInTheDocument();
  });

  test("shows an error when the guest count is outside the allowed range", async () => {
    const user = userEvent.setup();
    render(<App />);

    const guestsInput = screen.getByLabelText(/guests/i);

    await user.clear(guestsInput);
    await user.type(guestsInput, "11");
    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(screen.getByText(/guest count must be between 1 and 10/i)).toBeInTheDocument();
  });
});
