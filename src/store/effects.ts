import { ThunkAction } from "redux-thunk";
import { ApplicationState, ApplicationAction } from "./types";
import {
  signInRequest,
  signInSuccess,
  signInError,
  signUpError,
  signUpRequest,
  signUpSuccess,
  requestUserPending,
  requestUserSuccess,
  requestUserError
} from "./actions";
import { push } from "connected-react-router";

import { signInService, signUpService, requestUserService } from "services";

import IUser from "interfaces/IUser";
import ISignInCredentials from "interfaces/ISignInCredentials";
import ISignUpCredentials from "interfaces/ISignUpCredentials";

import { Cookies } from "react-cookie";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const signIn = (credentials: ISignInCredentials): Effect => dispatch => {
  const cookies = new Cookies();
  dispatch(signInRequest());

  return signInService(credentials)
    .then(
      ({ data }: { data: { user: IUser; expiresIn: number | undefined } }) => {
        dispatch(signInSuccess(data.user));

        cookies.set("IS_LOGGED_IN", true, {
          maxAge: data.expiresIn
        });

        dispatch<any>(push("/dashboard"));
      }
    )
    .catch(({response} : {response: IAxiosErrorResponse}) => dispatch(signInError(response)));
};

export const signUp = (credentials: ISignUpCredentials): Effect => dispatch => {
  const cookies = new Cookies();
  dispatch(signUpRequest());

  return signUpService(credentials)
    .then(
      ({ data }: { data: { user: IUser; expiresIn: number | undefined } }) => {
        dispatch(signUpSuccess(data.user));
        cookies.set("IS_LOGGED_IN", true);
        dispatch<any>(push("/dashboard"));
      }
    )
    .catch(({response} : {response: IAxiosErrorResponse}) => dispatch(signUpError(response)));
};

export const requestUser = (): Effect => dispatch => {
  console.log("aaa");
  dispatch(requestUserPending());

  return requestUserService()
    .then(({ data }: { data: { user: IUser } }) => {
      dispatch(requestUserSuccess(data.user));
    })
    .catch(({response} : {response: IAxiosErrorResponse}) => dispatch(requestUserError(response)));
};
