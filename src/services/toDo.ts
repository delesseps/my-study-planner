import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import IToDo from "constants/interfaces/IToDo";

const deleteApi = (id: string): AxiosRequestConfig => ({
  url: "/to-do/delete",
  method: "delete",
  data: {
    _id: id,
  },
});

export const requestDeleteToDo = (id: string): Promise<AxiosResponse> =>
  agent.request(deleteApi(id));

const editApi = (toDo: IToDo): AxiosRequestConfig => ({
  url: "/to-do/update",
  method: "patch",
  data: toDo,
});

export const requestEditToDo = (toDo: IToDo): Promise<AxiosResponse> =>
  agent.request(editApi(toDo));

const addApi = (toDo: IToDo): AxiosRequestConfig => ({
  url: "/to-do/add",
  method: "post",
  data: toDo,
});

const requestAddToDo = (toDo: IToDo): Promise<AxiosResponse> =>
  agent.request(addApi(toDo));

export default requestAddToDo;
