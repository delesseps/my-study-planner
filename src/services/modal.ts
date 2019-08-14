import { AxiosRequestConfig, AxiosResponse } from "axios";
import { agent } from "api";

export default class ModalService {
  public WelcomeModal(): Promise<AxiosResponse> {
    const api: AxiosRequestConfig = {
      url: "/user/welcome",
      method: "post"
    };

    return agent.request(api);
  }
}
