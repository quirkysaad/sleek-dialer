import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { CallLogsModule } from "../../modules/dialer-module";
import { CallLogProps, CallSectionProps, CallTypes } from "../../types";
import { groupCallsByDate } from "../../utils/general-utils";
import CallLog from "../../components/CallLog";

// This screen contains dialpad and logs
const Home = () => {
  const [callLogs, setCallLogs] = useState<Array<CallSectionProps>>();

  useEffect(() => {
    // Get the call logs
    (async () => {
      try {
        const granted = await CallLogsModule.requestCallLogPermission();

        if (granted) {
          const logs =
            (await CallLogsModule.getCallLogs()) as Array<CallLogProps>;

          const groupedCallLogs = groupCallsByDate(logs);
          setCallLogs(groupedCallLogs);

          console.log("Call Logs: ====", logs.slice(0, 5));
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
      {callLogs && callLogs.length > 0 ? (
        <SectionList
          className="bg-background px-2"
          sections={callLogs}
          renderItem={({ section, item, index }) => (
            <CallLog
              key={index}
              logItem={item}
              logIndex={index}
              isLastLogOfSection={index === section.data.length - 1}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View className="mx-5 mt-4 mb-2">
              <Text className="text-textMuted font-semibold text-lg">
                {section.title}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>Logs not found</Text>
      )}
    </View>
  );
};

export default Home;
