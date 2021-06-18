import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import TextCapture from "./screens/TextCapture";
import LoadingScreen from "./screens/LoadingScreen";
import Login from "./screens/Login";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import firebaseconfig from "./firebaseconfig";

firebase.initializeApp(firebaseconfig);
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={TextCapture} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
