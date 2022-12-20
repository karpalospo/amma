import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Header, Avatar, TouchItem} from '../components'
import { UtilitiesContext } from '../context/UtilitiesContext'

const deco1 = require("../../assets/deco1.png")
const usuario = require("../../assets/icon_user.png")
const bandera = require("../../assets/icon_bandera.png")
const cerrar = require("../../assets/icon_cerrar.png")

const Perfil = ({navigation}) => {

    const { user, setUser } = useContext(UtilitiesContext)

    return (
        <SafeAreaView style={styles.main}>
            
            <Header theme="dark" label="Editar Perfil" navigation={navigation} />
            <View style={{position:"absolute", width:"100%", height:160, zIndex:-1, backgroundColor:"#00A0BC"}}></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, paddingTop:0, width:"100%"}}>

                <View style={{height:40}} />
                <View style={styles.rowCenter}>
                    <View style={_styles.image}>
                        <Image source={deco1} style={{width:"100%", height: 180, marginTop: -30}} resizeMode="contain" />
                        <Avatar photo="hombre" />
                    </View>
                </View>
                <View style={{height:40}} />
                <Text style={_styles.title}>{user.names + " " + user.surnames}</Text>

                <TouchItem
                    titulo="Info"
                    image={usuario}
                    text="Mantén actualizados tus datos de contacto para mejor atención."
                    onPress={() => navigation.navigate("EditarPerfil")}
                />

                <TouchItem
                    titulo="Caracterización"
                    image={bandera}
                    text=" Permitenos conocerte mejor para asignarte al personal ideal."
                    onPress={() => navigation.navigate("Caracterizacion")}
                />

                <TouchItem
                    titulo="Cerrar Sesión"
                    image={cerrar}
                    text="Esperamos que sea un solo hasta pronto."
                    onPress={() => setUser({})}
                />

            </ScrollView>
        </SafeAreaView>
    )

}

export default Perfil


const _styles = {
    title: {fontSize:26, color: "#00A0BC", textAlign: "center", fontFamily: "pp_regular"},
    p: {fontSize:17, color: "#6F757A", textAlign: "center", marginHorizontal: 20, fontFamily: "pp_regular"},
    label: {fontSize:15, color: "#6F757A", fontFamily: "pp_bold"},

    image: {width: "100%", height:120, position: "relative"},

    itemButton:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor: "#B8F4FF",
        margin: 6,
        borderRadius: 15
    },
    itemText:{
        color: "#00A0BC",
        fontFamily: "pp_bold"
    },
   
}

