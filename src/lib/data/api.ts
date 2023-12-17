import camelCase from "lodash.camelcase";
import { Alert } from "react-native";

import { supabase } from "../supabase";
import { IExercise } from "../types";
import { toCamelCase } from "../utils";

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
  getExercises: async (userId: string) => {
    const { data, error } = await supabase
      .from("exercise")
      .select("*")
      .eq("user_id", userId);
    return toCamelCase(data);
  },
  updateExerciseStatus: async (id: string, isDone: boolean) => {
    console.log(`/// about to update exercise. id: ${id}. isDone: ${isDone}`);
    const { error, status } = await supabase
      .from("exercise")
      .update({ is_done: isDone })
      .eq("id", id);
    // console.log(`/// updated. status: ${status}`);

    // TODO: Handle error
    if (error) {
      throw error;
    }

    return status;
  },
};
