import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput} from 'react-native';
import { styles, COLORS } from '../global/styles'
import { AntDesign } from '@expo/vector-icons'; 

export default ({onChange = () => {}, value = "0", label = "", id}) => {

    const [_value, setValue] = useState(value);


    const changeValue = (val) => {
        val += parseInt(_value)
        if(val < 0) val = 0
        if(val > 99) val = 99
        setValue(String(val))
        onChange(id, val)
    }

    return (
        <View style={[styles.row, {marginVertical:15}]}>
            <Text style={_styles.label}>{label}</Text>
            <TouchableOpacity onPress={() => changeValue(-1)} style={_styles.button}>
                <AntDesign name="minus" size={22} color="white" />
            </TouchableOpacity>
            <TextInput
                keyboardType="decimal-pad"
                style={_styles.textInput}
                value={_value}
                editable={false}
            />
            <TouchableOpacity onPress={() => changeValue(1)} style={_styles.button}>
                <AntDesign name="plus" size={22} color="white" />
            </TouchableOpacity>
        </View>
    )

}

const _styles = StyleSheet.create({
    label: {
        flex:1, 
        fontFamily: "pp_regular", 
        fontSize: 16, 
        color:"#6F757A", 
        paddingLeft: 5
    },

    button: {
        width:40, 
        height:40, 
        backgroundColor:"#01BFE0", 
        borderRadius: 21, 
        justifyContent:"center", 
        alignItems:"center"
    },

    textInput: {
        width:40, 
        height:40, 
        backgroundColor:"white", 
        borderColor:"#01BFE0", 
        borderWidth:1, 
        marginHorizontal:10, 
        borderRadius:5,
        textAlign: "center",
        fontSize: 18,
        color: "#555"
    }

})