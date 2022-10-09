import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, StyleSheet, Image, Dimensions, TextInput } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { Input, Select, TextArea, Button, Header} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'

import BouncyCheckbox from "react-native-bouncy-checkbox";


const {width, height} = Dimensions.get('window')

const itemsEspacios = [
    {id:0, label:"Seleccione...", value:"Seleccione..."},
    {id:1, label:"Javi", value:1},
    {id:2, label:"Carlos", value:2},
    {id:3, label:"Wilson", value:3},
]
const itemsServicios = [
    {id:0, label:"Seleccione...", value:"Seleccione..."},
    {id:1, label:"Aseo Básico", value:1},
    {id:2, label:"Planchado", value:2},
    {id:3, label:"Otro", value:3},
]

const AgendarRequerimientos = ({navigation}) => {

    const [guardar, setGuardarChecked] = useState(false)

    const [servicios, setServicios] = useState("")
    const [especificaciones, setEspecificaciones] = useState("")
    const [especiales, setEspeciales] = useState("")
    const [nombre, setNombre] = useState("")


    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />
            <Header label="Agendar" navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{width:"100%"}}>

 
                <View style={{paddingHorizontal:20}}>

                    <Select label="Mis solicitudes guardadas" items={itemsEspacios} />
                    <Select label="Tipo de Servicio" items={itemsServicios} />
                    
                    <View style={{height:10}} />

                    <Text style={_styles.textDark}>Escriba aquí las tareas y orientaciones que deses darle al personal de servicio.</Text>
                    <TextArea label="Especificaciones" value={especificaciones} onChange={text => setEspecificaciones(text)} />

                    <View style={{height:20}} />

                    <Text style={_styles.textDark}>Puede colocar las orientaciones para tareas que requieren un trato delicado.</Text>
                    <TextArea label="Orientaciones especial (delicado)" value={especiales} onChange={text => setEspeciales(text)} />

                    <View style={{height:30}} />
                    
                    <View style={{flexDirection: "row", paddingHorizontal:10}}>
                        <BouncyCheckbox
                            size={25}
                            fillColor="#00A0BC"
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderRadius: 4, borderColor: "#00A0BC" }}
                            textStyle={{ fontFamily: "pp_light", fontSize: 13, textDecorationLine: "none" }}
                            onPress={isChecked => setGuardarChecked(isChecked)}
                        />
                        <Text style={[_styles.label, {flex: 1}]}>Guardar esta informacion para futuras solicitudes.</Text>
                    </View>
                    {guardar && <Input placeholder='Nombre de solicitud' label="" value={nombre} onChange={text => setNombre(text)} />}
                    <View style={{height:50}} />
                    <Button title="Solicitar" onPress={() => navigation.navigate("AgendarAsignacion")}/>

                    <View style={{height:30}} />

                </View>

            </ScrollView>
        </SafeAreaView>
    )

}

export default AgendarRequerimientos

const _styles = StyleSheet.create({

    headerCont: {
        borderBottomWidth: 1,
        borderColor: "#B8F4FF",
        justifyContent: "center"
    },

    map: {
        height:300,
        width, 
        flex:1, 
        position:"relative", 
        zIndex:1
    },

    label: {
        color: "#6F757A",
        fontFamily: "pp_regular"
    },

    textDark: {
        backgroundColor: "#00A0BC", 
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        color:"white",
        borderRadius: 15,
        marginTop: 30,
        marginHorizontal: 5,
        fontFamily: "pp_regular"
    }
 


    
})