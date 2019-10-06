import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "test-utils";
import { SignInForm } from "components";

describe("SignInForm", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<SignInForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("will display errors when empty", () => {
    const { getByTestId, getByText } = render(<SignInForm />);
    fireEvent.click(getByTestId("submit"));
    getByText("Please input your email!");
    getByText("Please input your password!");
  });

  it("will display invalid email", async () => {
    const { getByLabelText, getByText } = render(<SignInForm />);

    fireEvent.change(getByLabelText("E-mail"), { target: { value: "test@" } });
    getByText("The input is not valid E-mail!");

    fireEvent.change(getByLabelText("E-mail"), {
      target: { value: "test@test.com" }
    });
    await waitForElementToBeRemoved(() =>
      getByText("The input is not valid E-mail!")
    );
  });

  it("will submit when filled", () => {
    const { getByLabelText, getByTestId, debug } = render(<SignInForm />);

    fireEvent.change(getByLabelText("E-mail"), {
      target: { value: "test@test.com" }
    });
    fireEvent.change(getByLabelText("Password"), { target: { value: "test" } });

    fireEvent.click(getByTestId("submit"));

    getByLabelText("icon: loading");
  });
});
