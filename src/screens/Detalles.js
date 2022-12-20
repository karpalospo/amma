import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Header, Avatar, TextArea} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler';


const deco1 = require("../../assets/deco1.png")



const Detalles = ({navigation, route}) => {


    let {solicitud, jornadas} = route.params
    
    //react-native-star-rating
    const [comentario, setComentario] = useState("")
    const [opciones, setOpciones] = useState([
        {id: 1, label:"Alegre", selected: true},
        {id: 2, label:"Amigable", selected: false},
        {id: 3, label:"Proactiva", selected: false},
        {id: 4, label:"Puntual", selected: false},
        {id: 5, label:"Conversadora", selected: false},
    ])

    let jorindex = jornadas.findIndex(item => item.id == solicitud.idJor)

    return (
        <SafeAreaView style={styles.main}>
            
            <Header theme="dark" label="Detalles" navigation={navigation} />
            <View style={{position:"absolute", width:"100%", height:150, zIndex:-1, backgroundColor:"#00A0BC"}}></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>

                <View style={{height:10}} />
                <View style={styles.rowCenter}>
                    <View style={_styles.image}>
                        <Image source={deco1} style={{width:"100%", height: 180, marginTop: -30}} resizeMode="contain" />
                        <Avatar />
                    </View>
                </View>
                <View style={{height:40}} />
                <Text style={_styles.title}>{""}</Text>
                <Text style={[_styles.p, {marginVertical:0}]}>Servicio {solicitud.nomServ}</Text>
                <View style={{height:20}} />
                <View style={styles.rowCenter}>
                    <View style={{width: 230}}>
                        <View style={styles.rowCenter}>
                            <Text style={[_styles.title, {fontSize:19}]}>Solicitud #</Text>
                            <Text style={[_styles.label, {fontSize:19, marginLeft:10}]}>{solicitud.idSol}</Text>
                        </View>
                    </View>
                </View>

                <View style={[{paddingHorizontal:20}]}>
                    <View style={styles.row}>
                        <Text style={_styles.label}>Dirección</Text>
                        </View>
                    <Text style={_styles.text}>{solicitud.direction}</Text>
                </View>


                <View style={{height:20}} />
                {solicitud.programa.map((item, index) => 
                    <View key={index.toString()} style={[styles.row, {paddingHorizontal:20, paddingVertical: 5}]}>
                        <View >
                            <Text style={_styles.label}>Fecha:</Text>
                            <Text style={_styles.text}>{item.date}</Text>
                        </View>
                        <View >
                            <Text style={_styles.label}>Hora:</Text>
                            <Text style={_styles.text}>{jornadas[jorindex].jor}</Text>
                        </View>
                        <View >
                            <Text style={_styles.label}>Jornada:</Text>
                            <Text style={_styles.text}>{jornadas[jorindex].name}</Text>
                        </View>
                    </View>
                )}
     
                <View style={{height:40}} />
                <Button title="Calificar" onPress={() => navigation.navigate("Calificar", {solicitud, jornadas})} />

            </ScrollView>
        </SafeAreaView>
    )

}

export default Detalles


const _styles = {
    title: {fontSize:26, color: "#00A0BC", textAlign: "center", fontFamily: "pp_regular"},
    p: {fontSize:15, color: "#555", textAlign: "center", marginHorizontal: 20, marginVertical: 10, fontFamily: "pp_regular"},
    label: {fontSize:15, color: "#555", fontFamily: "pp_bold"},
    text: {fontSize:13, color: "#555", fontFamily: "pp_regular"},
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

