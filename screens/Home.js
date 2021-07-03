import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { IOS_CLIENT_ID } from "@env";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
export default function Home({ navigation }) {
  const [user, loading] = useAuthState(firebase.auth());
  const signIn = () => {
    navigation.navigate("Login");
  };

  const logOut = async () => {
    try {
      console.log(accessToken);
      await Google.logOutAsync({
        accessToken: accessToken,
        clientId: IOS_CLIENT_ID,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Fread</Text>
        <Text style={styles.intro}>
          {/* Hello {user ? user.name.split(" ")[0] : ""}! */}
          Welcome!
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (user) {
            navigation.navigate("Camera", { user });
          }
        }}
      >
        {user ? (
          <Text style={styles.camText}> Go to Camera</Text>
        ) : (
          <Text style={{ color: "grey" }}>Login to access camera</Text>
        )}
      </TouchableOpacity>
      <View style={styles.logButton}>
        {user ? (
          <TouchableOpacity onPress={() => logOut()}>
            <Text>Log out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => signIn()}>
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
    textAlign: "center",
  },
  logButton: {
    position: "absolute",
    bottom: 40,
  },
  camText: {
    fontSize: 30,
    top: 30,
  },
  intro: {
    fontSize: 30,
    textAlign: "center",
  },
});
