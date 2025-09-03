import React from "react";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: StatusBar.currentHeight,
            backgroundColor: "#F1F1F1",
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
