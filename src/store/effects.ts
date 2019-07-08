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
  deleteHomeworkError,
  uploadPictureRequest,
  uploadPictureSuccess,
  uploadPictureError,
  userConfigRequest,
  userConfigSuccess,
  userConfigError
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
  requestDeleteHomework,
  uploadProfilePictureService,
  userConfigService
} from "services";

import IUser from "interfaces/IUser";
import ISignInCredentials from "interfaces/ISignInCredentials";
import ISignUpCredentials from "interfaces/ISignUpCredentials";

import { Cookies } from "react-cookie";
import IAxiosErrorResponse from "interfaces/IAxiosErrorResponse";
import { AxiosResponse } from "axios";
import IEvaluation from "interfaces/IEvaluation";
import IHomework from "interfaces/IHomework";
import { message } from "antd";
import IUserConfig from "interfaces/IUserConfig";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

const noConnectionToServer = () =>
  message.error("Unable to connect to server. Please reload");

////////////
//  AUTH //
//////////
export const signIn = (credentials: ISignInCredentials): Effect => dispatch => {
  dispatch(signInRequest());

  return signInService(credentials)
    .then(({ data }: { data: { user: IUser } }) => {
      dispatch(signInSuccess(data.user));
      dispatch<any>(push("/dashboard"));
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      response ? dispatch(signInError(response)) : noConnectionToServer()
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
      response ? dispatch(signUpError(response)) : noConnectionToServer()
    );
};

export const signOut = (): Effect => dispatch => {
  const cookies = new Cookies();
  dispatch(signOutRequest());

  return signOutService()
    .then((response: AxiosResponse) => {
      cookies.remove("IS_LOGGED_IN", {path: '/'});
      dispatch(signOutSuccess());
      dispatch<any>(push("/signin"));      
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      response ? dispatch(signOutError(response)) : noConnectionToServer()
    );
};

////////////
//  USER //
///////////

export const requestUser = (): Effect => dispatch => {
  dispatch(requestUserPending());

  return requestUserService()
    .then(({ data }: { data: { user: IUser } }) => {
      dispatch(requestUserSuccess(data.user));
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      response ? dispatch(requestUserError(response)) : noConnectionToServer()
    );
};

export const uploadProfilePicture = (image: string): Effect => dispatch => {
  dispatch(uploadPictureRequest());

  return uploadProfilePictureService(image)
    .then(({ data }: { data: { imageUrl: string } }) => {
      dispatch(uploadPictureSuccess(data.imageUrl));
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      response ? dispatch(uploadPictureError(response)) : noConnectionToServer()
    );
};

export const updateUserConfig = (config: IUserConfig): Effect => dispatch => {
  dispatch(userConfigRequest());

  return userConfigService(config)
    .then(({ data }: { data: { config: IUserConfig } }) => {
      dispatch(userConfigSuccess(data.config));
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      response ? dispatch(userConfigError(response)) : noConnectionToServer()
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
      response ? dispatch(addEvaluationError(response)) : noConnectionToServer()
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
      setVisibleEdit && setVisibleEdit(false);
      dispatch<any>(editEvaluationSuccess(data.evaluation, index));      
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      response
        ? dispatch(editEvaluationError(response))
        : noConnectionToServer()
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
      response
        ? dispatch(deleteEvaluationError(response))
        : noConnectionToServer()
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
      response ? dispatch(addHomeworkError(response)) : noConnectionToServer()
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
      setVisibleEdit && setVisibleEdit(false);
      dispatch<any>(editHomeworkSuccess(data.homework, index));      
    })
    .catch(({ response }: { response: IAxiosErrorResponse }) =>
      response ? dispatch(editHomeworkError(response)) : noConnectionToServer()
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
      response
        ? dispatch(deleteHomeworkError(response))
        : noConnectionToServer()
    );
};
