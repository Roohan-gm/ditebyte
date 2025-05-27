import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "./global.css";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RefreshDataContext } from "./../context/RefreshDataContext";

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });
  const [user, setUser] = useState();
  const [refreshData, setRefreshData] = useState();

  return (
    <ConvexProvider client={convex}>
      <UserContext.Provider value={{ user, setUser }}>
        <RefreshDataContext.Provider value={{ refreshData, setRefreshData }}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#fff" },
                }}
              >
                <Stack.Screen name="index" />
              </Stack>
            </SafeAreaView>
          </SafeAreaProvider>
        </RefreshDataContext.Provider>
      </UserContext.Provider>
    </ConvexProvider>
  );
}
