import React from 'react';
import { Image} from 'react-native';

const mujer = require("../../assets/mujer.png")
const hombre = require("../../assets/hombre.png")

const Avatar = ({size=120, position="absolute", photo="mujer"}) => {

    return (
        <Image 
            source={photo == "mujer" ? mujer : hombre} 
            style={{
                width:size, 
                height: size, 
                position, 
                top: 0, 
                left: position == "absolute" ? "50%" : 0, 
                marginLeft: position == "absolute" ? -60 : 0, 
                borderRadius:60, 
                borderWidth: 3, 
                borderColor:"#00A0BC"}} 
            resizeMode="contain"
        />
    )

}

export default Avatar