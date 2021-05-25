import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Bro I cant Read</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("testing");
          navigation.navigate("Camera");
        }}
      >
        <Text style={{ fontSize: 30, top: 30 }}> Go to Camera</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <View style={styles.footer}>
        <Text>Created by Victor Zheng</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
  },
});
