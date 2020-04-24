import { AxiosResponse, AxiosRequestConfig } from "axios";

import { agent } from "api";
import IUser from "constants/interfaces/IUser";
import ISignInCredentials from "constants/interfaces/ISignInCredentials";
import ISignUpCredentials from "constants/interfaces/ISignUpCredentials";

export function getUser(): Promise<AxiosResponse<IUser>> {
  const options: AxiosRequestConfig = {
    url: "/user/current",
    method: "get",
  };

  return agent.request(options).then(({ data }) => data.user);
}

export function login({
  email,
  password,
  remember,
}: ISignInCredentials): Promise<AxiosResponse<IUser>> {
  const options: AxiosRequestConfig = {
    url: "/auth/signin",
    method: "post",
    data: {
      email,
      password,
      remember,
    },
  };

  return agent.request(options).then(({ data }) => data.user);
}

export function logout(): Promise<AxiosResponse> {
  const options: AxiosRequestConfig = {
    url: "/user/signout",
    method: "get",
  };

  return agent.request(options);
}

export function register({
  name,
  email,
  password,
}: ISignUpCredentials): Promise<AxiosResponse<IUser>> {
  const options: AxiosRequestConfig = {
    url: "/auth/signup",
    method: "post",
    data: {
      name,
      email,
      password,
    },
  };

  return agent.request(options).then(({ data }) => data.user);
}
