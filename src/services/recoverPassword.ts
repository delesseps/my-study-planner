import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const recoverPasswordRequestApi = (email: string): AxiosRequestConfig => ({
  url: "/recover/password",
  method: "post",
  data: {
    email
  }
});

const recoverPasswordRequest = (email: string): Promise<AxiosResponse> =>
  agent.request(recoverPasswordRequestApi(email));

export default recoverPasswordRequest;

const recoverPasswordTokenConfirmationApi = (
  token: string
): AxiosRequestConfig => ({
  url: "/recover/password_token_confirmation",
  method: "post",
  data: {
    token
  }
});

export const recoverPasswordTokenConfirmation = (
  token: string
): Promise<AxiosResponse> =>
  agent.request(recoverPasswordTokenConfirmationApi(token));

const changePasswordApi = (
  token: string,
  password: string
): AxiosRequestConfig => ({
  url: "/recover/change_password",
  method: "post",
  data: {
    password,
    token
  }
});

export const changePassword = (
  token: string,
  password: string
): Promise<AxiosResponse> => agent.request(changePasswordApi(token, password));
