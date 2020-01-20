import * as React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "theme";
import Router from "./Router";

import { CookiesProvider, withCookies, Cookies } from "react-cookie";
import { ApplicationState } from "store/types";
import IUserConfig from "interfaces/IUserConfig";
import { connect } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import { history } from "store";

const mapStateToProps = (state: ApplicationState) => ({
  config: state.reducer.user.configuration
});
interface IAppProps {
  config: IUserConfig;
  cookies: Cookies;
}

const App: React.FunctionComponent<IAppProps> = ({ config, cookies }) => {
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider
        theme={
          config.darkMode && cookies.get("IS_LOGGED_IN")
            ? darkTheme
            : lightTheme
        }
      >
        <CookiesProvider>
          <Router />
        </CookiesProvider>
      </ThemeProvider>
    </ConnectedRouter>
  );
};

export default connect(mapStateToProps)(withCookies(App));
