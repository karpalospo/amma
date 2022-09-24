import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { UtilitiesContext } from '../context/UtilitiesContext'

const Blank = (props) => {

    const { user } = useContext(UtilitiesContext)

    async function init() {
        console.log(user)
        if(user.logged) props.navigation.navigate("Home")
        else props.navigation.navigate("Onboarding")
    }

    useEffect(() => {
        init()
    }, [user]);

    return (
        <SafeAreaView style={styles.main}>
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator color="#999" />
            </View>
        </SafeAreaView >
    )
}

export default Blank