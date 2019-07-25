import React from "react";
import { mount } from "enzyme";

import Window404 from "./Window404";

describe("Window404", () => {
  it("should render correctly", () => {
    const component = mount(<Window404 />);

    expect(component).toMatchSnapshot();
  });
});
