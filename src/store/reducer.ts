import { ApplicationAction, ReducerState } from "./types";
import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import produce from "immer";
import { message } from "antd";
import { persistReducer } from "redux-persist";
import localforage from "localforage";

const initialState: ReducerState = {
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
    role: "",
    picture: "",
    fcm: false,
    firstSignIn: false,
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
            message: action?.error?.data.errors.message,
            status: action?.error?.status,
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

        if (action.error) {
          draft.error = {
            ...draft.error,
            signUp: {
              message: action?.error?.data.errors.message,
              status: action?.error?.status,
              state: true
            }
          };
        }
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
        message.error("Could not get user. Please reload.");
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
        message.error("Could not sign out. Please reload.");
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
        draft.user.evaluations.push(action.evaluation);
        draft.user.evaluations.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        draft.drawer.evaluation = false;
        message.success("Successfully added evaluation!");
      });
    case "addEvaluationError":
      return produce(state, draft => {
        draft.loading.evaluation = false;
        message.error(
          "Could not add evaluation. Please reload or try again later."
        );
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
        action.evaluation.done
          ? message.success("Great Job!")
          : message.success("Successfully edited evaluation!");
      });
    case "editEvaluationError":
      return produce(state, draft => {
        draft.loading.evaluation = false;
        message.error(
          "Could not edit evaluation. Please reload or try again later."
        );
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
        message.success("Successfully deleted evaluation!");
      });

    case "deleteEvaluationError":
      return produce(state, draft => {
        message.error(
          "Could not delete evaluation. Please reload or try again later."
        );
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
     * Add homework reducers
     *
     */
    case "addHomeworkRequest":
      return produce(state, draft => {
        draft.loading.homework = true;
      });
    case "addHomeworkSuccess":
      return produce(state, draft => {
        draft.loading.homework = false;
        draft.user.homework.push(action.homework);
        draft.user.homework.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        draft.drawer.homework = false;
        message.success("Successfully added homework!");
      });
    case "addHomeworkError":
      return produce(state, draft => {
        draft.loading.homework = false;
        message.error(
          "Could not add homework. Please reload or try again later."
        );
        draft.error = {
          ...draft.error,
          homework: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Edit Homework reducers
     *
     */
    case "editHomeworkRequest":
      return produce(state, draft => {
        draft.loading.homework = true;
      });
    case "editHomeworkSuccess":
      return produce(state, draft => {
        draft.loading.homework = false;
        draft.user.homework[action.index] = action.homework;
        action.homework.done
          ? message.success("Great Job!")
          : message.success("Successfully edited homework!");
      });
    case "editHomeworkError":
      return produce(state, draft => {
        draft.loading.homework = false;
        message.error(
          "Could not edit homework. Please reload or try again later."
        );
        draft.error = {
          ...draft.error,
          homework: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Delete homework reducers
     *
     */
    case "deleteHomeworkRequest":
      return state;
    case "deleteHomeworkSuccess":
      return produce(state, draft => {
        draft.user.homework.splice(action.index, 1);
        message.success("Successfully deleted homework!");
      });
    case "deleteHomeworkError":
      return produce(state, draft => {
        message.error(
          "Could not delete homework. Please reload or try again later."
        );

        draft.error = {
          ...draft.error,
          homework: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * Upload profile picture reducers
     *
     */
    case "uploadProfilePictureRequest":
      return produce(state, draft => {
        draft.loading.uploadProfilePicture = true;
      });
    case "uploadProfilePictureSuccess":
      return produce(state, draft => {
        draft.loading.uploadProfilePicture = false;
        draft.user.picture = action.imageUrl;
        message.success("Successfully changed profile picture!");
      });
    case "uploadProfilePictureError":
      return produce(state, draft => {
        draft.loading.uploadProfilePicture = false;
        message.error(
          "An error has occurred. Please try gain with the same picture or another. "
        );
        draft.error = {
          ...draft.error,
          upload: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    /**
     *
     * User config reducers
     *
     */
    case "userConfigRequest":
      return state;
    case "userConfigSuccess":
      return produce(state, draft => {
        draft.user.configuration = action.config;
      });
    case "userConfigError":
      return produce(state, draft => {
        message.error("An error has occurred. Please try refreshing the page.");
        draft.error = {
          ...draft.error,
          config: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });

    /**
     *
     * Add to-do reducers
     *
     */
    case "addToDoRequest":
      return produce(state, draft => {
        draft.loading.toDo = true;
      });
    case "addToDoSuccess":
      return produce(state, draft => {
        draft.loading.toDo = false;
        draft.user.toDos.push(action.toDo);
        draft.drawer.toDo = false;
        message.success("Successfully added to-do!");
      });
    case "addToDoError":
      return produce(state, draft => {
        draft.loading.toDo = false;
        message.error("Could not add to-do. Please reload or try again later.");
        draft.error = {
          ...draft.error,
          toDo: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });

    /**
     *
     * Edit Homework reducers
     *
     */
    case "editToDoRequest":
      return produce(state, draft => {
        draft.loading.toDo = true;
      });
    case "editToDoSuccess":
      return produce(state, draft => {
        draft.loading.toDo = false;
        draft.user.toDos[action.index] = action.toDo;
        action.toDo.done
          ? message.success("Great Job!")
          : message.success("Successfully edited to-do!");
      });
    case "editToDoError":
      return produce(state, draft => {
        draft.loading.toDo = false;
        message.error(
          "Could not edit to-do. Please reload or try again later."
        );
        draft.error = {
          ...draft.error,
          toDo: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });

    /**
     *
     * Delete to-do reducers
     *
     */
    case "deleteToDoRequest":
      return state;
    case "deleteToDoSuccess":
      return produce(state, draft => {
        draft.user.toDos.splice(action.index, 1);
        message.success("Successfully deleted to-do!");
      });
    case "deleteToDoError":
      return produce(state, draft => {
        message.error(
          "Could not delete to-do. Please reload or try again later."
        );

        draft.error = {
          ...draft.error,
          toDo: {
            message: action.error.data.errors.message,
            status: action.error.status,
            state: true
          }
        };
      });
    //////////////
    //  Modals //
    /////////////
    case "ModalRequest":
      return produce(state, draft => {
        switch (action.modalType) {
          case "welcome":
            draft.loading.welcomeModal = true;
            break;
          default:
        }
      });
    case "ModalSuccess":
      return produce(state, draft => {
        switch (action.modalType) {
          case "welcome":
            draft.loading.welcomeModal = false;
            draft.user.firstSignIn = false;
            break;
          default:
        }
      });
    case "ModalError":
      return produce(state, draft => {
        message.error("Internal error. Please reload or try again later.");

        draft.error = {
          ...draft.error,
          modal: {
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

const reducerConfig = {
  key: "reducer",
  storage: localforage,
  blacklist: ["loading", "error"]
};

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    reducer: persistReducer(reducerConfig, reducer)
  });
