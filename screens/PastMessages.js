import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import firebase from "firebase/app";
export default function PastMessages({ route }) {
  const renderItem = ({ item }) => <Message message={item.message} />;
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const { user } = route.params;
  useEffect(() => {
    const db = firebase.firestore();
    const temp = [];
    db.collection("messages")
      .where("user", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          temp.push({
            id: doc.data().uid,
            message: doc.data().message,
          });
        });
      });
    setMessages(temp);
    setLoading(false);
    console.log(`MESSAGES ARE ${messages}`);
    console.log(`MESSAGES LENGTH IS ${messages.length}`);
  }, []);

  if (loading) {
    return <Text>Loading Users...</Text>;
  }
  return (
    <View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
