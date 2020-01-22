import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import App from "App";

import { Provider } from "react-redux";

import configureStore from "store";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "components";
import { antdDarkVars } from "theme";
import less from "less";

import "./less/main.less";

// const newVarsArray: any = Object.entries(darkThemeVars).map(pair => {
//   pair[1].replace(pair[0], `@${pair[0]}`);
//   pair[0] = "@" + pair[0];

//   return pair;
// });

// const newVars = Object.fromEntries(newVarsArray);
// console.log(JSON.stringify(newVars));

//window.less.modifyVars({ ...antdDarkVars });

//less.refreshStyles();

const { persistor, store } = configureStore();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
