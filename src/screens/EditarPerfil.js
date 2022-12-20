import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, Image, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Input, Select, Header} from '../components'
import { UtilitiesContext } from '../context/UtilitiesContext'
import { API } from '../global/services'

const itemsTipoDocumento = [
    {id:0, label:"Seleccione...", value:"Seleccione..."},
    {id:1, label:"Cedula Ciudadania", value:"1"},
    {id:2, label:"Pasaporte", value:"2"},
    {id:3, label:"Cedula Extranjería", value:"3"},
]

const EditarPerfil = ({navigation}) => {

    const { user, setUser} = useContext(UtilitiesContext)

    const [tipoDocumento, setTipoDocumento] = useState()
    const [numDocumento, setNumDocumento] = useState("")
    const [email, setEmail] = useState("")
    const [nombres, setNombres] = useState(user.names)
    const [apellidos, setApellidos] = useState(user.surnames)
    const [celular, setCelular] = useState("")
    const [password, setPassword] = useState("")
    const [fullData, setFullData] = useState(null)


    const getFullInfo = async () => {
        const res = await API.POST.getUserData(user.id)
        if(res.error) return
        setFullData(res.message.result)
        setCelular(res.message.result.mobile)
        setEmail(res.message.result.email)
        setTipoDocumento(parseInt(res.message.result.tipDoc))
        setNumDocumento(res.message.result.username)
        console.log(res.message.result)
    }

    useEffect(() => {
        if(fullData == null) getFullInfo()
    }, [fullData])


    const updateCuenta = async () => {

        if(!tipoDocumento) {
            return Alert.alert("Servicios AMMA", "Seleccione un tipo de documento")
        }


        let sendData =  {
            id: user.id,	
            tipDoc: tipoDocumento.value,	
            username: numDocumento,
            names: nombres.trim(),
            surnames: apellidos.trim(),
            email: email.trim(),
            mobile: celular.trim()
        }
        if(password != "") {
            sendData.password = password.trim()
        }

        let res = await API.POST.setUserData(sendData)
        console.log(res)
        if(res.error) {
            Alert.alert("Servicios Amma", "Sus datos se actualizaron satisfactoriamente.")
            //navigation.navigate("InicioSesion")
        } else {

        }
    }

    return (
        <SafeAreaView style={styles.main}>
            
            <Header theme="dark" label="Editar Perfil" navigation={navigation} />
            <View style={{position:"absolute", width:"100%", height:55, zIndex:-1, backgroundColor:"#00A0BC"}}></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, paddingTop:0, width:"100%"}}>
                <View style={{height:10}}></View>
                <Select img="tipodocumento" label="Tipo de documento" items={itemsTipoDocumento} onChange={value => setTipoDocumento(value)} value={tipoDocumento} />
                <Input img="numdocumento" label="Número de documento" type="decimal-pad" value={numDocumento} onChange={text => setNumDocumento(text)} />
                <Input img="email" label="Email" type="email-address" value={email} onChange={text => setEmail(text)} />
                <Input img="usuario" label="Nombres" value={nombres} onChange={text => setNombres(text)} />
                <Input img="usuario" label="Apellidos" value={apellidos} onChange={text => setApellidos(text)} />
                <Input img="celular" label="Número de Celular" type="phone-pad" value={celular} onChange={text => setCelular(text)} />
                <View style={{height:15}}></View>
                <Text style={_styles.textDark}>Si no desea cambiar su contraseña, Deje en blanco.</Text>
                <Input img="candado" label="Contraseña" value={password} onChange={text => setPassword(text)} secureTextEntry={true} />

                <View style={{height:30}}></View>
                <Button
                    onPress={() => updateCuenta()}
                    loading={false}
                    title="Actualizar Datos" 
                    textColor="white" 
                />
                
                <View style={{height:60}}></View>

            </ScrollView>
        </SafeAreaView>
    )

}

export default EditarPerfil

const _styles = {

    textDark: {
        backgroundColor: "#33AAAA", 
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        color:"white",
        borderRadius: 12,
        marginTop: 30,
        marginHorizontal: 5,
        fontFamily: "pp_regular",
        fontSize:14,
    }
   

}