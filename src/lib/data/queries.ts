import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

import { api } from "./api";
import {
  IExercise,
  UpdateExercisePayload,
  UpdateUsernamePayload,
} from "../types";

import { useAuth } from "@/hooks/useAuth";

export const queryClient = new QueryClient();

export const useExercises = () => {
  const { session } = useAuth();
  return useQuery<IExercise[]>({
    queryKey: ["exercises"],
    queryFn: () => api.getExercises(session?.user?.id as string),
    /* Ensures that once the data is fetched and archived,
     * it remains available for the lifetime of the app */
    staleTime: Infinity,
    enabled: !!session?.user?.id,
  });
};

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

export const useUserProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => api.getUserProfile(userId as string),
    enabled: !!userId,
  });
};

export const useUpdateUsername = () => {
  return useMutation({
    mutationKey: ["updateUsername"],
    mutationFn: async (payload: UpdateUsernamePayload) =>
      await api.updateUsername(payload.id, payload.username),
  });
};
