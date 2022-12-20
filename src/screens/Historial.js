import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { UtilitiesContext } from '../context/UtilitiesContext'
import {Button, Header, Avatar} from '../components'
import { API } from '../global/services';
import moment from 'moment/min/moment-with-locales';

moment.locale('es-us');

const rueda = require("../../assets/rueda.png")

const Objectfy = (arr) => {
    if(!arr) return {}
    let r = {}
    arr.forEach(item => r[item.id] = item)
    return r
}

const Historial = ({navigation, route}) => {

    const jornadas = Objectfy(route.params.jornadas)

    const { user } = useContext(UtilitiesContext)
    const [solicitudes, setSolicitudes] = useState(null)

    async function init() {
        if(solicitudes !== null) return
        const res = await API.GET.getSolicitudes(user.id)
        console.log(res, jornadas)
        if(!res.error && res.message.result.length > 0) 
            setSolicitudes(res.message.result)
    }



    useEffect(() => {
        init()
    }, [user]);

    return (
        <SafeAreaView style={styles.main}>
            
            <Header label="Solicitudes" navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{width:"100%"}}>
                {solicitudes && solicitudes.length > 0 &&
                    <View>
                    {solicitudes.map((item, index) =>
                        <View key={`_${index}`} style={{marginVertical:10, marginHorizontal:15, padding:15, backgroundColor:"#fff", borderRadius: 15, elevation: 6}}>
                            <View style={[styles.row, {alignItems:"flex-start"}]}>
                                <View style={{width:40}}><Image source={rueda} style={{width:23, height:22}} /></View>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize:15, fontFamily:"pp_bold"}}>{item.nomClas} {item.nomServ}</Text> 
                                    <Text style={{paddingBottom:4, fontFamily:"pp_regular", color: "#5C5C5C"}}>{item.direction}</Text> 
                                    <View style={[styles.row, {}]}>
                                        <Text style={{fontSize:14, color:"#6F757A", fontFamily:"pp_regular"}}>{moment(item.date).format("D MMMM")}</Text>
                                        <Text style={{fontSize:12, color:"#6F757A", fontFamily:"pp_regular"}}>{jornadas[item.idJor].jor}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>    
                    )}
                    </View>
                }

            </ScrollView>
        </SafeAreaView >
    )
}

export default Historial