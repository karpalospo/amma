import React, {useState} from 'react';
import { View, TouchableOpacity, Text, TextInput} from 'react-native';
import { styles } from '../global/styles'

const Jornada = ({items=[], onChange = () => {}, justify="space-between", numMeses, changeMeses = () => {}}) => {

    const [currentindex, setIndex] = useState(-1);

    return (
        <View style={[styles.row, {justifyContent: justify}]}>
            {
                items.map((item, index) =>
                    <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => {onChange(item.value); setIndex(index)}} style={{marginHorizontal: 8}} >
                        <Text style={[_styles.option, currentindex == index ? _styles.optionActive : {}]}>{item.label}</Text>
                        {item.label2 && <Text style={_styles.optionText}>{item.label2}</Text>}
                    </TouchableOpacity>
                )
            }
            {numMeses && 
                <TextInput
                style={{marginLeft:10, color:"#01BFE0", backgroundColor: "white", borderColor: "#B4E3F1", borderWidth: 1, borderRadius: 8, height:45, paddingHorizontal:5, textAlign:"center"}}
                    onChangeText={text => changeMeses(text)}
                    keyboardType="decimal-pad"
                    value={numMeses}
                />
            }
        </View>
    )
}

export default Jornada

const _styles = {

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
}