import * as React from "react";
import { ThemeProvider } from "styled-components";
import { CookiesProvider, withCookies, Cookies } from "react-cookie";

import { ApplicationState } from "store/types";
import IUserConfig from "interfaces/IUserConfig";
import { lightTheme, darkTheme, GlobalStyle } from "theme";

import { connect } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import { history } from "store";
import AuthenticatedApp from "./AuthenticatedApp";
import UnAuthenticatedApp from "./UnAuthenticatedApp";

const mapStateToProps = (state: ApplicationState) => ({
  config: state.reducer.user.configuration,
});
interface IAppProps {
  config: IUserConfig;
  cookies: Cookies;
}

const App: React.FC<IAppProps> = ({ config, cookies }) => {
  const isLoggedIn = cookies.get("IS_LOGGED_IN");

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider
        theme={config.darkMode && isLoggedIn ? darkTheme : lightTheme}
      >
        <GlobalStyle config={config} />
        <CookiesProvider>
          {isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
        </CookiesProvider>
      </ThemeProvider>
    </ConnectedRouter>
  );
};

export default connect(mapStateToProps)(withCookies(App));
