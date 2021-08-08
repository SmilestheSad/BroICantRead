import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function Message({ message, time }) {
  return (
    <View style={styles.messageContainer}>
      <Text>Message: {message}</Text>
      <Text>Time Sent: {time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
  },
});
