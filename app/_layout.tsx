import React from "react";
import "../global.css";
import { View, Text } from "react-native";
import { Slot } from "expo-router";

const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-blue-400">Header</Text>
      <Slot />
      <Text className="text-blue-400">Footer</Text>
    </View>
  );
};

export default RootLayout;
