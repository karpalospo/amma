import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { styles, COLORS } from '../global/styles'

export default ({onChange = () => {}}) => {

    const [index, setIndex] = useState(-1);

    return (
        <View style={[styles.row]}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {onChange(0); setIndex(0)}} >
                <Text style={[_styles.option, index == 0 ? _styles.optionActive : {}]}>Mañana</Text>
                <Text style={_styles.optionText}>6 am a 12 Pm</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {onChange(0); setIndex(1)}}>
                <Text style={[_styles.option, index == 1 ? _styles.optionActive : {}]}>Tarde</Text>
                <Text style={_styles.optionText}>1 pm a 6 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {onChange(0); setIndex(2)}}>
                <Text style={[_styles.option, index == 2 ? _styles.optionActive : {}]}>Completa</Text>
                <Text style={_styles.optionText}>6 am a 6 Pm</Text>
            </TouchableOpacity>
        </View>
    )

}

const _styles = StyleSheet.create({

    option: {
        backgroundColor: "#fff",
        color:"#0097B1",
        paddingHorizontal: 20,
        paddingVertical: 10,
        minWidth:90,
        textAlign: "center",
        borderRadius: 12,
        elevation: 5,
        fontFamily: "pp_regular",
        fontSize:14
    },

    optionActive: {
        backgroundColor: "#0097B1",
        color:"#fff",
    },

    optionText: {
        paddingTop: 8,
        color:"#6F757A",
        fontSize: 13,
        textAlign: "center",
        fontFamily: "pp_regular"
    }
})