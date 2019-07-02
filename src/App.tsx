import * as React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "styled";
import Router from "./Router";

import { CookiesProvider } from "react-cookie";
import { ApplicationState } from "store/types";
import IUserConfig from "interfaces/IUserConfig";
import { connect } from "react-redux";

interface IAppProps {
  config: IUserConfig;
}

const App: React.FunctionComponent<IAppProps> = ({ config }) => {
  return (
    <ThemeProvider theme={config.darkMode ? darkTheme : lightTheme}>
      <CookiesProvider>
        <Router />
      </CookiesProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  config: state.reducer.user.configuration
});

export default connect(mapStateToProps)(App);
