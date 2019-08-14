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
      user: true,
      signOut: false,
      evaluation: false,
      homework: false,
      toDo: false,
      uploadProfilePicture: false,
      welcomeModal: false
    },
    error: {},
    user: {
      name: "",
      email: "",
      picture: "",
      firstSignIn: false,
      fcm: false,
      role: "",
      verified: true,
      configuration: {
        darkMode: false
      },
      evaluations: [],
      homework: [],
      toDos: [],
      semesters: []
    },
    drawer: {
      evaluation: false,
      homework: false,
      toDo: false
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
