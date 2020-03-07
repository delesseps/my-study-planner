import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import createRootReducer from "./reducer";

import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { ApplicationState } from "./types";
import { persistStore, persistReducer } from "redux-persist";

import localforage from "localforage";

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

const logger = createLogger();
export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage: localforage,
  blacklist: ["reducer", "router"]
};

const middlewares =
  process.env.NODE_ENV === "development"
    ? [routerMiddleware(history), thunk, logger]
    : [routerMiddleware(history), thunk];

const rootReducer = createRootReducer(history);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(state = initialState) {
  const store = createStore(
    persistedReducer,
    state,
    compose(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);

  return { persistor, store };
}
