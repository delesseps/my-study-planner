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
}

export interface LoadingState {
  user: boolean;
}

export interface ApplicationState {
  router?: RouterState;
  reducer: {
    loading: LoadingState;
    error: ErrorState;
    user: IUser;
  };
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

export type ApplicationAction =
  | SignInRequest
  | SignInSuccess
  | SignInError
  | SignUpRequest
  | SignUpError
  | SignUpSuccess
  | RequestUserPending
  | RequestUserSuccess
  | RequestUserError;
