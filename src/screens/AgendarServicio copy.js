import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, StyleSheet, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'

const left = require("../../assets/leftarrow.png")

const Agendar = (props) => {

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>
    
                <View style={_styles.headerCont}>
                    <TouchableOpacity style={{flexDirection:"row"}} onPress={() => props.navigation.navigate("Home")} >
                        <Image source={left} style={{height: 25, width: 25}} tintColor="#00A0BC" resizeMode="contain" />
                        <Text style={{color: "#00A0BC", fontSize:17, paddingLeft: 8, fontFamily:"pp_regular"}}>Agendar</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </SafeAreaView>
    )

}

export default Agendar

const _styles = StyleSheet.create({

    headerCont: {
        height:40,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: "#B8F4FF",
        justifyContent: "center"
    },


    
})