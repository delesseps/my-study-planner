import * as React from "react";
import { CookiesProvider } from "react-cookie";

import { AuthProvider } from "./auth/auth-context";
import { BrowserRouter as Router } from "react-router-dom";

const AppProviders: React.FC = ({ children }) => (
  <Router>
    <CookiesProvider>
      <AuthProvider>{children}</AuthProvider>
    </CookiesProvider>
  </Router>
);

export { AppProviders };
