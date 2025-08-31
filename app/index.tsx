import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import DialerModule from "../modules/dialer-module/src/DialerModule";

const Home = () => {
  const [firstValue, setFirstValue] = useState("0");
  const [secondValue, setSecondValue] = useState("0");
  const [calculatedValue, setCalculatedValue] = useState(0);

  useEffect(() => {
    DialerModule.setValueAsync("This is async");
    DialerModule.addListener("onChange", (event) => {
      console.log("Event from native", event);
    });
    return () => {
      DialerModule.removeAllListeners("onChange");
    };
  }, []);

  const onCalculate = () => {
    const result = DialerModule.calculate(
      parseInt(firstValue),
      parseInt(secondValue)
    );
    setCalculatedValue(result);
  };

  return (
    <View>
      <TextInput
        value={firstValue}
        onChangeText={(value) => setFirstValue(value)}
      />
      <TextInput
        value={secondValue}
        onChangeText={(value) => setSecondValue(value)}
      />
      <Pressable onPress={onCalculate}>
        <Text>Calculate</Text>
      </Pressable>

      <Text>Calculated Value: {calculatedValue}</Text>
    </View>
  );
};

export default Home;
