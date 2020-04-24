import { useMemo } from "react";
import { useMutation, queryCache } from "react-query";

import { useAuth } from "features/auth/auth-context";
import * as toDoService from "./toDo-service";
import IUser from "constants/interfaces/IUser";
import { message } from "antd";

export function useToDo() {
  const { user } = useAuth();

  const edit = useMutation(toDoService.edit, {
    onSuccess: (data, { index }) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newToDos = [...previous.toDos];
        newToDos[index] = data;

        return {
          ...previous,
          toDos: newToDos,
        };
      });

      message.success(data.done ? "Great Job!" : "Successfuly edited to-do!");
    },
  });

  const add = useMutation(toDoService.add, {
    onSuccess: (data) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newToDos = [...previous.toDos, data];

        return {
          ...previous,
          toDos: newToDos,
        };
      });

      message.success("Successfuly added to-do!");
    },
  });

  const remove = useMutation(toDoService.remove, {
    onSuccess: (data, { index }) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newToDos = [...previous.toDos];
        newToDos.splice(index, 1);

        return {
          ...previous,
          toDos: newToDos,
        };
      });

      message.success("Successfuly removed to-do!");
    },
  });

  const toDos = useMemo(() => user.toDos, [user.toDos]);

  return { toDos, edit, add, remove };
}
