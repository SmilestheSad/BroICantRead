import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import TextCapture from "./screens/TextCapture";
import LoadingScreen from "./screens/LoadingScreen";
import PastMessages from "./screens/PastMessages";
import Login from "./screens/Login";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import firebaseconfig from "./firebaseconfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseconfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={TextCapture} />
        <Stack.Screen name="PastMessages" component={PastMessages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
