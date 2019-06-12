import { ApplicationState, ApplicationAction } from "./types";
import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";

export const initialState: ApplicationState = {
  reducer: {
    loading: {
      user: false
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

const reducer = (state = initialState, action: ApplicationAction) => {
  switch (action.type) {
    /**
     *
     * Sign in reducers
     *
     */

    case "signInRequest":
      return {
        ...state,
        loading: {
          user: true
        }
      };
    case "signInSuccess":
      return {
        ...state,
        loading: {
          user: false
        },
        user: action.user
      };
    case "signInError":
      return {
        ...state,
        loading: {
          user: false
        },
        error: {
          signIn: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        }
      };

    /**
     *
     * Sign up reducers
     *
     * */
    case "signUpRequest":
      return {
        ...state,
        loading: {
          user: true
        }
      };
    case "signUpSuccess":
      return {
        ...state,
        loading: {
          user: false
        },
        user: action.user
      };
    case "signUpError":
      return {
        ...state,
        loading: {
          user: false
        },
        error: {
          signUp: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        }
      };
    /**
     *
     * Get user reducers
     *
     * */
    case "requestUserPending":
      return {
        ...state,
        loading: {
          user: true
        }
      };
    case "requestUserSuccess":
      return {
        ...state,
        loading: {
          user: false
        },
        user: action.user
      };
    case "requestUserError":
      return {
        ...state,
        loading: {
          user: false
        },
        error: {
          user: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        }
      };
    default:
      return state;
  }
};

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    reducer
  });
