import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ISignInCredentials from "interfaces/ISignInCredentials";

const api = ({ email, password }: ISignInCredentials): AxiosRequestConfig => ({
  url: "/auth/signin",
  method: "post",
  withCredentials: true,
  data: {
    email,
    password
  }
});

const signIn = (credentials: ISignInCredentials): Promise<AxiosResponse> =>
  agent.request(api(credentials));

export default signIn;
