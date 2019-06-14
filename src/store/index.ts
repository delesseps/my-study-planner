import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import createRootReducer from "./reducer";

import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { ApplicationState } from "./types";

const logger = createLogger();

export const history = createBrowserHistory();

export const initialState: ApplicationState = {
  reducer: {
    loading: {
      signIn: false,
      signUp: false,
      user: true
    },
    error: {},
    user: {
      name: "",
      email: "",
      role: "",
      evaluations: [],
      homework: [],
      todos: [],
      semesters: []
    }
  }
};

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(routerMiddleware(history), thunk, logger))
  );

  return store;
}
