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
  data: {
    name,
    email,
    password
  }
});

const signUp = (credentials: ISignUpCredentials): Promise<AxiosResponse> =>
  agent.request(api(credentials));

export default signUp;
