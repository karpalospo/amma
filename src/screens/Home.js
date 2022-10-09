import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, Image, ScrollView, StyleSheet } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { TareasCard, Button, InfoCard, Avatar } from '../components'
import moment from 'moment/min/moment-with-locales';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UtilitiesContext } from '../context/UtilitiesContext'
import { API } from '../global/services';


const logo = require("../../assets/logo.png")
const Menuicon1 = require("../../assets/1.png")
const Menuicon2 = require("../../assets/2.png")
const Menuicon3 = require("../../assets/3.png")
const Menuicon4 = require("../../assets/4.png")
const agendar = require("../../assets/agendar.png")
const icon2 = require("../../assets/icon2.png")
const articulo1 = require("../../assets/articulo1.png")
const exclamacion = require("../../assets/exclamacion.png")
const cerrar = require("../../assets/cerrar.png")

const tareasLocales = [
    {id: "1", date:moment().valueOf(), text:"Buscar a los niños a la ecuela"},
    {id: "2", date:moment().valueOf(), text:"Buscar a los niños a la ecuela"},
    {id: "3",date:moment().valueOf(), text:"Buscar a los niños a la ecuela"},
    {id: "4",date:moment().valueOf(), text:"Presentar APP a javi"}
]

const tareasServicio = [
    {id: "1", date:moment().valueOf(), text:"Buscar a los niños a la ecuela"},
    {id: "2", date:moment().valueOf(), text:"Buscar a los niños a la ecuela"},
    {id: "3",date:moment().valueOf(), text:"Buscar a los niños a la ecuela"}
]

const Home = ({navigation}) => {


    let pendiente;

    const [solicitud, setSolicitud] = useState({})
    const [showPendiente, setShowPendiente] = useState(true)
    const [caracterizacion, setShowCaracterizacion] = useState(true)
    const [showTareas, setShowTareas] = useState(true)

    const { user, setUser } = useContext(UtilitiesContext)

    useEffect(() => {
        (async function () {
            const res = await API.GET.MisSolicitudes(user.id)
            if(!res.error && res.message.result.length > 0) 
            setSolicitud(res.message.result[0])
        })()
    }, [user])

    console.log(solicitud)
    if(solicitud.state == 0) pendiente = true


    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />
            
            <View style={[styles.row, {position: "absolute", width: 80, height: 60, backgroundColor:"#C7F0F9", borderTopLeftRadius: 15, borderTopRightRadius: 15, left:0, bottom:0, width:"100%", zIndex: 10, paddingHorizontal: 30}]}>
                <TouchableOpacity>
                    <Image source={Menuicon1} style={{height: 25, width: 35}} tintColor="#7EA8CA" resizeMode="contain" />
                    <Text style={_styles.buttonMenuLabel}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={Menuicon2} style={{height: 25, width: 45}} tintColor="#7EA8CA" resizeMode="contain" />
                    <Text style={_styles.buttonMenuLabel}>Historial</Text>
                </TouchableOpacity>

                <View style={{width: 30}} />
                
                <View style={_styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate("Agendar")} style={{padding:20}} >
                        <Image source={agendar} style={{height: 30, width: 30}} tintColor="#ffffff" resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Image source={Menuicon3} style={{height: 25, width: 35}} tintColor="#7EA8CA" resizeMode="contain" />
                    <Text style={_styles.buttonMenuLabel}>Ayuda</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
                    <Image source={Menuicon4} style={{height: 25, width: 35}} tintColor="#7EA8CA" resizeMode="contain" />
                    <Text style={_styles.buttonMenuLabel}>Perfil</Text>
                </TouchableOpacity>

            </View>
            

            <ScrollView>
                
                <View style={[styles.row, {paddingHorizontal: 15, paddingTop: 6}]}>
                    <View />
                    {/*<Image source={user} style={{height: 60, width: 60}} resizeMode="contain" />*/}
                    <Image source={logo} style={{height: 60, width: 100, marginRight: -45}} resizeMode="contain" />
                    <View style={[styles.row, {width: 45}]}>
                        {/*<View style={{width:45, height: 45, backgroundColor:"#00A0BC", borderRadius: 31, alignItems:"center", justifyContent:"center"}}>
                            <Image source={icon1} style={{height: 20, width: 20}} resizeMode="contain" />
                        </View>*/}
                        <View style={{width:40, height: 40, borderColor:"#00A0BC", borderWidth: 1, borderRadius: 31, alignItems:"center", justifyContent:"center"}}>
                            <Image source={icon2} style={{height: 20, width: 20}} tintColor="#00A0BC" resizeMode="contain" />
                        </View>
                    </View>
                </View>

                <View style={{paddingHorizontal:20, width:"100%"}}>
                    
                    {showPendiente && pendiente &&
                    <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"white", borderRadius: 30, elevation: 5, padding: 10, marginVertical: 10}}>
                        <Image source={exclamacion} style={{width: 25, height:25}} resizeMode="contain" />
                        <Text style={{paddingHorizontal: 7, color: "#6F757A", flex: 1}}>Tu solicitud está en espera de aprobación</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPendiente(false)}><Image source={cerrar} style={{width: 25, height:25}} resizeMode="contain" /></TouchableOpacity>
                    </View>
                    }

                    {true && 
                    <TouchableOpacity style={[styles.row, {backgroundColor:"#FFF1D4", padding:15, borderRadius: 8, marginVertical: 10}]} activeOpacity={0.9} onPress={() => navigation.navigate("Detalles")}>
                        <Avatar size={65} position="relative" />
                        <View style={{flex:1, paddingLeft:10}}>
                            <Text style={_styles.label}>Servicio HOGAR</Text>
                            <Text style={_styles.text}>Asignado</Text>
                        </View>
                        <View>
                            <View style={styles.row}><Text style={_styles.text2}>Día</Text><Text style={_styles.text3}>08/09/2022</Text></View>
                            <View style={styles.row}><Text style={_styles.text2}>Hora</Text><Text style={_styles.text3}>6:00 PM</Text></View>
                        </View>
                    </TouchableOpacity>
                    }

                    {caracterizacion && false &&
                    <InfoCard 
                        title="Queremos asignarte al personal ideal"
                        text="Nuestro equipo de profesionales es  maravilloso, sin embargo nos guartaría enviarte a alguien con quien te sientas cómodo y te brinde un servicio más cercano."
                        onCallToAction={() => navigation.navigate("Caracterizacion")}
                        CallToActionTitle="Déjanos conocerte"
                        onClose={() => setShowCaracterizacion(false)}
                    />
                    }


                    <View style={{width:"100%", position:"relative", height:200, marginVertical:10}}>
                        <Image source={articulo1} style={{width: "100%", borderRadius: 20, position:"absolute"}} resizeMode="cover" />
                        <View style={{width:"100%", position:"absolute", zIndex: 2}}>
                            <Image source={articulo1} style={{width: "100%", opacity:0}} resizeMode="cover" />
                            <View style={{marginTop:-150, padding:20}}>
                                <Text style={[styles.H1, {color: "white"}]}>El aseo en casa es Vital</Text>
                                <Text style={[styles.p, {color: "white"}]}>Sabías que hacer el aseo en casa ayuda a mejorar las relaciones de pareja?...</Text>
                                <Text style={[styles.p, {color: "white", paddingTop:10}]}>Leer Más</Text>
                            </View>
                        </View>
                    </View>


                    {showTareas &&
                    <InfoCard 
                        title="Asigna tareas al personal de aseo"
                        text="Podrás agregar tareas para orientar y hacer seguimiento al personal de aseo, además podrás calificar las tareas."
                        onClose={() => setShowTareas(false)}
                    />
                    }

                    {Object.keys(solicitud) > 0 &&
                    <TareasCard 
                        title="LISTA DE TAREAS DEL SERVICIO"
                        navigation={navigation} 
                        callback={item => {}} 
                        tareas={solicitud.tareas}
                    />
                    }

                    
                    <TareasCard
                        color="#00BCBC"
                        title="MIS TAREAS PERSONALES"
                        navigation={navigation} 
                        callback={item => {}} 
                        tareas={tareasLocales}
                    />

                    <View style={{height:90}} />
                    <Button title="desloguear" onPress={() => setUser({})} />
                    <View style={{height:90}} />

                </View>
            </ScrollView>

        </SafeAreaView >
    )
}

export default Home

const _styles = StyleSheet.create({

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
})