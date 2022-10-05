import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Header, Avatar} from '../components'



const deco1 = require("../../assets/deco1.png")


const AgendarAsignacion = ({navigation}) => {

    return (
        <SafeAreaView style={styles.main}>
            
            <Header label="Agendar" navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>


                <Text style={_styles.title}>Solicitud Programada</Text>


                <View style={{height:60}} />
                <View style={styles.rowCenter}>
                    <View style={_styles.image}>
                        <Image source={deco1} style={{width:"100%", height: 250, marginTop: -65, marginLeft: -10}} resizeMode="contain" />
                        <Avatar />
                    </View>
                </View>
                <View style={{height:20}} />
                <Text style={_styles.title}>Liliana Martinez</Text>
                <Text style={_styles.p}>Pronto un representante de Amma se pondrá en contacto contigo por email o teléfono para verificar y aprobar tu solicitud.</Text>
                <View style={{height:20}} />
                <View style={styles.rowCenter}>
                    <View style={{width: 180}}>
                        <View style={styles.row}>
                            <Text style={_styles.label}>Edad</Text>
                            <Text style={_styles.text}>34 Años</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={_styles.label}>Ciudad</Text>
                            <Text style={_styles.text}>Barranquilla</Text>
                        </View>
                    </View>
                </View>

                <View style={{height:30}} />
                <Button title="Finalizar" onPress={() => navigation.navigate("Home")} />

            </ScrollView>
        </SafeAreaView>
    )

}

export default AgendarAsignacion


const _styles = {
    title: {fontSize:26, color: "#00A0BC", textAlign: "center", fontFamily: "pp_regular"},
    p: {fontSize:15, color: "#6F757A", textAlign: "center", marginHorizontal: 20, marginVertical: 10, fontFamily: "pp_regular"},
    label: {fontSize:15, color: "#6F757A", fontFamily: "pp_bold"},
    text: {fontSize:15, color: "#6F757A", fontFamily: "pp_regular"},
    image: {width: "100%", height:120, position: "relative"}
}

