import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useUpdateUsername, useUserProfile } from "@/lib/data/queries";
import { supabase } from "@/lib/supabase";

export const Account = () => {
  const [username, setUsername] = useState("");
  const { session } = useAuth();
  const { data: userProfile } = useUserProfile(session?.user?.id);

  useEffect(() => {
    if (!username && !!userProfile?.username) {
      setUsername(userProfile.username);
    }
  }, [userProfile?.username]);

  const updateProfile = useUpdateUsername();

  if (!session || !session?.user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
        <Button
          title="Update Info"
          onPress={() =>
            updateProfile.mutate({ id: session?.user?.id, username })
          }
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
