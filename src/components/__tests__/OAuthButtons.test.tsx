import React from "react";
import { render } from "test-utils";
import { OAuthButtons } from "components";

test("renders correctly", () => {
  const { asFragment } = render(<OAuthButtons type="signin" />);
  expect(asFragment()).toMatchSnapshot();
});

test("displays Sign in with Google", () => {
  const { getByText } = render(<OAuthButtons type="signin" />);
  getByText("Sign in with Google");
});

test("displays Sign up with Google", () => {
  const { getByText } = render(<OAuthButtons />);
  getByText("Sign up with Google");
});
