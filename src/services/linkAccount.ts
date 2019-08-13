import { AxiosResponse, AxiosRequestConfig } from "axios";
import { agent } from "api";

const linkAccountGoogleTokenConfirmationApi = (
  token: string
): AxiosRequestConfig => ({
  url: "/link_account/confirm_token_google",
  method: "post",
  data: {
    token
  }
});

export const linkAccountGoogleTokenConfirmation = (
  token: string
): Promise<AxiosResponse> =>
  agent.request(linkAccountGoogleTokenConfirmationApi(token));

const linkAccountGoogleApi = (
  token: string,
  email: string
): AxiosRequestConfig => ({
  url: "/link_account/google",
  method: "post",
  data: {
    token,
    email
  }
});

export const linkAccountGoogle = (
  token: string,
  email: string
): Promise<AxiosResponse> => agent.request(linkAccountGoogleApi(token, email));
