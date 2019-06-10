import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import createRootReducer, { initialState } from "./reducer";

import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

const logger = createLogger();

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(routerMiddleware(history), thunk, logger))
  );

  return store;
}
