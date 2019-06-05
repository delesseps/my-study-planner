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
  }
};

export default reducer;
