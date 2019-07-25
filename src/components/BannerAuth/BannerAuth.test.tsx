import React from "react";
import { mount } from "enzyme";

import BannerAuth from "./BannerAuth";

describe("Window404", () => {
  it("should render correctly", () => {
    const component = mount(<BannerAuth />);

    expect(component).toMatchSnapshot();
  });
});
