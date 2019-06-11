import {
  SignInRequest,
  SignInSuccess,
  SignInError,
  SignUpRequest,
  SignUpSuccess,
  SignUpError,
  RequestUserPending,
  RequestUserSuccess,
  RequestUserError
} from "./types";
import IUser from "interfaces/IUser";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";

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

export const signInError = (error : IAxiosErrorResponse ): SignInError => ({
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

export const signUpError = (error : IAxiosErrorResponse ): SignUpError => ({
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

export const requestUserError = (error : IAxiosErrorResponse ): RequestUserError => ({
  type: "requestUserError", 
  error
});
