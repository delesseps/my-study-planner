import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import createRootReducer from "./reducer";

import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { ApplicationState } from "./types";
import { persistStore, persistReducer } from 'redux-persist'

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
  key: 'root',
  storage: localforage,
}

const middlewares = process.env.NODE_ENV === "production"
  ? [routerMiddleware(history), thunk]
  : [routerMiddleware(history), thunk, logger]

const rootReducer = createRootReducer(history);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store)

  return { persistor, store };
}
