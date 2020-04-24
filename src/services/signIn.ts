import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ISignInCredentials from "constants/interfaces/ISignInCredentials";

const api = ({
  email,
  password,
  remember,
}: ISignInCredentials): AxiosRequestConfig => ({
  url: "/auth/signin",
  method: "post",
  data: {
    email,
    password,
    remember,
  },
});

const signIn = (credentials: ISignInCredentials): Promise<AxiosResponse> =>
  agent.request(api(credentials));

export default signIn;
