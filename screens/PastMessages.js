import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Message from "../components/Message";
import firebase from "firebase/app";
export default function PastMessages({ route }) {
  const [loading, setLoading] = useState(true);
  const messages = useRef([]);
  const { user } = route.params;
  const renderItem = ({ item }) => {
    return <Message message={item.message} time={item.time} />;
  };
  useEffect(() => {
    const db = firebase.firestore();
    const temp = [];
    let index = 1;
    db.collection("messages")
      .where("user", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const seconds = doc.data().time.seconds;
          var time = new Date(0); // The 0 there is the key, which sets the date to the epoch
          time.setUTCSeconds(seconds);
          temp.push({
            id: index,
            message: doc.data().message,
            time: time.toString(),
          });
          index++;
        });
        messages.current = temp;
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Text>Loading Users</Text>
  ) : (
    <View>
      <FlatList
        data={messages.current}
        // renderItem={displayMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
