import { agent } from "api";
import { AxiosRequestConfig } from "axios";
import IToDo from "constants/interfaces/IToDo";

export function remove({
  id,
  index,
}: {
  id: string;
  index: number;
}): Promise<any> {
  const options: AxiosRequestConfig = {
    url: "/to-do/delete",
    method: "delete",
    data: {
      _id: id,
    },
  };

  return agent.request(options);
}

export function edit({
  toDo,
  index,
}: {
  toDo: IToDo;
  index: number;
}): Promise<IToDo> {
  const options: AxiosRequestConfig = {
    url: "/to-do/update",
    method: "patch",
    data: toDo,
  };

  return agent.request(options).then(({ data }) => data.toDo);
}

export function add(toDo: IToDo): Promise<IToDo> {
  const options: AxiosRequestConfig = {
    url: "/to-do/add",
    method: "post",
    data: toDo,
  };

  return agent.request(options).then(({ data }) => data.toDo);
}
