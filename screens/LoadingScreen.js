import { View, ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import React, { useEffect } from "react";
export default function LoadingScreen({ navigation }) {
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        } else {
          console.log("redirected");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
      }),
    []
  );
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
}
