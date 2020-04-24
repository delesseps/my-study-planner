import * as React from "react";
import { CookiesProvider } from "react-cookie";
import { ConnectedRouter } from "connected-react-router";

import { history } from "store";
import { AuthProvider } from "./auth/auth-context";

const AppProviders: React.FC = ({ children }) => (
  <ConnectedRouter history={history}>
    <CookiesProvider>
      <AuthProvider>{children}</AuthProvider>
    </CookiesProvider>
  </ConnectedRouter>
);

export { AppProviders };
