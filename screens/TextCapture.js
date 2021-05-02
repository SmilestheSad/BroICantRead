import React, { useState, useEffect, useRef} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";



export default function TextCapure() {
  const [permission, setPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ready, setReady] = useState(false);
  const camRef = useRef();
  useEffect(() => {
    Camera.requestPermissionsAsync().then(({ status }) => {
      setPermission(status === "granted");
      if (permission == true) {
        console.log("permission is granted");
      } else {
        console.log("perish");
      }
    });
  }, []);

  const flipCam = () => {
    type === Camera.Constants.Type.back 
    ? setType(Camera.Constants.Type.front)
    : setType(Camera.Constants.Type.back)
  }

  const takePic = async () => {
    if (camRef){
      const data = await camRef.current.takePictureAsync();
      console.log(data);
    }

  }

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>Permission has been denied</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        <Camera 
        style = {{flex: '1'}} 
        type = {type}
        ref = {ref => {
          camRef.current = ref;
          console.log('Camera ref is set')
        }}/>
      </View>
      <View style={styles.pictureUI}>
        
        <View style = {styles.takepic}>
        <TouchableOpacity style={styles.button}>
          <Text style = {styles.phototake} onPress = {takePic}>Take photo</Text>
        </TouchableOpacity> 
        </View>
        <View style = {styles.retake}>
        <TouchableOpacity style={styles.button} onPress = {flipCam}>
          <Text style = {styles.phototake}>Flip Camera</Text>
        </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#2c9ae8',
    position: 'absolute',
    left: 0,
    width: '50%',
    height: '100%'
  },
  retake: {
    backgroundColor: "lightblue",
    position: 'absolute',
    right: 0,
    width: '50%',
    height: '100%'
  },
  button: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center'
  },
  phototake: {
    fontSize: 20
  }
});
