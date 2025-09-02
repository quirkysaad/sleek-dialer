import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { CallLogsModule } from "../../modules/dialer-module";
import { CallLog, CallSection } from "../../types";
import { groupCallsByDate } from "../../utils/general-utils";

// This screen contains dialpad and logs
const Home = () => {
  const [callLogs, setCallLogs] = useState<Array<CallSection>>();

  useEffect(() => {
    // Get the call logs
    (async () => {
      try {
        const granted = await CallLogsModule.requestCallLogPermission();

        if (granted) {
          const logs = (await CallLogsModule.getCallLogs()) as Array<CallLog>;

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
          className="bg-[#ddd]"
          sections={callLogs}
          renderItem={({ section, index }) => (
            // Need to change this
            <View className="bg-white rounded-lg p-4 m-2">
              {section.data.map((item) => (
                <View className="border-b border-gray-100 py-4" key={item.date}>
                  <Text>{item.name}</Text>
                </View>
              ))}
            </View>
          )}
          renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        />
      ) : (
        <Text>Logs not found</Text>
      )}
    </View>
  );
};

export default Home;
