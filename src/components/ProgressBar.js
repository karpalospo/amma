import React from 'react';
import {View, StyleSheet} from 'react-native';

export default ({progress = 0}) => {

    if(progress < 0) progress = 0;
    if(progress > 100) progress = 100;

    return (
        <View style={styles.container}>
            <View style={[styles.bar, {width: `${progress}%`}]}></View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        height:7,
        backgroundColor: "#FFFFFF",
        borderRadius:5
    },

    bar: {
        height:7,
        backgroundColor: "#88BA23",
        borderRadius:5
    }
    
})
