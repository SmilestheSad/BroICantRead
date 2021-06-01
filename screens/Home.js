import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
export default function Home({ route, navigation }) {
  const [user, setUser] = useState();
  const [userExist, setUserExist] = useState(false);

  useEffect(() => {
    console.log("HELLO");
    const { user } = route.params;
    if (user) {
      setUserExist(true);
    }
  }, []);

  const signIn = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Read Assist</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (userExist) {
            navigation.navigate("Camera");
          }
        }}
      >
        {userExist ? (
          <Text style={styles.camText}> Go to Camera</Text>
        ) : (
          <Text style={{ color: "grey" }}>Login to access camera</Text>
        )}
      </TouchableOpacity>
      <View style={styles.logButton}>
        {userExist ? (
          <TouchableOpacity>
            <Text>Log out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onClick={() => signIn()}>
            <Text>Log in</Text>
          </TouchableOpacity>
        )}
      </View>
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
  logButton: {
    position: "absolute",
    bottom: 40,
  },
  camText: {
    fontSize: 30,
    top: 30,
  },
});
