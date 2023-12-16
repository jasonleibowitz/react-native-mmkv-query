import NetInfo from "@react-native-community/netinfo";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { OfflineBanner } from "@/components/offlineBanner";
import { queryClient } from "@/lib/data/queries";
import { clientStorage } from "@/lib/mmkv";

const persister = createSyncStoragePersister({
  storage: clientStorage,
  throttleTime: 3000,
});

export default function Layout() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const status = !!state.isConnected;
      setIsOnline(status);
      onlineManager.setOnline(status);
    });
  });

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        {!isOnline && <OfflineBanner />}
        <StatusBar />
        <Tabs />
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}
