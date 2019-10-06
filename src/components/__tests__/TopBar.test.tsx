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
    fireEvent.mouseOver(getByLabelText("icon: caret-down"));
    const profileButton = await waitForElement(() => getByText("Profile"));
    fireEvent.click(profileButton);
    getByText("Done Homework");
  });

  it("displays notifications", () => {
    const { getByText, getByLabelText, debug } = renderLoggedIn(<TopBar />);
    fireEvent.click(getByLabelText("icon: bell"));
    getByText("No notifications");
  });
});
