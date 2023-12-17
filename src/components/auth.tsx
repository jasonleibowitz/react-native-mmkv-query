import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View, Button, TextInput } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/data/api";
import { supabase, User } from "@/lib/supabase";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signIn } = useAuth();

  const signInWithEmail = async () => {
    setLoading(true);

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);

    signIn({ session: data.session, user: data.user });

    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);

    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification");
    signIn({ session, user });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.verticallySpaced}>
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          onPress={() => signInWithEmail()}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          onPress={() => signUpWithEmail()}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
