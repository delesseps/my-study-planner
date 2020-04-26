import { agent } from "utils";
import { AxiosRequestConfig } from "axios";
import IEvaluation from "constants/interfaces/IEvaluation";

export function remove({
  id,
  index,
}: {
  id: string;
  index: number;
}): Promise<any> {
  const options: AxiosRequestConfig = {
    url: "/evaluation/delete",
    method: "delete",
    data: {
      _id: id,
    },
  };

  return agent.request(options);
}

export function edit({
  evaluation,
  index,
}: {
  evaluation: IEvaluation;
  index?: number;
}): Promise<IEvaluation> {
  const options: AxiosRequestConfig = {
    url: "/evaluation/update",
    method: "patch",
    data: evaluation,
  };

  return agent.request(options).then(({ data }) => data.evaluation);
}

export function add(evaluation: IEvaluation): Promise<IEvaluation> {
  const options: AxiosRequestConfig = {
    url: "/evaluation/add",
    method: "post",
    data: evaluation,
  };

  return agent.request(options).then(({ data }) => data.evaluation);
}
