import { useMemo } from "react";
import { useMutation, queryCache } from "react-query";

import { useAuth } from "features/auth/auth-context";
import * as evaluationService from "./evaluation-service";
import IUser from "constants/interfaces/IUser";
import { message } from "antd";

export function useEvaluations() {
  const { user } = useAuth();

  const edit = useMutation(evaluationService.edit, {
    onSuccess: (data, { index }) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newEvaluations = [...previous.evaluations];
        newEvaluations[index] = data;

        return {
          ...previous,
          evaluations: newEvaluations,
        };
      });

      message.success(
        data.done ? "Great Job!" : "Successfuly edited evaluation!"
      );
    },
  });

  const add = useMutation(evaluationService.add, {
    onSuccess: (data) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newEvaluations = [...previous.evaluations, data];
        newEvaluations.sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return {
          ...previous,
          evaluations: newEvaluations,
        };
      });

      message.success("Successfuly added evaluation!");
    },
  });

  const remove = useMutation(evaluationService.remove, {
    onSuccess: (data, { index }) => {
      queryCache.setQueryData(["user"], (previous: IUser) => {
        const newEvaluations = [...previous.evaluations];
        newEvaluations.splice(index, 1);

        return {
          ...previous,
          evaluations: newEvaluations,
        };
      });

      message.success("Successfuly removed evaluation!");
    },
  });

  const evaluations = useMemo(() => user.evaluations, [user.evaluations]);

  return { evaluations, edit, add, remove };
}
