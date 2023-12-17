import { supabase } from "../supabase";
import { toCamelCase } from "../utils";

export const api = {
  /** Gets the User Profile object associated with the Auth User Id */
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", userId)
      .single();
    return data;
  },
  /** Gets all exercises belonging to the provided Auth User Id */
  getExercises: async (userId: string) => {
    const { data, error } = await supabase
      .from("exercise")
      .select("*")
      .eq("user_id", userId);
    return toCamelCase(data);
  },
  /** Updates a specific exercise's isDone property by id. Has RLS to only
   * allow users to update their own exercises */
  updateExerciseStatus: async (id: string, isDone: boolean) => {
    console.log(`/// about to updateExercise. id: ${id}. isDone: ${isDone}`);
    const { error, status } = await supabase
      .from("exercise")
      .update({ is_done: isDone })
      .eq("id", id);

    console.log(`/// updated exercise. status: ${status}`);

    // TODO: Handle error
    if (error) {
      throw error;
    }

    return status;
  },
  /** Updates the username of the provided userId, returning the updated UserProfile object */
  updateUsername: async (id: string, username: string) => {
    const { data, error } = await supabase
      .from("profile")
      .update({ username })
      .eq("user_id", id)
      .select();

    return toCamelCase(data);
  },
};
