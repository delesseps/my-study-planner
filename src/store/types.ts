import { Action } from "redux";
import IUser from "interfaces/IUser";
import { RouterState } from "connected-react-router";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";
import IRequestError from "interfaces/IRequestError";
import IEvaluation from "interfaces/IEvaluation";
import IHomework from "interfaces/IHomework";
import IUserConfig from "interfaces/IUserConfig";
import IToDo from "interfaces/IToDo";

/**
 *
 * States interfaces
 *
 */
export interface ErrorState {
  signIn?: IRequestError;
  signUp?: IRequestError;
  user?: IRequestError;
  signOut?: IRequestError;
  evaluation?: IRequestError;
  homework?: IRequestError;
  toDo?: IRequestError;
  upload?: IRequestError;
  config?: IRequestError;
  modal?: IRequestError;
}

export interface LoadingState {
  signIn: boolean;
  signUp: boolean;
  signOut: boolean;
  user: boolean;
  uploadProfilePicture: boolean;
  evaluation: boolean;
  homework: boolean;
  toDo: boolean;
  welcomeModal: boolean;
}

export interface DrawerState {
  evaluation: boolean;
  homework: boolean;
  toDo: boolean;
}

export interface ReducerState {
  loading: LoadingState;
  error: ErrorState;
  user: IUser;
  drawer: DrawerState;
}

export interface ApplicationState {
  router?: RouterState;
  reducer: ReducerState;
}

/**
 *
 * Sign in actions interfaces
 *
 */
export interface SignInRequest extends Action {
  type: "signInRequest";
}

export interface SignInSuccess extends Action {
  type: "signInSuccess";
  user: IUser;
}

export interface SignInError extends Action {
  type: "signInError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Sign up actions interfaces
 *
 */
export interface SignUpRequest extends Action {
  type: "signUpRequest";
}

export interface SignUpSuccess extends Action {
  type: "signUpSuccess";
  user: IUser;
}

export interface SignUpError extends Action {
  type: "signUpError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Get user interfaces
 *
 */
export interface RequestUserPending extends Action {
  type: "requestUserPending";
}

export interface RequestUserSuccess extends Action {
  type: "requestUserSuccess";
  user: IUser;
}

export interface RequestUserError extends Action {
  type: "requestUserError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Sign out interfaces
 *
 */

export interface SignOutRequest extends Action {
  type: "signOutRequest";
}

export interface SignOutSuccess extends Action {
  type: "signOutSuccess";
}

export interface SignOutError extends Action {
  type: "signOutError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Drawer interfaces
 *
 */
export interface EvaluationDrawer extends Action {
  type: "evaluationDrawer";
}

export interface HomeworkDrawer extends Action {
  type: "homeworkDrawer";
}

export interface ToDoDrawer extends Action {
  type: "toDoDrawer";
}

/**
 *
 * Add evaluation interfaces
 *
 */
export interface AddEvaluationRequest extends Action {
  type: "addEvaluationRequest";
}

export interface AddEvaluationSuccess extends Action {
  type: "addEvaluationSuccess";
  evaluation: IEvaluation;
}

export interface AddEvaluationError extends Action {
  type: "addEvaluationError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Edit evaluation interfaces
 *
 */
export interface EditEvaluationRequest extends Action {
  type: "editEvaluationRequest";
}

export interface EditEvaluationSuccess extends Action {
  type: "editEvaluationSuccess";
  evaluation: IEvaluation;
  index: number;
}

export interface EditEvaluationError extends Action {
  type: "editEvaluationError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Delete evaluation interfaces
 *
 */
export interface DeleteEvaluationRequest extends Action {
  type: "deleteEvaluationRequest";
}

export interface DeleteEvaluationSuccess extends Action {
  type: "deleteEvaluationSuccess";
  index: number;
}

export interface DeleteEvaluationError extends Action {
  type: "deleteEvaluationError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Add homework interfaces
 *
 */
export interface AddHomeworkRequest extends Action {
  type: "addHomeworkRequest";
}

export interface AddHomeworkSuccess extends Action {
  type: "addHomeworkSuccess";
  homework: IHomework;
}

export interface AddHomeworkError extends Action {
  type: "addHomeworkError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Edit homework interfaces
 *
 */
export interface EditHomeworkRequest extends Action {
  type: "editHomeworkRequest";
}

export interface EditHomeworkSuccess extends Action {
  type: "editHomeworkSuccess";
  homework: IHomework;
  index: number;
}

export interface EditHomeworkError extends Action {
  type: "editHomeworkError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Delete homework interfaces
 *
 */
export interface DeleteHomeworkRequest extends Action {
  type: "deleteHomeworkRequest";
}

export interface DeleteHomeworkSuccess extends Action {
  type: "deleteHomeworkSuccess";
  index: number;
}

export interface DeleteHomeworkError extends Action {
  type: "deleteHomeworkError";
  error: IAxiosErrorResponse;
}

/**
 *
 * User profile picture interfaces
 *
 */
export interface UploadProfilePictureRequest extends Action {
  type: "uploadProfilePictureRequest";
}

export interface UploadProfilePictureSuccess extends Action {
  type: "uploadProfilePictureSuccess";
  imageUrl: string;
}

export interface UploadProfilePictureError extends Action {
  type: "uploadProfilePictureError";
  error: IAxiosErrorResponse;
}

/**
 *
 * User config interfaces
 *
 */
export interface UserConfigRequest extends Action {
  type: "userConfigRequest";
}

export interface UserConfigSuccess extends Action {
  type: "userConfigSuccess";
  config: IUserConfig;
}

export interface UserConfigError extends Action {
  type: "userConfigError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Add homework interfaces
 *
 */
export interface AddToDoRequest extends Action {
  type: "addToDoRequest";
}

export interface AddToDoSuccess extends Action {
  type: "addToDoSuccess";
  toDo: IToDo;
}

export interface AddToDoError extends Action {
  type: "addToDoError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Edit to-do interfaces
 *
 */
export interface EditToDoRequest extends Action {
  type: "editToDoRequest";
}

export interface EditToDoSuccess extends Action {
  type: "editToDoSuccess";
  toDo: IToDo;
  index: number;
}

export interface EditToDoError extends Action {
  type: "editToDoError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Delete homework interfaces
 *
 */
export interface DeleteToDoRequest extends Action {
  type: "deleteToDoRequest";
}

export interface DeleteToDoSuccess extends Action {
  type: "deleteToDoSuccess";
  index: number;
}

export interface DeleteToDoError extends Action {
  type: "deleteToDoError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Modal interfaces
 *
 */
export interface ModalRequest extends Action {
  type: "ModalRequest";
  modalType: "welcome";
}

export interface ModalSuccess extends Action {
  type: "ModalSuccess";
  modalType: "welcome";
}

export interface ModalError extends Action {
  type: "ModalError";
  error: IAxiosErrorResponse;
}

export type ApplicationAction =
  | SignInRequest
  | SignInSuccess
  | SignInError
  | SignUpRequest
  | SignUpError
  | SignUpSuccess
  | RequestUserPending
  | RequestUserSuccess
  | RequestUserError
  | SignOutRequest
  | SignOutSuccess
  | SignOutError
  | EvaluationDrawer
  | HomeworkDrawer
  | ToDoDrawer
  | AddEvaluationRequest
  | AddEvaluationSuccess
  | AddEvaluationError
  | EditEvaluationRequest
  | EditEvaluationSuccess
  | EditEvaluationError
  | DeleteEvaluationRequest
  | DeleteEvaluationSuccess
  | DeleteEvaluationError
  | AddHomeworkRequest
  | AddHomeworkSuccess
  | AddHomeworkError
  | EditHomeworkRequest
  | EditHomeworkSuccess
  | EditHomeworkError
  | DeleteHomeworkRequest
  | DeleteHomeworkSuccess
  | DeleteHomeworkError
  | AddToDoRequest
  | AddToDoSuccess
  | AddToDoError
  | EditToDoRequest
  | EditToDoSuccess
  | EditToDoError
  | DeleteToDoRequest
  | DeleteToDoSuccess
  | DeleteToDoError
  | UploadProfilePictureRequest
  | UploadProfilePictureSuccess
  | UploadProfilePictureError
  | UserConfigRequest
  | UserConfigSuccess
  | UserConfigError
  | ModalRequest
  | ModalSuccess
  | ModalError;
