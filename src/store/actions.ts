import {
  SignInRequest,
  SignInSuccess,
  SignInError,
  SignUpRequest,
  SignUpSuccess,
  SignUpError
} from "./types";
import IUser from "interfaces/IUser";

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

export const signInError = (): SignInError => ({
  type: "signInError"
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

export const signUpError = (): SignUpError => ({
  type: "signUpError"
});
