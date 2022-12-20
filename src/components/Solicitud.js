import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { styles } from '../global/styles'
import Avatar from './Avatar'

const Solicitud = ({navigation, jornadas, solicitud}) => {

    return (
        <TouchableOpacity style={[styles.row, {backgroundColor:"#FFF1D4", padding:15, borderRadius: 8, marginVertical: 10}]} activeOpacity={0.9} onPress={() => navigation.navigate("Detalles", {solicitud, jornadas})}>
            <Avatar size={65} position="relative" />
            <View style={{flex:1, paddingLeft:10}}>
                <Text style={_styles.label}>Servicio {solicitud.nomServ}</Text>
                <Text style={_styles.text}>Asignado</Text>
            </View>
            {jornadas && <View>
                <View style={styles.row}><Text style={_styles.text2}>Día</Text><Text style={_styles.text3}>{solicitud.programa[0].date}</Text></View>
                <View style={styles.row}><Text style={_styles.text2}>Hora</Text><Text style={_styles.text3}>{jornadas[jornadas.findIndex(item => item.id == solicitud.idJor)].jor.split(" - ")[0]}</Text></View>
            </View>
            }
        </TouchableOpacity>
    )
}

export default Solicitud

const _styles = {
    label: {fontSize:15, color: "#6F757A", fontFamily: "pp_bold"},
    text: {fontSize:15, color: "#00A0BC", fontFamily: "pp_regular"},
    text2: {fontSize:13, color: "#00A0BC", fontFamily: "pp_regular", paddingRight:5},
    text3: {fontSize:13, color: "#6F757A", fontFamily: "pp_regular"}
}