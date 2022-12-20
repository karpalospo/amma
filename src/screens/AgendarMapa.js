import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Dimensions, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Room, Input, Select, TextArea, Button, Header} from '../components'

import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { API } from '../global/services';

const {width, height} = Dimensions.get('window')

const marker = require("../../assets/pin.png")
let data = {}

const AgendarMapa = ({navigation, route}) => {

    data = route.params.data;

    const [guardar, setGuardarChecked] = useState(false)
    const [rooms, setRooms] = useState(null)
    const [tamano, setTamano] = useState(null)
    const [espaciosGuardados, setEspaciosGuardados] = useState(null)
    const [tamanos, setTamanos] = useState(null)
    const [tipos, setTipos] = useState(null)
    const [tipo, setTipo] = useState(null)

    const [mapRegion, setMapRegion] = useState({
        latitude: 10.9838119,
        longitude: -74.8180175,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [ubicacion, setUbicacion] = useState("")
    const [nombre, setNombre] = useState("")
    const [otra, setOtra] = useState("")



    Geocoder.init("AIzaSyCSHufZP3SrsM_B5syDB6HugWbbgqDqLxE");

    const changePos = (value) => {
        
        setMapRegion(value)
        data.position = value.latitude + "," + value.longitude
        Geocoder.from(value.latitude, value.longitude).then(json => {
        	var addressComponent = json.results[0];
            var last = addressComponent.address_components[0].long_name
            var first = addressComponent.address_components[1].long_name
            var barrio = addressComponent.address_components[2].long_name
			setUbicacion(`${first} ${last} ${barrio}`)
     
		}).catch(error => console.warn(error));

    }
    
    useEffect(() => {
        (async () => {
        if(rooms == null) {
            const res = await API.GET.getEspacios()
            if(!res.error) setRooms(res.message.result)
        }})()
    }, [rooms])

    useEffect(() => {
        (async () => {
        if(tamanos == null) {
            const res = await API.GET.getTamanoPropiedad()
            if(!res.error) setTamanos(res.message.result)
        }})()
    }, [tamanos])

    useEffect(() => {
        (async () => {
        if(tipos == null) {
            const res = await API.GET.getTipos()
            if(!res.error) setTipos(res.message.result)
        }})()
    }, [tipos])

    useEffect(() => {
        (async () => {
        if(espaciosGuardados == null) {
            const res = await API.POST.getEspaciosGuardados(data.usuario_id)
            let r =  res.message.result.map(item => ({id: item.idLoc, label: item.name, value: item.idLoc, data: item}))
            r.unshift({id: 0, label: "Seleccione...", value: 0})
            if(!res.error) setEspaciosGuardados(r)
        }})()
    }, [espaciosGuardados])


    const setData = (key, id, value) => {
        if(!data[key]) data[key] = {}
        data[key][id] = value
    }

    const setEspacio = (data) => {
        console.log(rooms)
        console.log("espacio", data)

    }

    const next = () => {
        data.address = ubicacion		
        data.tamano = tamano.value
        data.tipo = tipo.value
        data.otra = otra
        if(guardar) data.espacioNombre = nombre
        navigation.navigate("AgendarRequerimientos", {data})
    }

    return (
        <SafeAreaView style={styles.main}>

            <Header label="Agendar" navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{width:"100%"}}>
                <View style={{position: "relative"}}>
                    <MapView 
                        style={_styles.map} 
                        initialRegion={mapRegion}
                        showsUserLocation={true}
                        onRegionChangeComplete={changePos}
                    />
                    <View style={{height:50, width:50, position:"absolute", left:width / 2 - 25, top:100 - 40, justifyContent:"center", alignItems:"center", zIndex:2}} >
                        <Image source={marker} style={{width:30}} resizeMode="contain" />
                    </View>
                </View>

                   
                <View style={{paddingHorizontal:20}}>

                    {espaciosGuardados && <Select img="corazon" label="Mis espacios guardados" items={espaciosGuardados} onChange={value => setEspacio(value)}  />}
                    <Input img="ubicacion" label="Ubicación" value={ubicacion} onChange={text => setUbicacion(text)} />
                    {tipos && <Select img="tipopropiedad" label="Tipo de propiedad" items={tipos.map(item => ({id: item.id, label: item.name, value: item.id}))} onChange={value => setTipo(value)} />}
                    {tamanos && <Select img="tamano" label="Tamaño de tu propiedad" items={tamanos.map(item => ({id: item.id, label: item.name, value: item.id}))} onChange={value => setTamano(value)} />}

                    <View style={{height:30}} />

                    <Text style={[styles.H1, {color: "#00A0BC", paddingLeft: 5}]}>Espacios</Text>

                    {rooms && rooms.map(item => <Room key={item.id} id={item.id} label={item.name} onChange={(id, value) => setData("room", id, value)} />)}
                   
                    <TextArea placeholder="Otra?, especifíquela" value={otra} onChange={text => setOtra(text)} />
                    
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
                                textContainerStyle={{ marginLeft: 8 }}
                                textStyle={{textDecorationLine: "none", fontSize:13 }}
                                onPress={value => setData("habitan", "ninos", value)}
                                text="Niños"
                            />
                        </View>
                        <View style={{flex: 0.5, flexDirection: "row"}}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#00A0BC"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "#00A0BC" }}
                                textContainerStyle={{ marginLeft: 8 }}
                                textStyle={{ textDecorationLine: "none", fontSize:13 }}
                                onPress={value => setData("habitan", "mascotas", value)}
                                text="Mascotas"
                            />
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
                                textContainerStyle={{ marginLeft: 8 }}
                                textStyle={{ textDecorationLine: "none", fontSize:13 }}
                                onPress={value => setData("habitan", "mayores", value)}
                                text="Adulto Mayor"
                            />
                        </View>
                        <View style={{flex: 0.5}}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#00A0BC"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "#00A0BC" }}
                                textContainerStyle={{ marginLeft: 8 }}
                                textStyle={{ textDecorationLine: "none", fontSize:13}}
                                onPress={value => setData("habitan", "especiales", value)}
                                text="Discapacitados"
                            />
                       
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
                    <Button title="Continuar" onPress={() => next()} />

                    <View style={{height:30}} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}

export default AgendarMapa

const _styles = {


    map: {
        height:220,
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
        color:"white",
        fontSize: 17,
        textAlign: "center"
    }

    
}