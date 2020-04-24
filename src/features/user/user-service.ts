import { agent } from "api";
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
