import type { Session } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Button, TextInput } from "react-native";

import { supabase } from "@/lib/supabase";

export const Account = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session");

      const { data, error, status } = await supabase
        .from("user")
        .select(`id, username, email, avatar_url`)
        // .eq("id", `${session?.user.id}`)
        .single();

      // console.log(
      //   `/// in getProfile. sessionUserId: ${session?.user
      //     .id}. data: ${JSON.stringify(data, null, 2)}`,
      // );

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({
    username,
    avatar_url,
  }: {
    username: string;
    avatar_url: string;
  }) => {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("users").upsert(updates);

      if (error) throw error;
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          placeholder="email@domain.com"
          value={session?.user?.email}
          editable={false}
          selectTextOnFocus={false}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <TextInput
          placeholder="username"
          value={username || ""}
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    borderColor: "red",
    borderWidth: 1,
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
