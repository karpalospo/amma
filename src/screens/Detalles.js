import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Header, Avatar, TextArea} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler';


const deco1 = require("../../assets/deco1.png")



const Detalles = ({navigation}) => {

    //react-native-star-rating
    const [comentario, setComentario] = useState("")
    const [opciones, setOpciones] = useState([
        {id: 1, label:"Alegre", selected: true},
        {id: 2, label:"Amigable", selected: false},
        {id: 3, label:"Proactiva", selected: false},
        {id: 4, label:"Puntual", selected: false},
        {id: 5, label:"Conversadora", selected: false},
    ])

    return (
        <SafeAreaView style={styles.main}>
            
            <Header theme="dark" label="Detalles" navigation={navigation} />
            <View style={{position:"absolute", width:"100%", height:160, zIndex:-1, backgroundColor:"#00A0BC"}}></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>

                <View style={{height:40}} />
                <View style={styles.rowCenter}>
                    <View style={_styles.image}>
                        <Image source={deco1} style={{width:"100%", height: 180, marginTop: -30}} resizeMode="contain" />
                        <Avatar />
                    </View>
                </View>
                <View style={{height:40}} />
                <Text style={_styles.title}>Liliana Martinez</Text>
                <Text style={_styles.p}>Servicio Hogar</Text>
                <View style={{height:20}} />
                
                <View style={styles.rowCenter}>
                    <View style={{width: 230}}>
                        <View style={styles.row}>
                            <Text style={_styles.title}>Solicitud #</Text>
                            <Text style={_styles.label}>1524075</Text>
                        </View>
                    </View>
                </View>

                <View style={{height:20}} />
                <View style={[styles.row, {paddingHorizontal:20}]}>
                    <View >
                        <Text style={_styles.label}>Fecha:</Text>
                        <Text style={_styles.text}>14/03/2022</Text>
                    </View>
                    <View >
                        <Text style={_styles.label}>Hora:</Text>
                        <Text style={_styles.text}>10: 30 am</Text>
                    </View>
                    <View >
                        <Text style={_styles.label}>Jornada:</Text>
                        <Text style={_styles.text}>Mañana</Text>
                    </View>
                </View>
     
                <View style={{height:30}} />
                <View style={[styles.rowCenter, {paddingHorizontal:20}]}>
   
                        <View style={styles.row}>
                            <Text style={_styles.label}>Dirección</Text>
                            <Text style={[_styles.text, {flex:1, paddingLeft:10}]}>Cra 46 # 68c - 13 Cerca a plaza de la paz</Text>
                        </View>
                   
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}

export default Detalles


const _styles = {
    title: {fontSize:26, color: "#00A0BC", textAlign: "center", fontFamily: "pp_regular"},
    p: {fontSize:15, color: "#6F757A", textAlign: "center", marginHorizontal: 20, marginVertical: 10, fontFamily: "pp_regular"},
    label: {fontSize:15, color: "#6F757A", fontFamily: "pp_bold"},
    text: {fontSize:15, color: "#6F757A", fontFamily: "pp_regular"},
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
    }
}

