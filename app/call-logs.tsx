import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { CallLogsModule } from "../modules/dialer-module";

const CallLogs = () => {
  useEffect(() => {
    (async () => {
      try {
        const granted = await CallLogsModule.requestCallLogPermission();

        if (granted) {
          const logs = await CallLogsModule.getCallLogs();
          console.log("Call Logs: ====", logs[0]);
        } else {
          console.log("Permission denied by user");
        }
      } catch (e) {
        console.log("Error:", e);
      }
    })();
  }, []);

  return (
    <View>
      <Text>CallLogs</Text>
    </View>
  );
};

export default CallLogs;
