import React, {useState} from 'react';
import { TouchableOpacity, View, Image, Text, StatusBar } from 'react-native';
import { styles, COLORS } from '../global/styles'

const left = require("../../assets/leftarrow.png")

const Header = ({navigation, label="", theme="light"}) => {

    const [color, setColor] = useState(theme == "light" ? "#00A0BC" : "white");

    return (
        <View style={[_styles.headerCont, {borderColor: theme == "light" ? "#B8F4FF" : "white"}, !label ? {borderColor: "transparent", height:0} : {}]}>

            {theme == "light" && <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />}
            {theme == "dark" && <StatusBar backgroundColor={"#00A0BC"} barStyle="light-content" />}

            {label &&
            <View>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => navigation.goBack()} >
                    <Image source={left} style={{height: 25, width: 25}} tintColor={color} resizeMode="contain" />
                    <Text style={{color: color, fontSize:17, paddingLeft: 8, fontFamily:"pp_regular"}}>{label}</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    )
}

export default Header
const _styles = {

    headerCont: {
        height:55,
        paddingTop:15,
        paddingBottom: 10,
        paddingLeft:20,
        borderBottomWidth: 1,
        justifyContent: "center"
    },

}