import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import IEvaluation from "interfaces/IEvaluation";

const deleteApi = (id: string): AxiosRequestConfig => ({
  url: "/evaluation/delete",
  method: "delete",
  data: {
    _id: id
  }
});

export const requestDeleteEvaluation = (id: string): Promise<AxiosResponse> =>
  agent.request(deleteApi(id));

const editApi = (evaluation: IEvaluation): AxiosRequestConfig => ({
  url: "/evaluation/update",
  method: "patch",
  data: evaluation
});

export const requestEditEvaluation = (
  evaluation: IEvaluation
): Promise<AxiosResponse> => agent.request(editApi(evaluation));

const addApi = (evaluation: IEvaluation): AxiosRequestConfig => ({
  url: "/evaluation/add",
  method: "post",
  data: evaluation
});

const requestAddEvaluation = (
  evaluation: IEvaluation
): Promise<AxiosResponse> => agent.request(addApi(evaluation));

export default requestAddEvaluation;
