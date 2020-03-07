import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import "jest-styled-components";

import { ThemeProvider, DefaultTheme } from "styled-components";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore, { initialState } from "store";
import { lightTheme } from "theme";

const loggedInState = {
  ...initialState,
  reducer: {
    ...initialState.reducer,
    loading: {
      ...initialState.reducer.loading,
      user: false
    },
    user: {
      name: "test",
      email: "test@test.com",
      picture: "test",
      firstSignIn: false,
      fcm: false,
      role: "user",
      verified: true,
      configuration: {
        darkMode: false
      },
      evaluations: [],
      homework: [],
      toDos: [],
      semesters: []
    }
  }
};

const { store: initialStore } = configureStore();
const { store: loggedInStore } = configureStore(loggedInState);

const providers = (
  store: any = initialStore,
  theme: DefaultTheme = lightTheme
) => ({ children }: { children: ReactElement<any> }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>{children}</Router>
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (ui: ReactElement<any>, options?: any) =>
  render(ui, { wrapper: providers(), ...options });

const loggedInRender = (ui: ReactElement<any>, options?: any) =>
  render(ui, { wrapper: providers(loggedInStore), ...options });

export * from "@testing-library/react";

export { customRender as render, loggedInRender as renderLoggedIn };
