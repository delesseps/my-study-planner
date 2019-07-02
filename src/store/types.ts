import { Action } from "redux";
import IUser from "interfaces/IUser";
import { RouterState } from "connected-react-router";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";
import IRequestError from "interfaces/IRequestError";
import IEvaluation from "interfaces/IEvaluation";
import IHomework from "interfaces/IHomework";
import IUserConfig from "interfaces/IUserConfig";

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
  upload?: IRequestError;
  config?: IRequestError;
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
export interface AddEvaluationRequest {
  type: "addEvaluationRequest";
}

export interface AddEvaluationSuccess {
  type: "addEvaluationSuccess";
  evaluation: IEvaluation;
}

export interface AddEvaluationError {
  type: "addEvaluationError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Edit evaluation interfaces
 *
 */
export interface EditEvaluationRequest {
  type: "editEvaluationRequest";
}

export interface EditEvaluationSuccess {
  type: "editEvaluationSuccess";
  evaluation: IEvaluation;
  index: number;
}

export interface EditEvaluationError {
  type: "editEvaluationError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Delete evaluation interfaces
 *
 */
export interface DeleteEvaluationRequest {
  type: "deleteEvaluationRequest";
}

export interface DeleteEvaluationSuccess {
  type: "deleteEvaluationSuccess";
  index: number;
}

export interface DeleteEvaluationError {
  type: "deleteEvaluationError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Add homework interfaces
 *
 */
export interface AddHomeworkRequest {
  type: "addHomeworkRequest";
}

export interface AddHomeworkSuccess {
  type: "addHomeworkSuccess";
  homework: IHomework;
}

export interface AddHomeworkError {
  type: "addHomeworkError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Edit homework interfaces
 *
 */
export interface EditHomeworkRequest {
  type: "editHomeworkRequest";
}

export interface EditHomeworkSuccess {
  type: "editHomeworkSuccess";
  homework: IHomework;
  index: number;
}

export interface EditHomeworkError {
  type: "editHomeworkError";
  error: IAxiosErrorResponse;
}

/**
 *
 * Delete homework interfaces
 *
 */
export interface DeleteHomeworkRequest {
  type: "deleteHomeworkRequest";
}

export interface DeleteHomeworkSuccess {
  type: "deleteHomeworkSuccess";
  index: number;
}

export interface DeleteHomeworkError {
  type: "deleteHomeworkError";
  error: IAxiosErrorResponse;
}

/**
 *
 * User profile picture interfaces
 *
 */
export interface UploadProfilePictureRequest {
  type: "uploadProfilePictureRequest";
}

export interface UploadProfilePictureSuccess {
  type: "uploadProfilePictureSuccess";
  imageUrl: string;
}

export interface UploadProfilePictureError {
  type: "uploadProfilePictureError";
  error: IAxiosErrorResponse;
}

/**
 *
 * User config interfaces
 *
 */
export interface UserConfigRequest {
  type: "userConfigRequest";
}

export interface UserConfigSuccess {
  type: "userConfigSuccess";
  config: IUserConfig;
}

export interface UserConfigError {
  type: "userConfigError";
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
  | UploadProfilePictureRequest
  | UploadProfilePictureSuccess
  | UploadProfilePictureError
  | UserConfigRequest
  | UserConfigSuccess
  | UserConfigError;
