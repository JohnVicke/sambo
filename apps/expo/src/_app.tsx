import "react-native-reanimated";

import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationSwitch } from "./navigation/auth-switch";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <TRPCProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <NavigationContainer>
          <AuthenticationSwitch />
          <StatusBar />
        </NavigationContainer>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};
