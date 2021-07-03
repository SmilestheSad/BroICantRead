import React from "react";
import { Text } from "react-native";
import firebase from "firebase/app";
import Message from "../components/Message";
import { useAuthState } from "react-firebase-hooks/auth";
export default async function PastMessages() {
  const [user, loading] = useAuthState(firebase.auth());
  if (loading) {
    return <Text>Loading Users...</Text>;
  }
  return <Message />;
}
