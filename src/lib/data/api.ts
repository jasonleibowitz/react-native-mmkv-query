import { supabase } from "../supabase";
import { IExercise } from "../types";

const exercises: IExercise[] = [
  {
    id: "1",
    title: "Push ups",
    isDone: true,
  },
  {
    id: "2",
    title: "Pull ups",
    isDone: false,
  },
  {
    id: "3",
    title: "Squats",
    isDone: false,
  },
  {
    id: "4",
    title: "Lunges",
    isDone: false,
  },
  {
    id: "5",
    title: "Bench press",
    isDone: false,
  },
];

export const api = {
  getExercises: async () => {
    const { data, error } = await supabase
      .from("exercises")
      .select(`id, title, isDone, isNotSynced, user_id`)
      .eq("user_id", 1);
    return data;
  },
  updateExerciseStatus: async (id: string, isDone: boolean) => {
    const { error, status } = await supabase
      .from("exercises")
      .update({ isDone })
      .eq("id", id);

    // TODO: Handle error
    if (error) {
      throw error;
    }

    return status;
  },
};
