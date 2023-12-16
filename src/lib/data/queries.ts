import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { fakeApi } from "./api";
import { IExercise, UpdateExercisePayload } from "../types";

export const queryClient = new QueryClient();

export const useExercises = () =>
  useQuery({
    queryKey: ["exercises"],
    queryFn: () => fakeApi.getExercises(),
    /* Ensures that once the data is fetched and archived,
     * it remains available for the lifetime of the app */
    staleTime: Infinity,
  });

const updateLocalExerciseList = (
  id: string,
  isDone: boolean,
  isNotSynced?: boolean,
) => {
  queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
    return exercisesList?.map((exercise) => {
      if (exercise.id === id) {
        return {
          ...exercise,
          isDone,
          isNotSynced,
        };
      }
      return exercise;
    });
  });
};

export const useUpdateExerciseStatus = () =>
  useMutation({
    mutationKey: ["exercises"],
    mutationFn: async (payload: UpdateExercisePayload) =>
      fakeApi.updateExerciseStatus(payload.id, payload.isDone),
    onMutate: async (payload: UpdateExercisePayload) => {
      // @ts-expect-error
      await queryClient.cancelQueries(["exercises"]);
      updateLocalExerciseList(payload.id, payload.isDone, true);
    },
    onSuccess(data) {
      updateLocalExerciseList(data.id, data.isDone, false);
    },
  });
