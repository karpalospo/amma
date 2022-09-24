import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Dimensions } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Room, Input, Select, TextArea, Button, Header} from '../components'

import MapView, {Marker} from 'react-native-maps';

import BouncyCheckbox from "react-native-bouncy-checkbox";


const {width, height} = Dimensions.get('window')


const itemsEspacios = [
    {id:0, label:"Seleccione...", value:"Seleccione..."},
    {id:1, label:"Javi", value:1},
    {id:2, label:"Wilson", value:2},
    {id:3, label:"Carlos", value:3},
    {id:4, label:"Moises", value:4},
]


const itemsTipos = [
    {id:0, label:"Seleccione...", value:"Seleccione..."},
    {id:1, label:"Casa", value:1},
    {id:2, label:"Apartamento", value:2},
    {id:3, label:"Bodega", value:3},
    {id:4, label:"Local", value:4},
]

const itemsTamano = [
    {id:0, label:"Seleccione...", value:"Seleccione..."},
    {id:1, label:"Muy pequeño (25 a 45 mts2)", value:1},
    {id:2, label:"Pequeño (46 a 99 mts2)", value:2},
    {id:3, label:"Mediano (100 a 199 mts2)", value:3},
    {id:4, label:"Grande (mas de 200 mts2)", value:4},
]


const AgendarMapa = ({navigation}) => {

    const [checked, setChecked] = useState(false)
    const [guardar, setGuardarChecked] = useState(false)

    const [mapRegion, setMapRegion] = useState({
        latitude: 10.795556,
        longitude: -74.919444,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [ubicacion, setUbicacion] = useState("")
    const [nombre, setNombre] = useState("")

    const changePos = (value) => {
        
        setMapRegion(value)

        /*Geocoder.from(value.latitude, value.longitude).then(json => {
        	var addressComponent = json.results[0];
            var last = addressComponent.address_components[0].long_name
            var first = addressComponent.address_components[1].long_name
            var barrio = addressComponent.address_components[2].long_name
			setDireccion(`${first} ${last} ${barrio}`)
            if(opener == 1) setState({dir1:`${first} ${last} ${barrio}`})
            else if(opener == 2) setState({dir2:`${first} ${last} ${barrio}`})
		}).catch(error => console.warn(error));*/

    }
    
    return (
        <SafeAreaView style={styles.main}>

            <Header label="Agendar" navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{width:"100%"}}>

                <MapView 
                    style={_styles.map} 
                    initialRegion={mapRegion}
                    showsUserLocation={true}
                    onRegionChangeComplete={changePos}
                >

                </MapView>

                <Text style={_styles.textDark}>Por su primer servicio agendado reciba nuestr...</Text>
                    
                <View style={{padding:20}}>

                    <Select label="Mis espacios guardados" items={itemsEspacios} />
                    <Input label="Ubicación" value={ubicacion} onChange={text => setUbicacion(text)} />
                    <Select label="Tipo de propiedad" items={itemsTipos} />
                    <Select label="Tamaño de tu propiedad" items={itemsTamano} />

                    <View style={{height:30}} />

                    <Text style={[styles.H1, {color: "#00A0BC", paddingLeft: 5}]}>Espacios</Text>

                    <Room label="Habitaciones" />
                    <Room label="Cocinas" />
                    <Room label="Baños" />
                    <Room label="Comedores" />
                    <Room label="Salas" />
                    <Room label="Estudios" />
                    <Room label="Terrazas" />
                    
                    <TextArea placeholder="Otra?, especifíquela" value={ubicacion} onChange={text => setUbicacion(text)} />
                    
                    <View style={{height:40}} />
                    <Text style={[styles.H1, {color: "#00A0BC", paddingLeft: 5}]}>¿Quienes habitan la casa?</Text>

                    <View style={{height:20}} />
                    <View style={[styles.rowLeft, {paddingHorizontal:10}]}>
                        <View style={{flex: 0.5, flexDirection: "row"}}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#00A0BC"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "#00A0BC" }}
                                textStyle={{ fontFamily: "pp_light", fontSize: 13, textDecorationLine: "none" }}
                                onPress={isChecked => setChecked(isChecked)}
                            />
                            <Text style={_styles.label}>Niños</Text>
                        </View>
                        <View style={{flex: 0.5, flexDirection: "row"}}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#00A0BC"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "#00A0BC" }}
                                textStyle={{ textDecorationLine: "none" }}
                                onPress={isChecked => setChecked(isChecked)}
                            />
                            <Text style={_styles.label}>Mascotas</Text>
                        </View>
                    </View>
                    <View style={{height:20}} />
                    <View style={[styles.rowLeft, {paddingHorizontal:10}]}>
                        <View style={{flex: 0.5, flexDirection: "row"}}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#00A0BC"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "#00A0BC" }}
                                textStyle={{ textDecorationLine: "none" }}
                                onPress={isChecked => setChecked(isChecked)}
                            />
                            <Text style={_styles.label}>Mayores</Text>
                        </View>
                        <View style={{flex: 0.5, flexDirection: "row"}}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#00A0BC"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "#00A0BC" }}
                                textStyle={{ textDecorationLine: "none" }}
                                onPress={isChecked => setChecked(isChecked)}
                            />
                            <Text style={_styles.label}>Personas Especiales</Text>
                        </View>
                    </View>

                    <View style={{height:50}} />

                    <View style={{flexDirection: "row", paddingHorizontal:10}}>
                        <BouncyCheckbox
                            size={25}
                            fillColor="#00A0BC"
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderRadius: 4, borderColor: "#00A0BC" }}
                            textStyle={{ fontFamily: "pp_light", fontSize: 13, textDecorationLine: "none" }}
                            onPress={isChecked => setGuardarChecked(isChecked)}
                        />
                        <Text style={[_styles.label, {flex: 1}]}>Guardar este espacio para futuras solicitudes.</Text>
                    </View>
                    {guardar && <Input label="Nombre del espacio" value={nombre} onChange={text => setNombre(text)} />}
                    
                    <View style={{height:50}} />
                    <Button title="Continuar" onPress={() => navigation.navigate("AgendarRequerimientos")} />

                    <View style={{height:30}} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}

export default AgendarMapa

const _styles = {


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
        paddingHorizontal: 20, 
        color:"white"
    }

    
}