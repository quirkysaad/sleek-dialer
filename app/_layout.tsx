import React from "react";
import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingTop: StatusBar.currentHeight || 0,
          backgroundColor: "#ddd",
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;
