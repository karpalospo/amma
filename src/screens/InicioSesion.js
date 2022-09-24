import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, Image, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { API } from '../global/services'
import {Button, Input} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UtilitiesContext } from '../context/UtilitiesContext'
import OlvidoContrasena from './OlvidoContrasena'


const deco = require("../../assets/deco.png")

const CrearCuenta = ({navigation}) => {

    const [numdoc, setNumDoc] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { setUser } = useContext(UtilitiesContext)

    const login = async () => {
        console.log(numdoc, password)

        if(numdoc.trim() == "" || password.trim() == "") return Alert.alert("Servicios Amma", "Debe llenar todos los campos")
        setLoading(true)
        const res = await API.POST.login(numdoc, password)
        setLoading(false)

        if(!res.error) {

            setUser({...res.message.user, logged: true})

        } else {
            Alert.alert("Servicios Amma", "Usuario y/o Contraseña no válidos")
        }
    }


    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />
            
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{position:"relative"}}>
                <Image source={deco} style={styles.background} resizeMode="cover" />
                <View style={{padding:25}}>
                    <Text style={[styles.H1, {color: "#00A0BC", paddingLeft: 15, marginTop:20}]}>Inicio de Sesión</Text>
                    <View style={{height:45}}></View>
                    
                    <Input label="Número de documento" type="numeric" value={numdoc} onChange={text => setNumDoc(text)} editable={!loading} />
                    <Input label="Contraseña" value={password} onChange={text => setPassword(text)} secureTextEntry={true} editable={!loading}  />

                    <View style={{height:20}}></View>
                    <TouchableOpacity onPress={() => navigation.navigate("OlvidoContrasena")} >
                        <Text style={{color: "#6F757A", fontFamily:"pp_medium", textAlign:"center", paddingLeft:8, textDecorationLine:"underline"}}>¿Olvidó su contraseña?</Text>
                    </TouchableOpacity>

                    <View style={{height:40}}></View>
                    <Button
                        onPress={() => login()}
                        loading={loading}
                        title="Ingresar" 
                        textColor="white" 
                    />

                    <View style={{height:30}}></View>
                    {!loading && <Button
                        style={{backgroundColor:"transparent"}}
                        onPress={() => navigation.navigate("CrearCuenta")}
                        title="Regístrate" 
                        textColor="#00A0BC" 
                    />}
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}

export default CrearCuenta