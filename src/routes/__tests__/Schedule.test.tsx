import React from "react";
import { render, fireEvent } from "test-utils";
import { Schedule } from "routes";

test("renders correctly", () => {
  const { asFragment } = render(<Schedule />);
  expect(asFragment()).toMatchSnapshot();
});
