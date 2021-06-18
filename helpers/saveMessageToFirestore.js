import React, { useEffect } from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
export default async function saveMessageToFirestore(message) {
  const [user] = useAuthState(firebase.auth());
  const db = firebase.firestore();
  const messageCollection = db.collection("messages");
  await messageCollection.add({
    user: user.id,
    message: message,
  });
}
