import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const api = (): AxiosRequestConfig => ({
  url: "/user/signout",
  method: "get"
});

const signOut = (): Promise<AxiosResponse> => agent.request(api());

export default signOut;
