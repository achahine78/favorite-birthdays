import { render, screen } from "@testing-library/react";
import App from "./App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

test("renders correctly", () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  );

  // Verify that the initial tab labels are displayed
  expect(screen.getByText("Birthday Selection")).toBeInTheDocument();
  expect(screen.getByText("Liked Birthdays")).toBeInTheDocument();

  // Verify that the initial tab content is displayed
  const birthdaySelectionTabPanel = screen.getByTestId("tabpanel1");
  expect(birthdaySelectionTabPanel).toBeInTheDocument();
  const likedBirthdaysTabPanel = screen.getByTestId("tabpanel2");
  expect(likedBirthdaysTabPanel).toBeInTheDocument();
});
