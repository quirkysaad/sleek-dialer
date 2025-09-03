import React, { useRef } from "react";
import { View, Text, Alert } from "react-native";
import MaterialIcons, {
  MaterialIconsIconName,
} from "@react-native-vector-icons/material-icons";
import ReanimatedSwipeable, {
  SwipeableMethods,
  SwipeableRef,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { cn } from "../utils/tailwind-utils";
import { CallSectionProps, CallTypes } from "../types";

interface CallLogItemProps {
  logIndex: number;
  isLastLogOfSection: boolean;
  logItem: CallSectionProps["data"][number];
}

type ActionProps = {
  direction: "right" | "left";
} & Omit<CallLogItemProps, "logItem">;

const CallLog = ({
  logItem,
  logIndex,
  isLastLogOfSection,
}: CallLogItemProps) => {
  const IconMap: Record<
    Exclude<CallTypes, "UNKNOWN">,
    { iconName: MaterialIconsIconName; color?: string }
  > = {
    INCOMING: {
      iconName: "phone-callback",
      color: "#4CAF50",
    },
    OUTGOING: { iconName: "phone", color: "#2196F3" },
    MISSED: { iconName: "phone-missed", color: "#F44336" },
    REJECTED: { iconName: "phone-missed", color: "#F44336" },
  };

  const swipeRef = useRef<SwipeableMethods>(null);

  return (
    <ReanimatedSwipeable
      ref={swipeRef}
      dragOffsetFromLeftEdge={30}
      leftThreshold={120}
      renderLeftActions={() => (
        <ActionWrapper
          direction="left"
          logIndex={logIndex}
          isLastLogOfSection={isLastLogOfSection}
        />
      )}
      dragOffsetFromRightEdge={30}
      rightThreshold={120}
      renderRightActions={() => (
        <ActionWrapper
          direction="right"
          logIndex={logIndex}
          isLastLogOfSection={isLastLogOfSection}
        />
      )}
      onSwipeableOpen={(direction) => {
        Alert.alert(
          direction === "left"
            ? "Right Action triggered"
            : "Left Action triggered"
        );
        swipeRef.current?.close();
      }}
      containerStyle={{ overflow: "hidden" }}
    >
      <View
        className={cn(
          "flex flex-row items-center bg-white",
          "px-4 mx-2",
          "border-b border-gray-200",
          logIndex === 0 && "rounded-t-3xl",
          isLastLogOfSection && "rounded-b-3xl border-b-0"
        )}
      >
        <MaterialIcons
          name={IconMap[logItem.type as keyof typeof IconMap].iconName}
          color={IconMap[logItem.type as keyof typeof IconMap].color}
          size={20}
        />
        <Text className="text-lg p-4">{logItem.name || logItem.number}</Text>
      </View>
    </ReanimatedSwipeable>
  );
};

const ActionWrapper = ({
  direction,
  logIndex,
  isLastLogOfSection,
}: ActionProps) => {
  const component = direction === "right" ? <RightAction /> : <LeftAction />;
  return (
    <Reanimated.View
      className={cn(
        "px-2 w-full overflow-hidden",
        logIndex === 0 && "rounded-t-[36px]",
        isLastLogOfSection && "rounded-b-[36px]"
      )}
    >
      {component}
    </Reanimated.View>
  );
};

const RightAction = () => {
  return (
    <View className="flex flex-row justify-end items-center gap-2 w-full h-full bg-blue px-4">
      <Text className="text-xl text-white">Message</Text>
      <MaterialIcons name="message" size={20} color="white" />
    </View>
  );
};

const LeftAction = () => {
  return (
    <View className="flex flex-row items-center gap-2 w-full h-full bg-green px-4">
      <MaterialIcons name="call" size={20} color="white" />
      <Text className="text-xl text-white">Call</Text>
    </View>
  );
};

export default CallLog;
