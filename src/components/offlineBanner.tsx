import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const OfflineBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are offline!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    padding: 16,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
