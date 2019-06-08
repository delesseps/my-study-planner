import { ApplicationState, ApplicationAction } from "./types";

export const initialState: ApplicationState = {
  loading: {
    user: false
  },
  user: {
    name: "",
    email: "",
    evaluations: [],
    homework: [],
    todos: [],
    semesters: []
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
        }
      };
  }
};

export default reducer;
