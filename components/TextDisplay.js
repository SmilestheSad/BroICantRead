import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"

export default function TextDisplay(props){
    return(
        <View style = {styles.container}> 
        <Text>Hi</Text>
            <TouchableOpacity
            onPress = {() => {
                props.cancelDisplay(true)
            }}
            style = {styles.button}
            >
                <Text>MY TEXT IS {props.foundText}</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white'
    }
})