import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import moment from 'moment/min/moment-with-locales';
moment.locale('es-us');

const TareasList = ({item, callback, hands}) => {
    console.log(item)
    //console.log("repinto")
    return (
        <View style={styles.row}>   
            <TouchableOpacity activeOpacity={0.6} onPress={() => callback(item)} style={{paddingRight:15}}>
                <Ionicons name="md-checkmark-circle" size={24} color={(item.completed > 0 ||item.completed != false  ? "#0097B1" : "#ccc")} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => callback(item)} style={{paddingRight:15, flex:1, marginRight:20}}>
                <View><Text style={styles.text}>{item.text}</Text></View>
                {item.date && <View><Text style={styles.date}>{moment(item.date).fromNow()}</Text></View>}
            </TouchableOpacity>
            {hands &&
                <View style={{flexDirection: "row", justifyContent:"space-between", width:60}}>
                    <TouchableOpacity activeOpacity={0.6} onPress={ () => callback(item, 2)}><FontAwesome name="thumbs-o-up" size={24} color={(item.completed > 0 && item.completed < 2 ? "#0097B1" : "#94C7D0")} /></TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={ () => callback(item, 3)}><FontAwesome name="thumbs-o-down" size={24} color={(item.completed > 0 && item.completed < 3 ? "#0097B1" : "#94C7D0")} /></TouchableOpacity>
                </View>
            }
        </View>
    )

}

export default TareasList

const styles = {

    date: {
        fontSize: 12,
        color: "#999"
    },

    text: {
        fontSize: 16,
        color: "#6F757A",
        fontFamily: "pp_regular"
    },

    row: {
        paddingVertical: 10,
        flexDirection:"row",
        justifyContent: "space-between",
    },

    checkbox: {
        width:18,
        height:18,
        borderRadius:9,
        borderColor: "#000",
        borderWidth:1,
    }
}

