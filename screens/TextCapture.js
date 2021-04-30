import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Camera} from 'expo-camera';

export default function TextCapure(){
    const [permission, setPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back)
    useEffect(() => {
        Camera.requestPermissionsAsync()
        .then(({status}) => {
            setPermission(status === 'granted');
            if (permission == true){
                console.log('permission is granted')
            } else {
                console.log('perish')
            }
        })
    }, []);
    
    if (permission === null){
        return <View/>
    }
    if (permission === false){
        return <Text>Permission has been denied >:(</Text>
    } 
    return(
    <Text>Hello World</Text>
    )
}