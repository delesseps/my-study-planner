import { Action } from "redux";
import IUser from "interfaces/IUser";

export interface LoadingState {
  user: boolean;
}

export interface ApplicationState {
  loading: LoadingState;
  user: IUser;
}

//USER ACTIONS
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

export type ApplicationAction = SignInRequest | SignInSuccess | SignInError;
