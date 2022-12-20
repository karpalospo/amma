import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, Image, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Input, Select} from '../components'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { API } from '../global/services'

const itemsTipoDocumento = [
    {id:0, label:"Seleccione...", value:"Seleccione..."},
    {id:1, label:"Cedula Ciudadania", value:1},
    {id:2, label:"Pasaporte", value:2},
    {id:3, label:"Cedula Extranjería", value:3},
]

const deco = require("../../assets/deco2.png")

const CrearCuenta = ({navigation}) => {

    const [checked, setChecked] = useState(false)
    const [tipoDocumento, setTipoDocumento] = useState()
    const [numDocumento, setNumDocumento] = useState("")
    const [email, setEmail] = useState("")
    const [nombres, setNombres] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [celular, setCelular] = useState("")
    const [password, setPassword] = useState("")

    const crearCuenta = async () => {

        let res = await API.POST.signup({
            tipDoc: tipoDocumento.value.toString(),	
            username: numDocumento,
            names: nombres.trim(),
            surnames: apellidos.trim(),
            email: email.trim(),
            password: password.trim(),
            mobile: celular.trim()
        })

        if(res.error) {
            Alert.alert("Servicios Amma", "Su cuenta se ha creado satisfactoriamente.")
            navigation.navigate("InicioSesion")
        } else {

        }
    }

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />
            
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{position: "relative"}}>
                <Image source={deco} style={styles.background} resizeMode="cover" />
                <View style={{padding:25}} >
                    <Text style={[styles.H1, {color: "#00A0BC", paddingLeft: 15, marginTop:22}]}>Crear una cuenta</Text>
                    <View style={{height:15}}></View>
                    
                    <Select label="Tipo de documento" items={itemsTipoDocumento} onChange={value => setTipoDocumento(value)} />

                    <Input label="Número de documento" type="decimal-pad" value={numDocumento} onChange={text => setNumDocumento(text)} />
                    <Input label="Email" type="email-address" value={email} onChange={text => setEmail(text)} />
                    <Input label="Nombres" value={nombres} onChange={text => setNombres(text)} />
                    <Input label="Apellidos" value={apellidos} onChange={text => setApellidos(text)} />
                    <Input label="Número de Celular" type="phone-pad" value={celular} onChange={text => setCelular(text)} />
                    <Input label="Contraseña" value={password} onChange={text => setPassword(text)} secureTextEntry={true} />

                    <View style={{height:30}}></View>
                    <BouncyCheckbox
                        size={25}
                        fillColor="#00A0BC"
                        unfillColor="#FFFFFF"
                        text="Al acceder, aceptas las politicas de privacidad, terminos del servicio y tratamiento de datos personales."
                        iconStyle={{ borderRadius: 4, borderColor: "#00A0BC" }}
                        textStyle={{ fontFamily: "pp_light", fontSize: 13, textDecorationLine: "none" }}
                        onPress={isChecked => setChecked(isChecked)}
                    />

                    <View style={{height:30}}></View>
                    <Button
                        onPress={() => crearCuenta()}
                        loading={false}
                        title="Crear Una Cuenta" 
                        textColor="white" 
                    />
                    <View style={{height:30}}></View>
                    <Button
                        onPress={() => navigation.navigate("InicioSesion")}
                        loading={false}
                        title="Ya tengo Cuenta" 
                        textColor="#00A0BC"
                        style={{backgroundColor:"transparent"}} 
                    />
                    <View style={{height:40}}></View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}

export default CrearCuenta