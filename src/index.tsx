import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "store";

import { ThemeProvider } from "styled-components";
import { theme } from "styled";

import { CookiesProvider } from "react-cookie";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Router />
        </CookiesProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
