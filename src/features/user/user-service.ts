import { agent } from "utils";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUserConfig } from "constants/interfaces/IUser";

export function changeConfig(config: IUserConfig): Promise<AxiosResponse<any>> {
  const options: AxiosRequestConfig = {
    url: "/user/config",
    method: "patch",
    data: {
      config,
    },
  };

  return agent.request(options);
}

export function uploadProfilePicture(
  image: string
): Promise<AxiosResponse<any>> {
  const options: AxiosRequestConfig = {
    url: "/user/upload_profile_picture",
    method: "post",
    data: {
      image,
    },
  };

  return agent.request(options);
}

export function closeWelcomeModal() {
  const api: AxiosRequestConfig = {
    url: "/user/welcome",
    method: "post",
  };

  return agent.request(api);
}
