import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, StyleSheet, Image, Dimensions, TextInput, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { Input, Select, TextArea, Button, Header} from '../components'
import moment from 'moment-business-days';
import { API } from '../global/services';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const {width, height} = Dimensions.get('window')

const itemsEspacios = [
    {id:0, label:"Seleccione...", value:0},
    {id:1, label:"Javi", value:1},
    {id:2, label:"Carlos", value:2},
    {id:3, label:"Wilson", value:3},
]

let data = {}

const AgendarRequerimientos = ({navigation, route}) => {

    data = route.params.data;
    if(!data.room) data.room = []


    const [guardar, setGuardarChecked] = useState(false)
    const [especificaciones, setEspecificaciones] = useState("")
    const [especiales, setEspeciales] = useState("")
    const [nombre, setNombre] = useState("")
    const [tipo_servicios, setTipo_servicios] = useState(null)
    const [tipoServ, setTipoServ] = useState(null)


    useEffect(() => {
        (async () => {
        if(tipo_servicios == null) {
            const res = await API.GET.getAlcanceServicio()
            if(!res.error) setTipo_servicios(res.message.result)
        }})()
    }, [tipo_servicios])

    const next = async () => {

        const res = await API.POST.setSolicitud(
            {
                "idTser": data.idTser, //Tipo de servicio ( hogar, oficina, )
                "idClas": data.idClas, //Clase  ( aseo, fumigacion, etc)
                "idAlc": tipoServ.value, //Alcance ( Aseo basico , ect )
                "idJor": data.jornada, //Jornada ( 1: mañana, 2: tarde, 3: completa )
                "idUsu": data.usuario_id, //Usuario del sistema
                "state": 0, 
                "location": data.address, // direccion 	
                "date": moment().format("YYYY-MM-DD"), // Fecha del documento 
                "coment": " ", // 
                "specs": especificaciones, // Especificaciones del servicio
                "orientation": especiales,	
                "geo": "1111111, 22222222",	// Geoposecionamiento 
                "programa": data.programa,  
                "propiedad": [
                    { 
                        "idUsu" : data.usuario_id,
                        "name": data?.espacioNombre || "NO", 
                        "direction" : data.address,		
                        "idSize" : data.tamano,
                        "tipo" : data.tipo,
                        "espacios": Object.keys(data.room).map(key => ({idSpace: key, space: data.room[key]})),
                        "others": data?.otros || " ",
                        "kids": data?.habitan?.ninos ? true : false,	
                        "seniors": data?.habitan?.mayores ? true : false,	
                        "pets": data?.habitan?.mascotas ? true : false,
                        "special": data?.habitan?.especiales ? true : false				 
                    }
                ]
            }
        )
        console.log(res)
        if(res.message.statusCode < 400) navigation.navigate("AgendarAsignacion")
        else {
            Alert.alert("Hubo un error al guardar la solicitud. Intente nuevamente")
        }
        
    }

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />
            <Header label="Agendar" navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{width:"100%"}}>

 
                <View style={{paddingHorizontal:20}}>

                    <Select img="corazon" label="Mis solicitudes guardadas" items={itemsEspacios} />
                    {tipo_servicios && <Select img="ubicacion" label="Tipo de Servicio" items={tipo_servicios.map(item => ({id: item.id, label: item.name, value: item.id}))}  onChange={value => setTipoServ(value)} />}
                    
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
                    <Button title="Solicitar" onPress={() => next()}/>

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
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        color:"white",
        borderRadius: 8,
        marginTop: 30,
        marginHorizontal: 5,
        fontFamily: "pp_regular",
        fontSize:14,
        borderColor: "#009AAB",
        borderWidth: 1
    }
 


    
})