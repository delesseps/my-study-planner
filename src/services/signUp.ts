import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ISignUpCredentials from "interfaces/ISignUpCredentials";

const api = ({
  name,
  email,
  password
}: ISignUpCredentials): AxiosRequestConfig => ({
  url: "/auth/signup",
  method: "post",
  withCredentials: true,
  data: {
    name,
    email,
    password
  }
});

const signIn = (credentials: ISignUpCredentials): Promise<AxiosResponse> =>
  agent.request(api(credentials));

export default signIn;
