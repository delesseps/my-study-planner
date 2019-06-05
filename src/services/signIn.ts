import agent from "api";
import IUser from "interfaces/IUser";
import { AxiosRequestConfig, AxiosPromise } from "axios";

const api = (email: string, password: string): AxiosRequestConfig => ({
  url: "/signin",
  method: "post",
  data: {
    email,
    password
  }
});

const signIn = (email: string, password: string): Promise<IUser> =>
  agent.request(api(email, password));

export default signIn;
