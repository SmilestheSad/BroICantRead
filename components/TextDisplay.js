import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import * as Speech from "expo-speech";
export default function TextDisplay(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{props.foundText}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            props.cancelDisplay(true);
          }}
          style={styles.button}
        >
          <Icon name="back" type="antdesign" size="80" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Speech.speak(props.foundText);
          }}
        >
          <Icon name="multitrack-audio" size="80" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "10%",
  },
  icon: {
    padding: 20,
  },
  displayText: {
    fontSize: 20,
    borderRadius: 20,
    padding: 10,
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 2,
    overflow: "hidden",
  },
});
