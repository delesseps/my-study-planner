import React from "react";
import { render, fireEvent } from "test-utils";
import { Schedule } from "routes";

test("renders correctly", () => {
  const { asFragment } = render(<Schedule />);
  expect(asFragment()).toMatchSnapshot();
});

test("opens modal on click", () => {
  const { getByTestId, getByText } = render(<Schedule />);

  fireEvent.click(getByTestId("mondayCard"));
  getByText("Monday Courses");

  fireEvent.click(getByTestId("tuesdayCard"));
  getByText("Tuesday Courses");

  fireEvent.click(getByTestId("wednesdayCard"));
  getByText("Wednesday Courses");
});
