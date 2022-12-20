import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { TareasCard, Button, InfoCard, Avatar, Solicitud } from '../components'
import { useFocusEffect } from "@react-navigation/native";
import { UtilitiesContext } from '../context/UtilitiesContext'
import { API } from '../global/services';

const logo = require("../../assets/logo.png")
const Menuicon1 = require("../../assets/1.png")
const Menuicon2 = require("../../assets/2.png")
const Menuicon3 = require("../../assets/3.png")
const Menuicon4 = require("../../assets/4.png")
const agendamiento = require("../../assets/agendar.png")
const icon2 = require("../../assets/icon2.png")
const articulo1 = require("../../assets/articulo1.png")
const exclamacion = require("../../assets/exclamacion.png")
const cerrar = require("../../assets/cerrar.png")

const Home = ({navigation}) => {

    let pendiente;

    const [solicitud, setSolicitud] = useState({})
    const [showPendiente, setShowPendiente] = useState(true)
    const [caracterizacion, setShowCaracterizacion] = useState(false)
    const [showTareas, setShowTareas] = useState(true)
    const [jornadas, setJornadas] = useState(null)
    const [solicitudTareas, setSolicitudTareas] = useState([])
    const { user, tareas } = useContext(UtilitiesContext)


    const getLabores =  async (id) => {
        const res = await API.GET.getLabores(id || solicitud.idSol)
        if(!res.error) {
            setSolicitudTareas(res.message.result)
        }
    }

    const getJornadas = async () => {
        const res = await API.GET.getJornadas()
        if(!res.error && res.message.result.length > 0)
            setJornadas(res.message.result)
    }

    const getSolicitud = async () => {
        let res = await API.GET.MisSolicitudes(user.id)
        if(!res.error && res.message.result.length > 0) {
            setSolicitud(res.message.result[0])
            getLabores(res.message.result[0].idSol)
        }

        res = await API.GET.getPreguntasHechas(user.id)
        if(!res.error && res.message.result.length > 0) {

        } else setShowCaracterizacion(true)
 
    }

    useEffect(() => {
        getSolicitud()
    }, [user])

    useEffect(() => {
        if(jornadas == null) getJornadas()
    }, [jornadas])

    useFocusEffect(
        React.useCallback(() => {
            getSolicitud()
        }, [])
    )

    const agendar = () => {
        if(solicitud.state) {
            //return Alert.alert("Servicios AMMA", "Ya tiene una solicitud pendiente")
        }
        navigation.navigate("Agendar", {jornadas, user})
    }

    const guardarTarea = async (item) => {
        let res = await API.POST.setTarea(
            {
                "list": item.text,
                "idReq": solicitud.idSol,
                "value": 0,		
                "idUsu": user.id,
                "state": 0,
                "date": item.formatdate
            }
        )

        if(!res.error) {
            getLabores()
        } else {
            Alert.alert("Servicios AMMA", "Hubo un error al guardar la tarea")
        }
    }

    const clickTarea = async (item) => {
        const res = await API.POST.setLabor(item.id, item.completed ? 0 : 1)
        getLabores()
    }

    if(solicitud.state == 0) pendiente = true

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />
            
            <View style={[styles.row, {position: "absolute", width: 80, height: 60, backgroundColor:"#C7F0F9", borderTopLeftRadius: 15, borderTopRightRadius: 15, left:0, bottom:0, width:"100%", zIndex: 10, paddingHorizontal: 30}]}>
                <TouchableOpacity>
                    <Image source={Menuicon1} style={{height: 25, width: 35}} tintColor="#7EA8CA" resizeMode="contain" />
                    <Text style={_styles.buttonMenuLabel}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Historial", {jornadas})}>
                    <Image source={Menuicon2} style={{height: 25, width: 45}} tintColor="#7EA8CA" resizeMode="contain" />
                    <Text style={_styles.buttonMenuLabel}>Historial</Text>
                </TouchableOpacity>

                <View style={{width: 30}} />
                
                <View style={_styles.button}>
                    <TouchableOpacity onPress={() => agendar()} style={{padding:20}} >
                        <Image source={agendamiento} style={{height: 30, width: 30}} tintColor="#ffffff" resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Ayuda")}>
                    <Image source={Menuicon3} style={{height: 25, width: 35}} tintColor="#7EA8CA" resizeMode="contain" />
                    <Text style={_styles.buttonMenuLabel}>Ayuda</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
                    <Image source={Menuicon4} style={{height: 25, width: 35}} tintColor="#7EA8CA" resizeMode="contain" />
                    <Text style={_styles.buttonMenuLabel}>Perfil</Text>
                </TouchableOpacity>

            </View>

            <ScrollView>
                <View style={[styles.rowCenter, {paddingHorizontal: 15, paddingTop: 6}]}>
                    {/* <View /> */}
                    <Image source={logo} style={{height: 60, width: 100}} resizeMode="contain" />
                    {/*<View style={[styles.row, {width: 45}]}>
                        <View style={{width:40, height: 40, borderColor:"#00A0BC", borderWidth: 1, borderRadius: 31, alignItems:"center", justifyContent:"center"}}>
                            <Image source={icon2} style={{height: 20, width: 20}} tintColor="#00A0BC" resizeMode="contain" />
                        </View>
    </View>*/}
                </View>

                <View style={{paddingHorizontal:20, width:"100%"}}>
                    
                    {showPendiente && pendiente &&
                    <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"white", borderRadius: 30, elevation: 5, padding: 10, marginVertical: 10}}>
                        <Image source={exclamacion} style={{width: 25, height:25}} resizeMode="contain" />
                        <Text style={{paddingHorizontal: 7, color: "#6F757A", flex: 1}}>Tu solicitud está en espera de aprobación</Text>
                        {/*<TouchableOpacity activeOpacity={0.8} onPress={() => setShowPendiente(false)}><Image source={cerrar} style={{width: 25, height:25}} resizeMode="contain" /></TouchableOpacity>*/}
                    </View>
                    }

                    {Object.keys(solicitud).length > 0 && solicitud.state > 0 &&
                        <Solicitud solicitud={solicitud} jornadas={jornadas} navigation={navigation} />
                    }

                    {caracterizacion && 
                    <InfoCard 
                        title="Queremos asignarte al personal ideal"
                        text="Nuestro equipo de profesionales es  maravilloso, sin embargo nos guartaría enviarte a alguien con quien te sientas cómodo y te brinde un servicio más cercano."
                        onCallToAction={() => navigation.navigate("Caracterizacion")}
                        CallToActionTitle="Déjanos conocerte"
                        onClose={() => setShowCaracterizacion(false)}
                    />
                    }

                    <View style={{width:"100%", position:"relative", height:200, marginVertical:10}}>
                        <Image source={articulo1} style={{width: "100%", borderRadius: 10, position:"absolute"}} resizeMode="cover" />
                        <View style={{width:"100%", position:"absolute", zIndex: 2}}>
                            <Image source={articulo1} style={{width: "100%", opacity:0}} resizeMode="cover" />
                            <View style={{marginTop:-180, padding:20}}>
                                <Text style={[styles.H1, {color: "white"}]}>El aseo en casa es Vital</Text>
                                <Text style={[styles.p, {color: "white"}]}>Sabías que hacer el aseo en casa ayuda a mejorar las relaciones de pareja?...</Text>
                            </View>
                        </View>
                    </View>


                    {Object.keys(solicitud).length > 0 && solicitud.state > 0 && (!solicitudTareas || solicitudTareas.length == 0) && showTareas &&
                    <InfoCard 
                        title="Asigna tareas al personal de aseo"
                        text="Podrás agregar tareas para orientar y hacer seguimiento al personal de aseo, además podrás calificar las tareas."
                        onClose={() => setShowTareas(false)}
                    />
                    }

                    {Object.keys(solicitud).length > 0 && solicitud.state > 0 &&
                    <TareasCard 
                        title="TAREAS DEL SERVICIO"
                        navigation={navigation} 
                        cb_save={guardarTarea}
                        cb_click={clickTarea}
                        tareas={solicitudTareas.map(item => ({id:item.idChek, date:null, text:item.list, completed: item.value == 1}))}
                    />
                    }
                    <View style={{height:50}} />
                    <InfoCard
                        title="Crea tus tareas personales"
                        text="Podrás crear tareas personales y privadas, para que solo tú pueda verlas y hacerles seguimiento."
                        onClose={() => setShowTareas(false)}
                    />
                    <TareasCard
                        color="#00BCBC"
                        title="MIS TAREAS PERSONALES"
                        navigation={navigation} 
                        tareas={tareas}
                    />

                    <View style={{height:120}} />

                </View>
            </ScrollView>

        </SafeAreaView >
    )
}

export default Home

const _styles = {

    button: {
        position: "absolute", 
        width: 70, 
        height: 70, 
        bottom:15,
        justifyContent:"center", 
        alignItems:"center",
        left:"50%", 
        marginLeft: -5, 
        backgroundColor:"#00A0BC", 
        borderRadius:35, 
        borderWidth: 5, 
        borderColor: "#fff"
    },

    buttonMenuLabel: {
        fontSize:12,
        textAlign: "center",
        color: "#555"
    },

    label: {fontSize:15, color: "#6F757A", fontFamily: "pp_bold"},
    text: {fontSize:15, color: "#00A0BC", fontFamily: "pp_regular"},
    text2: {fontSize:13, color: "#00A0BC", fontFamily: "pp_regular", paddingRight:5},
    text3: {fontSize:13, color: "#6F757A", fontFamily: "pp_regular"},
}