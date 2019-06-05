import { SignInRequest, SignInSuccess, SignInError } from "./types";
import IUser from "interfaces/IUser";

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
