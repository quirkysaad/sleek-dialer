// import { ScreenContent } from 'components/ScreenContent';
// import { StatusBar } from 'expo-status-bar';

import './global.css';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-orange-300">Welcome to Nativewind!</Text>
      </View>
    </>
  );
}
