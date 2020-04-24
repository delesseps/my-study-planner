import { useMemo } from "react";
import { useMutation, queryCache } from "react-query";

import { useAuth } from "features/auth/auth-context";
import * as homeworkService from "./homework-service";
import IUser from "constants/interfaces/IUser";
import { message } from "antd";

export function useHomework() {
  const { user } = useAuth();

  const edit = useMutation(homeworkService.edit, {
    onSuccess: (data, { index }) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newHomework = [...previous.homework];

        if (!index) {
          index = previous.homework.findIndex((elem) => data._id === elem._id);
        }

        newHomework[index] = data;

        return {
          ...previous,
          homework: newHomework,
        };
      });

      message.success(
        data.done ? "Great Job!" : "Successfuly edited homework!"
      );
    },
  });

  const add = useMutation(homeworkService.add, {
    onSuccess: (data) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newHomework = [...previous.homework, data];
        newHomework.sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return {
          ...previous,
          homework: newHomework,
        };
      });

      message.success("Successfuly added homework!");
    },
  });

  const remove = useMutation(homeworkService.remove, {
    onSuccess: (data, { index }) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newHomework = [...previous.homework];
        newHomework.splice(index, 1);

        return {
          ...previous,
          homework: newHomework,
        };
      });

      message.success("Successfuly removed homework!");
    },
  });

  const homework = useMemo(() => user.homework, [user.homework]);

  return { homework, edit, add, remove };
}
