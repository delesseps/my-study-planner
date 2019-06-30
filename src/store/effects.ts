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
  addEvaluationError,
  editEvaluationSuccess,
  editEvaluationError,
  editEvaluationRequest,
  deleteEvaluationRequest,
  deleteEvaluationSuccess,
  deleteEvaluationError,
  addHomeworkRequest,
  addHomeworkSuccess,
  addHomeworkError,
  editHomeworkRequest,
  editHomeworkSuccess,
  editHomeworkError,
  deleteHomeworkRequest,
  deleteHomeworkSuccess,
  deleteHomeworkError
} from "./actions";
import { push } from "connected-react-router";

import {
  signInService,
  signUpService,
  requestUserService,
  signOutService,
  evaluationService,
  requestEditEvaluation,
  requestDeleteEvaluation,
  homeworkService,
  requestEditHomework,
  requestDeleteHomework
} from "services";

import IUser from "interfaces/IUser";
import ISignInCredentials from "interfaces/ISignInCredentials";
import ISignUpCredentials from "interfaces/ISignUpCredentials";

import { Cookies } from "react-cookie";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";
import { AxiosResponse } from "axios";
import IEvaluation from "interfaces/IEvaluation";
import IHomework from "interfaces/IHomework";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

////////////
//  Auth //
//////////
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

//////////////////
//  EVALUATIONS //
//////////////////
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

export const editEvaluation = (
  evaluation: IEvaluation,
  index: number,
  setVisibleEdit?: Function
): Effect => dispatch => {
  dispatch(editEvaluationRequest());

  return requestEditEvaluation(evaluation)
    .then(({ data }: { data: { evaluation: IEvaluation } }) => {
      dispatch<any>(editEvaluationSuccess(data.evaluation, index));
      setVisibleEdit && setVisibleEdit(false);
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(editEvaluationError(response))
    );
};

export const deleteEvaluation = (
  id: string,
  index: number
): Effect => dispatch => {
  dispatch(deleteEvaluationRequest());

  return requestDeleteEvaluation(id)
    .then(({ data }: { data: { evaluation: IEvaluation } }) =>
      dispatch<any>(deleteEvaluationSuccess(index))
    )
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(deleteEvaluationError(response))
    );
};

////////////////
//  Homework //
///////////////
export const addHomework = (homework: IHomework): Effect => dispatch => {
  dispatch(addHomeworkRequest());

  return homeworkService(homework)
    .then(({ data }: { data: { homework: IHomework } }) =>
      dispatch<any>(addHomeworkSuccess(data.homework))
    )
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(addHomeworkError(response))
    );
};

export const editHomework = (
  homework: IHomework,
  index: number,
  setVisibleEdit?: Function
): Effect => dispatch => {
  dispatch(editHomeworkRequest());

  return requestEditHomework(homework)
    .then(({ data }: { data: { homework: IHomework } }) => {
      dispatch<any>(editHomeworkSuccess(data.homework, index));
      setVisibleEdit && setVisibleEdit(false);
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(editHomeworkError(response))
    );
};

export const deleteHomework = (
  id: string,
  index: number
): Effect => dispatch => {
  dispatch(deleteHomeworkRequest());

  return requestDeleteHomework(id)
    .then(({ data }: { data: { homework: IHomework } }) =>
      dispatch<any>(deleteHomeworkSuccess(index))
    )
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      dispatch(deleteHomeworkError(response))
    );
};
