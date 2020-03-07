import React from "react";
import { fireEvent, waitForElement, renderLoggedIn } from "test-utils";
import { TopBar } from "components";

describe("TopBar", () => {
  it("renders correctly", () => {
    const { asFragment } = renderLoggedIn(<TopBar />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays user profile", async () => {
    const { getByText, getByLabelText } = renderLoggedIn(<TopBar />);

    fireEvent.mouseOver(getByLabelText("caret-down"));

    const profileButton = await waitForElement(() => getByText("Profile"));

    fireEvent.click(profileButton);

    await waitForElement(() => getByText("Done Homework"));
  });

  it("displays notifications", async () => {
    const { getByText, getByLabelText } = renderLoggedIn(<TopBar />);

    fireEvent.click(getByLabelText("bell"));

    await waitForElement(() => getByText("No notifications"));
  });
});
