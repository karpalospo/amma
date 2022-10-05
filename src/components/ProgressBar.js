import React from 'react';
import {View, StyleSheet} from 'react-native';


export default ({progress = 0, bgcolor="white", color = "#EA5F5F"}) => {

    if(progress < 0) progress = 0;
    if(progress > 100) progress = 100;

    return (
        <View style={[styles.container, bgcolor ? {backgroundColor: bgcolor} : {}]} >
            <View style={[styles.bar, {width: `${progress}%`}, color ? {backgroundColor: color} : {}]}></View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        height:7,
        backgroundColor: "white",
        borderRadius:5
    },

    bar: {
        height:7,
        backgroundColor: "#EA5F5F",
        borderRadius:5
    }
    
})
