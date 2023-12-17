import NetInfo from "@react-native-community/netinfo";
import { Session } from "@supabase/supabase-js";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import Constants from "expo-constants";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

import config from "../../tamagui.config";

import { Account } from "@/components/account";
import { Auth } from "@/components/auth";
import { OfflineBanner } from "@/components/offlineBanner";
import { queryClient } from "@/lib/data/queries";
import { clientStorage } from "@/lib/mmkv";
import { supabase } from "@/lib/supabase";
import { AuthProvider } from "@/providers/AuthProvider";

const persister = createSyncStoragePersister({
  storage: clientStorage,
  throttleTime: 3000,
});

export default function Layout() {
  const [isOnline, setIsOnline] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const status = !!state.isConnected;
      setIsOnline(status);
      onlineManager.setOnline(status);
    });
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session && session.user) {
    return (
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
        onSuccess={() =>
          queryClient
            .resumePausedMutations()
            .then(() => queryClient.invalidateQueries())
        }
      >
        <TamaguiProvider config={config}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
              <SafeAreaView>
                {/* {!isOnline && <OfflineBanner />} */}
                <Account key={session.user.id} />
                <StatusBar />
              </SafeAreaView>
              <Tabs />
            </AuthProvider>
          </GestureHandlerRootView>
        </TamaguiProvider>
      </PersistQueryClientProvider>
    );
  } else {
    return (
      <AuthProvider>
        <SafeAreaView>
          <Text style={{ color: "black" }}>Not signed in</Text>
          <Auth />
        </SafeAreaView>
      </AuthProvider>
    );
  }
}
