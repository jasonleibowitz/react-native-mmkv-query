import { View, Text, StyleSheet } from "react-native";

import { Exercise } from "@/components/exercise";
import { useExercises, useUpdateExerciseStatus } from "@/lib/data/queries";
import { IExercise } from "@/lib/types";

const ExercisesPage = () => {
  const updateExercise = useUpdateExerciseStatus();
  const { isLoading, data: exercises } = useExercises();

  const handleMarkExerciseAsDone = (exercise: IExercise) => {
    updateExercise.mutate({ id: exercise.id, isDone: !exercise.isDone });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Exercises</Text>
      {exercises?.map((exercise) => (
        <Exercise
          key={exercise.id}
          onButtonPress={() => handleMarkExerciseAsDone(exercise)}
          exercise={exercise}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  screenTitle: {
    fontSize: 32,
    marginBottom: 8,
    fontWeight: "bold",
  },
});

export default ExercisesPage;
