import { agent } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import IEvaluation from "interfaces/IEvaluation";

const addApi = (evaluation: IEvaluation): AxiosRequestConfig => ({
  url: "/evaluation/add",
  method: "post",
  data: evaluation
});

const requestUser = (evaluation: IEvaluation): Promise<AxiosResponse> =>
  agent.request(addApi(evaluation));

export default requestUser;
