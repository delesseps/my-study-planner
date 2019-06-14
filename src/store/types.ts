import { Action } from "redux";
import IUser from "interfaces/IUser";
import { RouterState } from "connected-react-router";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";
import IRequestError from "interfaces/IRequestError";

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
}

export interface LoadingState {
  signIn: boolean;
  signUp: boolean;
  signOut: boolean;
  user: boolean;
}

export interface ReducerState {
  loading: LoadingState;
  error: ErrorState;
  user: IUser;
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
  | SignOutError;
