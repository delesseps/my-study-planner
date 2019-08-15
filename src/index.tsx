import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import App from "App";

import { Provider } from "react-redux";

import configureStore from "store";

const store = configureStore();

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
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
