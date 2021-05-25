import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Camera } from "expo-camera";
import { GOOGLE_API_KEY } from "@env";
import TextDisplay from "../components/TextDisplay";
import * as FileSystem from "expo-file-system";

export default function TextCapure() {
  const [permission, setPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const [textView, setTextView] = useState(false);
  const [foundText, setFoundText] = useState("");
  const camRef = useRef();
  useEffect(() => {
    Camera.requestPermissionsAsync()
      .then(({ status }) => {
        setPermission(status === "granted");
        if (permission == true) {
          console.log("permission is granted");
        } else {
          console.log("perish");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(`loading is ${loading}`);
  }, [loading]);

  const flipCam = () => {
    type === Camera.Constants.Type.back
      ? setType(Camera.Constants.Type.front)
      : setType(Camera.Constants.Type.back);
  };

  const takePic = async () => {
    if (camRef) {
      try {
        const pic = await camRef.current.takePictureAsync();
        const base64 = await FileSystem.readAsStringAsync(pic.uri, {
          encoding: "base64",
        });
        const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`;
        const body = JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {
                  type: "DOCUMENT_TEXT_DETECTION",
                },
              ],
            },
          ],
        });
        console.log("about to send");
        setLoading(true);
        let res = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        });

        const data = await res.json();
        setLoading(false);
        const text = data.responses[0].textAnnotations[0].description;
        console.log(text);
        setFoundText(text);
        setTextView(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("cam ref not defined");
    }
  };

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>Permission has been denied</Text>;
  }
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Processing your image..."}
        textStyle={styles.spinnerText}
        overlayColor="rgba(0,0,0,0.5)"
      />
      {!textView ? (
        <>
          <View style={styles.camera}>
            <Camera
              style={{ flex: "1" }}
              type={type}
              ref={(ref) => {
                camRef.current = ref;
                console.log("Camera ref is set");
              }}
            />
          </View>
          <View style={styles.pictureUI}>
            <View style={styles.takepic}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.phototake} onPress={takePic}>
                  Take photo
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.retake}>
              <TouchableOpacity style={styles.button} onPress={flipCam}>
                <Text style={styles.phototake}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <TextDisplay
          cancelDisplay={(cancel) => setTextView(!cancel)}
          foundText={foundText}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 4,
  },
  pictureUI: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "grey",
  },
  takepic: {
    backgroundColor: "#2c9ae8",
    position: "absolute",
    left: 0,
    width: "50%",
    height: "100%",
  },
  retake: {
    backgroundColor: "lightblue",
    position: "absolute",
    right: 0,
    width: "50%",
    height: "100%",
  },
  button: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  phototake: {
    fontSize: 20,
  },
  spinnerText: {
    color: "rgb(255,255,255)",
    fontSize: 20,
  },
});
