import * as Google from "expo-google-app-auth";
import React from "react";
import { IOS_CLIENT_ID } from "@env";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export default function Login({ navigation }) {
  const signIn = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
      });
      if (type === "success") {
        console.log(user);
        navigation.navigate("Home", { user: user });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signIn()}>
        <Text style={styles.signInText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 30,
  },
});
