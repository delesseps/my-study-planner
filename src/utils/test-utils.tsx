import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import "jest-styled-components";

import { ThemeProvider, DefaultTheme } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { lightTheme } from "theme";

const loggedInState = {
  name: "test",
  email: "test@test.com",
  picture: "test",
  firstSignIn: false,
  fcm: false,
  role: "user",
  verified: true,
  configuration: {
    darkMode: false,
  },
  evaluations: [],
  homework: [],
  toDos: [],
  semesters: [],
};

const providers = (theme: DefaultTheme = lightTheme) => ({
  children,
}: {
  children: ReactElement<any>;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>{children}</Router>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement<any>, options?: any) =>
  render(ui, { wrapper: providers(), ...options });

const loggedInRender = (ui: ReactElement<any>, options?: any) =>
  render(ui, { wrapper: providers(), ...options });

export * from "@testing-library/react";

export { customRender as render, loggedInRender as renderLoggedIn };
