import React, { ReactElement } from "react";
import { mount, MountRendererProps } from "enzyme";
import "jest-styled-components";

import { ThemeProvider, DefaultTheme } from "styled-components";
import { Provider } from "react-redux";
import configureStore from "store";

const initialStore = configureStore();

export const mountWithTheme = (
  tree: ReactElement<any>,
  theme: DefaultTheme,
  store: any = initialStore
) => {
  const WrappingThemeProvider: React.FC<{
    children: React.ReactChild;
  }> = props => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </Provider>
  );

  return mount(tree, {
    wrappingComponent: WrappingThemeProvider
  } as MountRendererProps);
};
