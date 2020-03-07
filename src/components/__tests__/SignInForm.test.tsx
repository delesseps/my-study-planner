import React from "react";
import MockAdapter from "axios-mock-adapter";

import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitForElement
} from "test-utils";
import { SignInForm } from "components";
import { agent } from "api";

describe("SignInForm", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(agent);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders correctly", () => {
    const { asFragment } = render(<SignInForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("will display errors when empty", async () => {
    const { getByTestId, getByText } = render(<SignInForm />);
    fireEvent.click(getByTestId("submit"));
    await waitForElement(() => getByText("Please input your email!"));
    await waitForElement(() => getByText("Please input your password!"));
  });

  it("will display invalid email", async () => {
    const { getByLabelText, getByText } = render(<SignInForm />);

    fireEvent.change(getByLabelText("E-mail"), { target: { value: "test@" } });
    await waitForElement(() => getByText("The input is not valid E-mail!"));

    fireEvent.change(getByLabelText("E-mail"), {
      target: { value: "test@test.com" }
    });
    await waitForElementToBeRemoved(() =>
      getByText("The input is not valid E-mail!")
    );
  });

  it("will submit form", () => {
    const { getByLabelText, queryByText, getByTestId } = render(<SignInForm />);
    mock.onPost("/auth/signin").reply(200, { users: {} });

    fireEvent.change(getByLabelText("E-mail"), {
      target: { value: "test@test.com" }
    });
    fireEvent.change(getByLabelText("Password"), { target: { value: "test" } });

    fireEvent.click(getByTestId("submit"));

    expect(queryByText("Incorrect e-mail or password.")).toBeNull();
  });

  it("will display incorrect credentials", async () => {
    const { getByLabelText, getByText, getByTestId } = render(<SignInForm />);
    mock
      .onPost("/auth/signin")
      .reply(400, { errors: { message: "Invalid Password" } });

    fireEvent.change(getByLabelText("E-mail"), {
      target: { value: "test@test.com" }
    });
    fireEvent.change(getByLabelText("Password"), { target: { value: "test" } });

    fireEvent.click(getByTestId("submit"));

    await waitForElement(() => getByText("Incorrect e-mail or password."));
  });
});
