import { ThunkAction } from "redux-thunk";
import { ApplicationState, ApplicationAction } from "./types";
import {
  signInRequest,
  signInSuccess,
  signInError,
  signUpError,
  signUpRequest,
  signUpSuccess
} from "./actions";
import IUser from "interfaces/IUser";
import { signInService, signUpService } from "services";
import ISignInCredentials from "interfaces/ISignInCredentials";
import ISignUpCredentials from "interfaces/ISignUpCredentials";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const signIn = (credentials: ISignInCredentials): Effect => dispatch => {
  dispatch(signInRequest());

  return signInService(credentials)
    .then(({ data }: { data: IUser }) => dispatch(signInSuccess(data)))
    .catch(() => dispatch(signInError()));
};

export const signUp = (credentials: ISignUpCredentials): Effect => dispatch => {
  console.log("aaa");
  dispatch(signUpRequest());

  return signUpService(credentials)
    .then(({ data }: { data: IUser }) => dispatch(signUpSuccess(data)))
    .catch(() => dispatch(signUpError()));
};
