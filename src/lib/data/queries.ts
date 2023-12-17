import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { api } from "./api";
import { IExercise, UpdateExercisePayload } from "../types";

import { useAuth } from "@/hooks/useAuth";

export const queryClient = new QueryClient();

export const useExercises = () => {
  const { user } = useAuth();
  return useQuery<IExercise[]>({
    queryKey: ["exercises"],
    queryFn: () => api.getExercises(user?.id as string),
    /* Ensures that once the data is fetched and archived,
     * it remains available for the lifetime of the app */
    staleTime: Infinity,
    enabled: !!user?.id,
  });
};

const updateLocalExerciseList = (
  id: string,
  isDone: boolean,
  isNotSynced?: boolean,
) => {
  // console.log(
  //   `/// in updateLocalExerciseList. isDone: ${isDone}. isNotSynced; ${isNotSynced}`,
  // );
  queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
    return exercisesList?.map((exercise) => {
      if (exercise.id === id) {
        // console.log(
        //   `/// in updateLocalExerciseList. newObj: ${JSON.stringify(
        //     {
        //       ...exercise,
        //       isDone,
        //       isNotSynced,
        //     },
        //     null,
        //     2,
        //   )}`,
        // );
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
      await api.updateExerciseStatus(payload.id, payload.isDone),
    onMutate: async (payload: UpdateExercisePayload) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      queryClient.cancelQueries({ queryKey: ["exercises"] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(["exercises"]);

      // Optimistically update to the new value
      updateLocalExerciseList(payload.id, payload.isDone, true);

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError(error, _, context) {
      queryClient.setQueryData(["exercises"], context?.previousData);
      console.error(error);
    },
    onSuccess(statusCode, variables) {
      updateLocalExerciseList(variables.id, variables.isDone, false);
      // queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
