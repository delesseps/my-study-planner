import { Action } from "redux";
import IUser from "interfaces/IUser";
import { RouterState } from "connected-react-router";

/**
 *
 * States interfaces
 *
 */
export interface LoadingState {
  user: boolean;
}

export interface ApplicationState {
  router?: RouterState;
  reducer: {
    loading: LoadingState;
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
