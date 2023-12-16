import Icon from "@expo/vector-icons/Fontisto";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { IExercise } from "@/lib/types";

type ExerciseProps = {
  exercise: IExercise;
  onButtonPress: () => void;
};
export const Exercise = ({ exercise, onButtonPress }: ExerciseProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onButtonPress}
        style={[
          styles.button,
          { backgroundColor: exercise.isDone ? "#4caf50" : "#e0e0e0" },
        ]}
      >
        <Icon
          name="check"
          color={exercise.isDone ? "#fff" : "#000"}
          size={25}
        />
      </TouchableOpacity>
      <Text style={styles.text}>
        {exercise.title} - {exercise?.isNotSynced ? "not synced" : "synced"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginTop: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
  },
});
