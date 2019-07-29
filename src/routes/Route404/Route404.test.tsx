import React from "react";
import { mount } from "enzyme";

import Route404 from "./Route404";

describe("Route404", () => {
  it("should render correctly", () => {
    const component = mount(<Route404 />);

    expect(component).toMatchSnapshot();
  });
});
