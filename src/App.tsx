import * as React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "styled";
import Router from "./Router";

import { CookiesProvider } from "react-cookie";
import { ApplicationState } from "store/types";
import IUserConfig from "interfaces/IUserConfig";
import { connect } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import { history } from "store";

interface IAppProps {
  config: IUserConfig;
}

const userConfig = JSON.parse(localStorage.getItem("config") as string);

const App: React.FunctionComponent<IAppProps> = ({ config }) => {
  const isDarkMode =
    userConfig && userConfig.darkMode ? userConfig.darkMode : config.darkMode;

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CookiesProvider>
          <Router />
        </CookiesProvider>
      </ThemeProvider>
    </ConnectedRouter>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  config: state.reducer.user.configuration
});

export default connect(mapStateToProps)(App);
