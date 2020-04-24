import { ThunkAction } from "redux-thunk";
import { ApplicationState, ApplicationAction } from "./types";
import { modalRequest, modalSuccess, modalError } from "./actions";

import { ModalService } from "services";

import IAxiosErrorResponse from "constants/interfaces/IAxiosErrorResponse";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

//////////////
//  Modals //
/////////////
export const welcomeModal = (): Effect => (dispatch) => {
  dispatch(modalRequest("welcome"));

  const modalService = new ModalService();

  return modalService
    .WelcomeModal()
    .then(() => dispatch<any>(modalSuccess("welcome")))
    .catch(
      ({ response }: { response: IAxiosErrorResponse }) =>
        response && dispatch(modalError(response))
    );
};
