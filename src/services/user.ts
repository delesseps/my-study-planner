import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUserConfig } from "constants/interfaces/IUser";

const userConfigApi = (config: IUserConfig): AxiosRequestConfig => ({
  url: "/user/config",
  method: "patch",
  data: {
    config,
  },
});

export const userConfigService = (
  config: IUserConfig
): Promise<AxiosResponse> => agent.request(userConfigApi(config));

const uploadProfilePictureApi = (image: string): AxiosRequestConfig => ({
  url: "/user/upload_profile_picture",
  method: "post",
  data: {
    image,
  },
});

export const uploadProfilePictureService = (
  image: string
): Promise<AxiosResponse> => agent.request(uploadProfilePictureApi(image));

const requestUserApi = (): AxiosRequestConfig => ({
  url: "/user/current",
  method: "get",
});

const requestUser = (): Promise<AxiosResponse> =>
  agent.request(requestUserApi());

export default requestUser;
