import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const api = (): AxiosRequestConfig => ({
  url: "/user/current",
  method: "get"
});

const requestUser = (): Promise<AxiosResponse> => agent.request(api());

export default requestUser;
