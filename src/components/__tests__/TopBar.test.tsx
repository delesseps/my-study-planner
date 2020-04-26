import React from "react";
import {
  fireEvent,
  waitFor,
  render,
  loginAsUser,
  waitForElementToBeRemoved,
  screen,
} from "test/test-utils";

import IUser from "constants/interfaces/IUser";
import TopBar from "components/TopBar";

async function renderTopBar({ user }: { user?: IUser } = {}) {
  if (user === undefined) {
    user = await loginAsUser();
  } else {
    await loginAsUser(user);
  }

  const utils = render(<TopBar />);

  await waitForElementToBeRemoved(
    () => screen.queryByTestId("full-page-loader"),
    { timeout: 4000 }
  );

  return {
    ...utils,
    user,
  };
}

describe("TopBar", () => {
  it("renders correctly", async () => {
    const { asFragment } = await renderTopBar({
      user: {
        name: "Karolann Schiller",
        email: "Lolita_Morissette18@hotmail.com",
        picture: "http://lorempixel.com/640/480/city",
        firstSignIn: false,
        fcm: false,
        role: "user",
        verified: false,
        configuration: { darkMode: false },
        evaluations: [],
        homework: [],
        toDos: [],
        semesters: [],
      },
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays user profile", async () => {
    const { getByText, getByLabelText } = await renderTopBar();

    fireEvent.mouseOver(getByLabelText("caret-down"));

    const profileButton = await waitFor(() => getByText("Profile"));

    fireEvent.click(profileButton);

    await waitFor(() => getByText("Done Homework"));
  });

  it("displays notifications", async () => {
    const { getByText, getByLabelText } = await renderTopBar();

    fireEvent.click(getByLabelText("bell"));

    await waitFor(() => getByText("No notifications"));
  });
});
