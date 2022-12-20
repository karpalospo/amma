import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { styles, COLORS } from '../global/styles'

const cerrar = require("../../assets/cerrar.png")

const InfoCard = ({
    title,
    text,
    onCallToAction,
    CallToActionTitle,
    onClose,
    color = "#C7F0F9"
}) => {

    return (
        <View style={{backgroundColor: color, borderRadius:15, padding:15, marginVertical: 10}}>
            <View style={[styles.row, {alignItems:"flex-start"}]} >
                <Text style={[styles.H3, {color: "#00A0BC", paddingRight: 30, marginBottom:8}]}>{title}</Text>
                {onClose && 
                <TouchableOpacity activeOpacity={0.5} onPress={onClose}>
                    <Image source={cerrar} style={{width: 25, height:25}} resizeMode="contain" />
                </TouchableOpacity>
                }
            </View>
            
            <Text style={[styles.pLight, {color: "#666"}]}>{text}</Text>
            {onCallToAction && 
            <TouchableOpacity activeOpacity={0.5} style={[styles.rowLeft, {marginTop:15}]} onPress={onCallToAction}>
                <Text style={{color: "#00A0BC", paddingRight: 5, fontSize:16, fontFamily:"pp_regular", fontWeight:"bold"}}>{CallToActionTitle}</Text>
                <Ionicons name="md-arrow-forward-circle-outline" size={24} color="#00A0BC" />
            </TouchableOpacity>
            }
        </View>
    )
}

export default InfoCard