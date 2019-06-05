import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducer, { initialState } from "store/reducer";

const logger = createLogger();

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk, logger))
);

export default store;
