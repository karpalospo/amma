import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, Image, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { API } from '../global/services'
import {Button, Input} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UtilitiesContext } from '../context/UtilitiesContext'
import { Ionicons } from '@expo/vector-icons'; 

const deco = require("../../assets/deco.png")

const OlvidoContrasena = ({navigation}) => {

    const [correo, setCorreo] = useState("")
    const [numero, setNumero] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [loading, setLoading] = useState(false)
    const [enviado, setEnviado] = useState(false)
    const [cambiar, setCambiar] = useState(false)

    const cambiarContra = async () => {

        Alert.alert("Servicios Amma", "Contraseña cambiada con éxito.")
        navigation.navigate("InicioSesion")
        
    }


    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />
            
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{position:"relative"}}>
                <Image source={deco} style={styles.background} resizeMode="cover" />
                <View style={{padding:25}}>
                    
                    <View style={{flexDirection: "row", alignItems:"center"}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("InicioSesion")} style={{paddingHorizontal:10, paddingVertical:15}}  >
                            <Ionicons name="arrow-back" size={28} color="#00A0BC" />
                        </TouchableOpacity>
                        <Text style={[styles.H1, {color: "#00A0BC", marginTop:5}]}>Olvidó su contraseña</Text>
                    </View>
                    <View style={{height:45}}></View>
                    
                    {!enviado && 
                    <View>
                        <Input 
                            img="email"
                            label="Correo electrónico" 
                            type="email-address" 
                            value={correo} 
                            onChange={text => setCorreo(text)} 
                            editable={!loading} 
                        />
                        <Text style={{padding:10, color:"#888"}}>A su correo le llegará un mensaje con 6 digitos de verificación. Revise todas las carpetas de su correo electrónico.</Text>
                        <View style={{height:40}}></View>
                        <Button
                            onPress={() => setEnviado(true)}
                            loading={loading}
                            title="Enviar" 
                            textColor="white" 
                        />
                    </View>
                    }
                    {enviado && !cambiar &&
                    <View>
                        <Input 
                            label="Su codigo de verificación fue enviado con exito a su correo electrónico" 
                            type="numeric" 
                            value={numero} 
                            onChange={text => setNumero(text)} 
                            editable={!loading} 
                            placeholder="Número de verificación"
                            max={6}
                        />

                        <Text style={{padding:10, color:"#888"}}>Introduzca los digitos de verificación para validar su identidad.</Text>
                        <View style={{height:40}}></View>
                        <Button
                            onPress={() => setCambiar(true)}
                            loading={loading}
                            title="Verificar" 
                            textColor="white" 
                        />
                    </View>
                    }

                    {enviado && cambiar &&
                    <View>
                        <Input label="Nueva Contraseña" value={password} onChange={text => setPassword(text)} secureTextEntry={true} editable={!loading}  />
                        <Input label="Repetir Contraseña" value={password2} onChange={text => setPassword2(text)} secureTextEntry={true} editable={!loading}  />
                        <View style={{height:40}}></View>
                        <Button
                            onPress={() => cambiarContra(true)}
                            loading={loading}
                            title="Cambiar Contraseña" 
                            textColor="white" 
                        />
                    </View>
                    }

                    

                </View>

            </ScrollView>
        </SafeAreaView>
    )

}

export default OlvidoContrasena