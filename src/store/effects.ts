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
  requestUserError,
  signOutRequest,
  signOutSuccess,
  signOutError,
  addEvaluationRequest,
  addEvaluationSuccess,
  addEvaluationError
} from "./actions";
import { push } from "connected-react-router";

import {
  signInService,
  signUpService,
  requestUserService,
  signOutService,
  evaluationService
} from "services";

import IUser from "interfaces/IUser";
import ISignInCredentials from "interfaces/ISignInCredentials";
import ISignUpCredentials from "interfaces/ISignUpCredentials";

import { Cookies } from "react-cookie";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";
import { AxiosResponse } from "axios";
import IEvaluation from "interfaces/IEvaluation";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const signIn = (credentials: ISignInCredentials): Effect => dispatch => {
  dispatch(signInRequest());

  return signInService(credentials)
    .then(({ data }: { data: { user: IUser } }) => {
      dispatch(signInSuccess(data.user));
      dispatch<any>(push("/dashboard"));
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(signInError(response))
    );
};

export const signUp = (credentials: ISignUpCredentials): Effect => dispatch => {
  dispatch(signUpRequest());

  return signUpService(credentials)
    .then(({ data }: { data: { user: IUser } }) => {
      dispatch(signUpSuccess(data.user));
      dispatch<any>(push("/dashboard"));
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(signUpError(response))
    );
};

export const requestUser = (): Effect => dispatch => {
  dispatch(requestUserPending());

  return requestUserService()
    .then(({ data }: { data: { user: IUser } }) => {
      dispatch(requestUserSuccess(data.user));
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(requestUserError(response))
    );
};

export const signOut = (): Effect => dispatch => {
  const cookies = new Cookies();
  dispatch(signOutRequest());

  return signOutService()
    .then((response: AxiosResponse) => {
      cookies.remove("IS_LOGGED_IN");
      dispatch(signOutSuccess());
      dispatch<any>(push("/signin"));
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(signOutError(response))
    );
};

export const addEvaluation = (evaluation: IEvaluation): Effect => dispatch => {
  dispatch(addEvaluationRequest());

  return evaluationService(evaluation)
    .then(({ data }: { data: { evaluation: IEvaluation } }) =>
      dispatch<any>(addEvaluationSuccess(data.evaluation))
    )
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(addEvaluationError(response))
    );
};
