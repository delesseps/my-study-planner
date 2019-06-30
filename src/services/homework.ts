import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import IHomework from "interfaces/IHomework";

const deleteApi = (id: string): AxiosRequestConfig => ({
  url: "/homework/delete",
  method: "delete",
  data: {
    _id: id
  }
});

export const requestDeleteHomework = (id: string): Promise<AxiosResponse> =>
  agent.request(deleteApi(id));

const editApi = (homework: IHomework): AxiosRequestConfig => ({
  url: "/homework/update",
  method: "patch",
  data: homework
});

export const requestEditHomework = (
  homework: IHomework
): Promise<AxiosResponse> => agent.request(editApi(homework));

const addApi = (homework: IHomework): AxiosRequestConfig => ({
  url: "/homework/add",
  method: "post",
  data: homework
});

const requestAddHomework = (homework: IHomework): Promise<AxiosResponse> =>
  agent.request(addApi(homework));

export default requestAddHomework;
