import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment/min/moment-with-locales';



const TareasList = ({tareas, editTarea, callback}) => {

    chulearTarea = async (id, payload, item) => {
        await editTarea(id, payload)
        if(typeof callback == "function") callback(item)
    }

    return (
        <View>
            {tareas.map(item => 
                <TouchableOpacity
                    style={styles.row}
                    activeOpacity={0.6}
                    key={item.id} 
                    onPress={ () => chulearTarea(item.date, {completed: !item.completed}, item)}>   
                    <Text style={{color: (item.completed ? "#A2BD30" : "#ccc"), paddingRight:15}}>
                        <Ionicons name="md-checkmark-circle" size={24} />
                    </Text>
                    <View flex={1}>
                        <View><Text style={styles.text}>{item.text}</Text></View>
                        <View><Text style={styles.date}>{moment(item.date).fromNow()}</Text></View>
                    </View> 
                </TouchableOpacity>
            )}
        </View>
    )

}


export default TareasList


const styles = StyleSheet.create({

    date: {
        fontSize: 12,
        color: "#ccc"
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
});

