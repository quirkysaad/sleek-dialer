import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as ContactsModule from "expo-contacts";

const Contacts = () => {
  useEffect(() => {
    (async () => {
      const { status } = await ContactsModule.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await ContactsModule.getContactsAsync({
          fields: [ContactsModule.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    })();
  }, []);

  return (
    <View>
      <Text>Contacts</Text>
    </View>
  );
};

export default Contacts;
