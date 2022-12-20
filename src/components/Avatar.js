import React from 'react';
import { Image} from 'react-native';

const user = require("../../assets/user.png")

const Avatar = ({size=120, position="absolute"}) => {

    return (
        <Image 
            source={user} 
            style={{
                backgroundColor:"white",
                width:size, 
                height: size, 
                position, 
                top: 0, 
                left: position == "absolute" ? "50%" : 0, 
                marginLeft: position == "absolute" ? size / -2 : 0, 
                borderRadius:60, 
                borderWidth: 3, 
                borderColor:"#00A0BC"}} 
            resizeMode="contain"
        />
    )

}

export default Avatar