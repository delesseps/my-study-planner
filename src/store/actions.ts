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
  DeleteEvaluationSuccess
} from "./types";
import IUser from "interfaces/IUser";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";
import IEvaluation from "interfaces/IEvaluation";

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
