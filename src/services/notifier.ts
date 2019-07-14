import { AxiosRequestConfig, AxiosResponse } from "axios";
import { agent } from "api";

const api = (registrationToken: string): AxiosRequestConfig => ({
  url: "/notifier/add-token",
  method: "post",
  data: {
    registrationToken
  }
});

const notifier = (registrationToken: string): Promise<AxiosResponse> =>
  agent.request(api(registrationToken));

export default notifier;
