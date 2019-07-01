import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const uploadProfilePictureApi = (image: string): AxiosRequestConfig => ({
  url: "/user/upload_profile_picture",
  method: "post",
  data: {
    image
  }
});

export const uploadProfilePictureService = (
  image: string
): Promise<AxiosResponse> => agent.request(uploadProfilePictureApi(image));

const requestUserApi = (): AxiosRequestConfig => ({
  url: "/user/current",
  method: "get"
});

const requestUser = (): Promise<AxiosResponse> =>
  agent.request(requestUserApi());

export default requestUser;
