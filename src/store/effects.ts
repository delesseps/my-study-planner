import { ThunkAction } from "redux-thunk";
import { ApplicationState, ApplicationAction } from "./types";
import { signInRequest, signInSuccess, signInError } from "./actions";
import IUser from "interfaces/IUser";
import { signInService } from "services";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const signIn = (email: string, password: string): Effect => dispatch => {
  dispatch(signInRequest());

  return signInService(email, password)
    .then((user: IUser) => dispatch(signInSuccess(user)))
    .catch(() => dispatch(signInError()));
};
