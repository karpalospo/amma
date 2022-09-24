import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, StyleSheet, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Header} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'


const aseo = require("../../assets/aseo.png")
const fumigacion = require("../../assets/fumigacion.png")
const arreglos = require("../../assets/arreglos.png")

const Agendar = ({navigation}) => {

    return (
        <SafeAreaView style={styles.main}>
            <Header label="Agendar" navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>
    
                <Text style={{paddingVertical:35, color:"#00A0BC", fontSize: 17, paddingLeft:20}}>Elige el tipo de servicio que necesitas</Text>

                <TouchableOpacity onPress={() => navigation.navigate("AgendarHogar")} style={[styles.rowLeft, _styles.item]}>
                    <Image source={aseo} style={_styles.image} resizeMode="contain" />
                    <Text style={_styles.itemText}>ASEO</Text>
                </TouchableOpacity>
                <View style={{height:20}} />
                <TouchableOpacity style={[styles.rowLeft, _styles.item, {backgroundColor: "#00BCBC"}]}>
                    <Image source={fumigacion} style={_styles.image} resizeMode="contain" />
                    <Text style={_styles.itemText}>FUMIGACIÓN</Text>
                </TouchableOpacity>
                <View style={{height:20}} />
                <TouchableOpacity style={[styles.rowLeft, _styles.item, {backgroundColor: "#0056BC"}]}>
                    <Image source={arreglos} style={_styles.image} resizeMode="contain" />
                    <Text style={_styles.itemText}>ARREGLOS</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )

}

export default Agendar

const _styles = {
    item: {
        paddingLeft:20,
        backgroundColor: "#00A0BC",
        borderRadius: 10,
        paddingVertical:15
    },

    itemText: {
        color: "white", 
        fontSize:17, 
        paddingLeft: 17, 
        fontFamily:"pp_bold"
    },

    image: {
        height: 100, 
        width: 100,
        borderRadius: 51,
        borderWidth:2,
        borderColor: "white"
    }
}