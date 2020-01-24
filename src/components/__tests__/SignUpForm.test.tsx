import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitForElement
} from "test-utils";
import { SignUpForm } from "components";

describe("SignUpForm", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<SignUpForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("will display errors when empty", async () => {
    const { getByTestId, getByText } = render(<SignUpForm />);
    fireEvent.click(getByTestId("submit"));

    await waitForElement(() => getByText("Please input your full name!"));
    getByText("Please input your email!");
    getByText("Please input your password!");
    getByText("Please confirm your password!");
  });

  it("will display invalid email", async () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);

    fireEvent.change(getByLabelText("E-mail"), { target: { value: "test@" } });
    await waitForElement(() => getByText("The input is not valid E-mail!"));
  });

  it("will display error on passwords", async () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);

    const passwordField = getByLabelText("Password");
    const confirmPasswordField = getByLabelText("Confirm Password");

    fireEvent.input(passwordField, { target: { value: "asd" } });
    await waitForElement(() =>
      getByText("Password must have a minimum of 6 characters.")
    );

    fireEvent.input(passwordField, {
      target: { value: "asd123" }
    });
    fireEvent.input(confirmPasswordField, {
      target: { value: "asd" }
    });

    await waitForElement(() =>
      getByText(
        "The passwords do not match! Password must have a minimum of 6 characters."
      )
    );

    fireEvent.input(confirmPasswordField, {
      target: { value: "asd1234" }
    });
    await waitForElement(() => getByText("The passwords do not match!"));

    fireEvent.input(confirmPasswordField, {
      target: { value: "asd123" }
    });

    await waitForElementToBeRemoved(() =>
      getByText("The passwords do not match!")
    );
  });

  // it("will submit when filled", () => {
  //   const { getByLabelText, getByTestId } = render(<SignUpForm />);

  //   fireEvent.change(getByLabelText("Full Name"), {
  //     target: { value: "test" }
  //   });
  //   fireEvent.change(getByLabelText("E-mail"), {
  //     target: { value: "test@test.com" }
  //   });
  //   fireEvent.change(getByLabelText("Password"), {
  //     target: { value: "test123" }
  //   });
  //   fireEvent.change(getByLabelText("Confirm Password"), {
  //     target: { value: "test123" }
  //   });

  //   fireEvent.click(getByTestId("submit"));

  //   getByLabelText("icon: loading");
  // });
});
