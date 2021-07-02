import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import firebase from "firebase/app";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  let isSignedIn = false;
  const signIn = async (email, password) => {
    if (register) {
      try {
        const userCreds = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        isSignedIn = true;
        setUser(userCreds.user);
      } catch (error) {
        console.log(error);
        switch (error.code) {
          case "auth/weak-password":
            console.log("password too weak");
          case "auth/email-already-in-use":
            console.log("email in use");
          case "auth/invalid-email":
            console.log("email not valid");
          case "auth/operation-not-allowed":
            console.log("operation not allowed");
        }
      }
    } else {
      try {
        console.log("here");
        await firebase.auth().signInWithEmailAndPassword(email, password);
        isSignedIn = true;
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            console.log("invalid email");
          case "auth/wrong-password":
            console.log("auth/wrong-password");
          case "auth/user-disabled":
            console.log("user is disabled");
          case "auth/user-not-found":
            console.log("user not found");
        }
      }
    }
    console.log(isSignedIn);
    if (isSignedIn) {
      console.log("signed in");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Home",
          },
        ],
      });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        placeholder="email"
        onChangeText={(e) => setEmail(e)}
        style={styles.inputField}
      />
      <TextInput
        value={password}
        placeholder="password"
        onChangeText={(e) => setPassword(e)}
        style={styles.inputField}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => signIn(email, password)}>
        <Text style={styles.signInText}>
          {register ? "Register" : "Sign in"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRegister(!register)}
        style={styles.login}
      >
        <Text style={styles.signInText}>
          {register ? "Log in instead" : "Register instead"}
        </Text>
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
  inputField: {
    alignSelf: "stretch",
    marginVertical: 20,
    marginHorizontal: 50,
    textAlign: "center",
    height: 30,
    borderWidth: 1,
  },
  login: {
    position: "absolute",
    bottom: 40,
  },
});
