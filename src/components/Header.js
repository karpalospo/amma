import React from 'react';
import { TouchableOpacity, View, Image, Text, StatusBar } from 'react-native';
import { styles, COLORS } from '../global/styles'

const left = require("../../assets/leftarrow.png")

export default ({navigation, label="", theme="light"}) => 
<View style={_styles.headerCont}>
    {theme == "light" && <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />}
    {theme == "dark" && <StatusBar backgroundColor={"#00A0BC"} barStyle="light-content" />}
    <View>
        <TouchableOpacity style={{flexDirection:"row"}} onPress={() => navigation.goBack()} >
            <Image source={left} style={{height: 25, width: 25}} tintColor="#00A0BC" resizeMode="contain" />
            <Text style={{color: "#00A0BC", fontSize:17, paddingLeft: 8, fontFamily:"pp_regular"}}>{label}</Text>
        </TouchableOpacity>
    </View>
</View>


const _styles = {

    headerCont: {
        height:50,
        paddingTop:10,
        paddingBottom: 10,
        paddingLeft:20,
        borderBottomWidth: 1,
        borderColor: "#B8F4FF",
        justifyContent: "center"
    },

}