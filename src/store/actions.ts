import {
  SignInRequest,
  SignInSuccess,
  SignInError,
  SignUpRequest,
  SignUpSuccess,
  SignUpError,
  RequestUserPending,
  RequestUserSuccess,
  RequestUserError,
  SignOutRequest,
  SignOutSuccess,
  SignOutError,
  HomeworkDrawer,
  ToDoDrawer,
  AddEvaluationRequest,
  AddEvaluationSuccess,
  AddEvaluationError,
  EvaluationDrawer,
  EditEvaluationRequest,
  EditEvaluationSuccess,
  EditEvaluationError,
  DeleteEvaluationError,
  DeleteEvaluationRequest,
  DeleteEvaluationSuccess,
  AddHomeworkRequest,
  AddHomeworkSuccess,
  AddHomeworkError,
  EditHomeworkRequest,
  EditHomeworkSuccess,
  EditHomeworkError,
  DeleteHomeworkRequest,
  DeleteHomeworkSuccess,
  DeleteHomeworkError,
  UploadProfilePictureRequest,
  UploadProfilePictureError,
  UploadProfilePictureSuccess,
  UserConfigRequest,
  UserConfigSuccess,
  UserConfigError
} from "./types";
import IUser from "interfaces/IUser";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";
import IEvaluation from "interfaces/IEvaluation";
import IHomework from "interfaces/IHomework";
import IUserConfig from "interfaces/IUserConfig";

/**
 *
 * Sign in actions
 *
 */

export const signInRequest = (): SignInRequest => ({
  type: "signInRequest"
});

export const signInSuccess = (user: IUser): SignInSuccess => ({
  type: "signInSuccess",
  user
});

export const signInError = (error: IAxiosErrorResponse): SignInError => ({
  type: "signInError",
  error
});

/**
 *
 * Sign up actions
 *
 */

export const signUpRequest = (): SignUpRequest => ({
  type: "signUpRequest"
});

export const signUpSuccess = (user: IUser): SignUpSuccess => ({
  type: "signUpSuccess",
  user
});

export const signUpError = (error: IAxiosErrorResponse): SignUpError => ({
  type: "signUpError",
  error
});

/**
 *
 * Get user actions
 *
 */

export const requestUserPending = (): RequestUserPending => ({
  type: "requestUserPending"
});

export const requestUserSuccess = (user: IUser): RequestUserSuccess => ({
  type: "requestUserSuccess",
  user
});

export const requestUserError = (
  error: IAxiosErrorResponse
): RequestUserError => ({
  type: "requestUserError",
  error
});

/**
 *
 * Sign out interfaces
 *
 */

export const signOutRequest = (): SignOutRequest => ({
  type: "signOutRequest"
});

export const signOutSuccess = (): SignOutSuccess => ({
  type: "signOutSuccess"
});

export const signOutError = (error: IAxiosErrorResponse): SignOutError => ({
  type: "signOutError",
  error
});

/**
 *
 * Drawer interfaces
 *
 */
export const evaluationDrawer = (): EvaluationDrawer => ({
  type: "evaluationDrawer"
});

export const homeworkDrawer = (): HomeworkDrawer => ({
  type: "homeworkDrawer"
});

export const toDoDrawer = (): ToDoDrawer => ({
  type: "toDoDrawer"
});

/**
 *
 * Add evaluation interfaces
 *
 */

export const addEvaluationRequest = (): AddEvaluationRequest => ({
  type: "addEvaluationRequest"
});

export const addEvaluationSuccess = (
  evaluation: IEvaluation
): AddEvaluationSuccess => ({
  type: "addEvaluationSuccess",
  evaluation
});

export const addEvaluationError = (
  error: IAxiosErrorResponse
): AddEvaluationError => ({
  type: "addEvaluationError",
  error
});

/**
 *
 * Edit evaluation interfaces
 *
 */

export const editEvaluationRequest = (): EditEvaluationRequest => ({
  type: "editEvaluationRequest"
});

export const editEvaluationSuccess = (
  evaluation: IEvaluation,
  index: number
): EditEvaluationSuccess => ({
  type: "editEvaluationSuccess",
  evaluation,
  index
});

export const editEvaluationError = (
  error: IAxiosErrorResponse
): EditEvaluationError => ({
  type: "editEvaluationError",
  error
});

/**
 *
 * Delete evaluation interfaces
 *
 */

export const deleteEvaluationRequest = (): DeleteEvaluationRequest => ({
  type: "deleteEvaluationRequest"
});

export const deleteEvaluationSuccess = (
  index: number
): DeleteEvaluationSuccess => ({
  type: "deleteEvaluationSuccess",
  index
});

export const deleteEvaluationError = (
  error: IAxiosErrorResponse
): DeleteEvaluationError => ({
  type: "deleteEvaluationError",
  error
});

/**
 *
 * Add homework interfaces
 *
 */

export const addHomeworkRequest = (): AddHomeworkRequest => ({
  type: "addHomeworkRequest"
});

export const addHomeworkSuccess = (
  homework: IHomework
): AddHomeworkSuccess => ({
  type: "addHomeworkSuccess",
  homework
});

export const addHomeworkError = (
  error: IAxiosErrorResponse
): AddHomeworkError => ({
  type: "addHomeworkError",
  error
});

/**
 *
 * Edit homework interfaces
 *
 */

export const editHomeworkRequest = (): EditHomeworkRequest => ({
  type: "editHomeworkRequest"
});

export const editHomeworkSuccess = (
  homework: IHomework,
  index: number
): EditHomeworkSuccess => ({
  type: "editHomeworkSuccess",
  homework,
  index
});

export const editHomeworkError = (
  error: IAxiosErrorResponse
): EditHomeworkError => ({
  type: "editHomeworkError",
  error
});

/**
 *
 * Delete homework interfaces
 *
 */

export const deleteHomeworkRequest = (): DeleteHomeworkRequest => ({
  type: "deleteHomeworkRequest"
});

export const deleteHomeworkSuccess = (
  index: number
): DeleteHomeworkSuccess => ({
  type: "deleteHomeworkSuccess",
  index
});

export const deleteHomeworkError = (
  error: IAxiosErrorResponse
): DeleteHomeworkError => ({
  type: "deleteHomeworkError",
  error
});

/**
 *
 * User profile picture actions
 *
 */
export const uploadPictureRequest = (): UploadProfilePictureRequest => ({
  type: "uploadProfilePictureRequest"
});

export const uploadPictureSuccess = (
  imageUrl: string
): UploadProfilePictureSuccess => ({
  type: "uploadProfilePictureSuccess",
  imageUrl
});

export const uploadPictureError = (
  error: IAxiosErrorResponse
): UploadProfilePictureError => ({
  type: "uploadProfilePictureError",
  error
});

/**
 *
 * User config actions
 *
 */
export const userConfigRequest = (): UserConfigRequest => ({
  type: "userConfigRequest"
});

export const userConfigSuccess = (config: IUserConfig): UserConfigSuccess => ({
  type: "userConfigSuccess",
  config
});

export const userConfigError = (
  error: IAxiosErrorResponse
): UserConfigError => ({
  type: "userConfigError",
  error
});
