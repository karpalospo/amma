import React from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { styles, } from '../global/styles'
import { AntDesign } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';

const TouchItem = ({
    onPress = () => {},
    text,
    titulo,
    image,
    progress
}) => {


    return (
        <TouchableOpacity style={_styles.item} activeOpacity={0.9} onPress={onPress}>
            <View style={_styles.item2}>
                <View style={styles.row}>
                    <Image source={image} style={{width:25, height: 25}} resizeMode="contain" />
                    <Text style={{flex:1, paddingLeft: 15, color:"#00A0BC", fontFamily: "pp_regular", fontSize:17}}>{titulo}</Text>
                    <AntDesign name="right" size={20} color="#00A0BC" />
                </View>
                <Text style={_styles.text}>{text}</Text>
                {progress && <View style={{marginVertical:8}}><ProgressBar progress={59} /></View>}
            </View>
        </TouchableOpacity>
    )
}

export default TouchItem

const _styles = {
    item: {
        marginVertical: 2,
        backgroundColor:"transparent", 
        padding:8,
    },
    item2: {
        backgroundColor:"white", 
        borderRadius: 10, 
        padding:18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    text: {fontSize:14, color: "#6F757A", fontFamily: "pp_regular", marginTop:5},

}