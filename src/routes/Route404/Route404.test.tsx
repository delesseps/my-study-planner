import React from "react";
import { mount } from "enzyme";

import Route404 from "./Route404";
import { darkTheme } from "styled";
import { mountWithTheme } from "utils";

describe("Route404", () => {
  it("should render correctly", () => {
    const component = mountWithTheme(<Route404 />, darkTheme);

    expect(component).toMatchSnapshot();
  });
});
