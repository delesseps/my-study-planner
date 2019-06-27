import { ApplicationAction, ReducerState } from "./types";
import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import produce from "immer";

const initialState: ReducerState = {
  loading: {
    signIn: false,
    signUp: false,
    user: true,
    signOut: false,
    evaluation: false,
    homework: false,
    toDo: false
  },
  error: {},
  user: {
    name: "",
    email: "",
    role: "",
    picture: "",
    evaluations: [],
    homework: [],
    todos: [],
    semesters: []
  },
  drawer: {
    evaluation: false,
    homework: false,
    toDo: false
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
      return produce(state, draft => {
        draft.loading.signIn = true;
      });
    case "signInSuccess":
      return produce(state, draft => {
        draft.loading.signIn = false;
        draft.error = {};
        draft.user = action.user;
      });
    case "signInError":
      return produce(state, draft => {
        draft.loading.signIn = false;
        draft.error = {
          ...draft.error,
          signIn: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Sign up reducers
     *
     * */
    case "signUpRequest":
      return produce(state, draft => {
        draft.loading.signUp = true;
      });

    case "signUpSuccess":
      return produce(state, draft => {
        draft.loading.signUp = false;
        draft.error = {};
        draft.user = action.user;
      });
    case "signUpError":
      return produce(state, draft => {
        draft.loading.signUp = false;
        draft.error = {
          ...draft.error,
          signUp: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Get user reducers
     *
     * */
    case "requestUserPending":
      return {
        ...state
      };
    case "requestUserSuccess":
      return produce(state, draft => {
        draft.loading.user = false;
        draft.user = action.user;
      });
    case "requestUserError":
      return produce(state, draft => {
        draft.loading.user = false;
        draft.error = {
          ...draft.error,
          user: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Sign out reducers
     *
     */
    case "signOutRequest":
      return produce(state, draft => {
        draft.loading.signOut = true;
      });
    case "signOutSuccess":
      return produce(state, draft => {
        draft.loading.signOut = false;
        draft.user = initialState.user;
      });
    case "signOutError":
      return produce(state, draft => {
        draft.loading.signOut = false;
        draft.error = {
          ...draft.error,
          signOut: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Drawers reducers
     *
     */
    case "evaluationDrawer":
      return produce(state, draft => {
        draft.drawer.evaluation = !state.drawer.evaluation;
      });
    case "homeworkDrawer":
      return produce(state, draft => {
        draft.drawer.homework = !state.drawer.homework;
      });
    case "toDoDrawer":
      return produce(state, draft => {
        draft.drawer.toDo = !state.drawer.toDo;
      });
    /**
     *
     * Add Evaluation reducers
     *
     */
    case "addEvaluationRequest":
      return produce(state, draft => {
        draft.loading.evaluation = true;
      });
    case "addEvaluationSuccess":
      return produce(state, draft => {
        draft.loading.evaluation = false;
        draft.drawer.evaluation = false;
        draft.user.evaluations.push(action.evaluation);
        draft.user.evaluations.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      });
    case "addEvaluationError":
      return produce(state, draft => {
        draft.loading.evaluation = false;
        draft.error = {
          ...draft.error,
          evaluation: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Edit Evaluation reducers
     *
     */
    case "editEvaluationRequest":
      return produce(state, draft => {
        draft.loading.evaluation = true;
      });
    case "editEvaluationSuccess":
      return produce(state, draft => {
        draft.loading.evaluation = false;
        draft.user.evaluations[action.index] = action.evaluation;
      });
    case "editEvaluationError":
      return produce(state, draft => {
        draft.loading.evaluation = false;
        draft.error = {
          ...draft.error,
          evaluation: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Delete Evaluation reducers
     *
     */
    case "deleteEvaluationRequest":
      return state;
    case "deleteEvaluationSuccess":
      return produce(state, draft => {
        draft.user.evaluations.splice(action.index, 1);
      });
    case "deleteEvaluationError":
      return produce(state, draft => {
        draft.error = {
          ...draft.error,
          evaluation: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    default:
      return state;
  }
};

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    reducer
  });
