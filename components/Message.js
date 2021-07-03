import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function Message({ message }) {
  return (
    <View style={styles.messageContainer}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: "#FFF",
    height: 50,
    borderColor: "#20232a",
    borderRadius: 2,
    borderWidth: 4,
    marginVertical: 8,
  },
});
