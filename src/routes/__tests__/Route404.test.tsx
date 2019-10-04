import React from "react";

import Route404 from "../Route404";
import { darkTheme } from "styled";
import { mountWithTheme } from "testUtils";

describe("Route404", () => {
  it("should render correctly", () => {
    const component = mountWithTheme(<Route404 />, darkTheme);

    expect(component).toMatchSnapshot();
  });
});
