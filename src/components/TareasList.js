import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment/min/moment-with-locales';
moment.locale('es-us');

const TareasList = ({item, callback}) => {

    //console.log("repinto")
    return (
        <TouchableOpacity
            style={styles.row}
            activeOpacity={0.6}
            onPress={ () => callback(item)}
        >   
            <Text style={{color: (item.completed ? "#0097B1" : "#ccc"), paddingRight:15}}>
                <Ionicons name="md-checkmark-circle" size={24} />
            </Text>
            <View flex={1}>
                <View><Text style={styles.text}>{item.text}</Text></View>
                {item.date && <View><Text style={styles.date}>{moment(item.date).fromNow()}</Text></View>}
            </View> 
        </TouchableOpacity>
    )

}

export default TareasList

const styles = {

    date: {
        fontSize: 13,
        color: "#999"
    },

    text: {
        fontSize: 16,
        color: "#6F757A",
        fontFamily: "pp_regular"
    },

    row: {
        padding: 10,
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

