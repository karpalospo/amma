import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default ({style, loading, onPress, onPress2, title, title2, textColor, icon, fontSize=17, textDeco}) => {

    return (
        <View style={styles.container} >
            {(!title2 && loading) && (
                <View style={[styles.buttonRight, style]}>
                    <ActivityIndicator color={"white"} />
                </View>
            )}
            {(!title2 && !loading && !icon) && (
                <TouchableOpacity style={[styles.buttonRight, style]} onPress={onPress} activeOpacity={0.9}>
                    <Text style={[styles.textLeft, (textColor ? {color: textColor, fontSize} : {}),
                    (textDeco ? {textDecorationLine: textDeco} : {})
                    ]}>{title}</Text>
                </TouchableOpacity>
            )}
            {title2 && (
                <TouchableOpacity  style={[styles.buttonLeft, style]} onPress={onPress} activeOpacity={0.9}>
                    <Text style={styles.textRight}>{title}</Text>
                </TouchableOpacity>
            )}
            {title2 && (
                <TouchableOpacity style={[styles.buttonRight, style]} onPress={onPress2} activeOpacity={0.9}>
                    <Text style={styles.textLeft}>{title2}</Text>
                </TouchableOpacity>
            )}
            {icon && (
                <TouchableOpacity style={[styles.buttonRight, style]} onPress={onPress} activeOpacity={0.9}>
                    <Ionicons name={icon} size={24} color="white" />
                </TouchableOpacity>
            )}

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        paddingHorizontal: 5,
    },

    buttonRight: {
        paddingHorizontal:20,
        paddingVertical:12,
        backgroundColor: "#00A0BC",
        borderWidth:1,
        borderColor: "#00A0BC",
        borderRadius: 15,
        flex:1,
        marginHorizontal:10,

    },
    
    buttonLeft: {
        paddingHorizontal:20,
        paddingVertical:12,
        backgroundColor: "#00A0BC",
        borderWidth:1,
        borderColor: "#00A0BC",
        borderRadius: 15,
        flex:1,
        marginHorizontal:10,
    },

    textLeft: {
        fontFamily: "pp_medium",
        fontSize:16,
        color: "white",
        textAlign: "center"
    },

    textRight: {
        fontFamily: "pp_medium",
        fontSize:16,
        color: "white",
        textAlign: "center"
    }


})
