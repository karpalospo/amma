import React from 'react';
import { Image, View} from 'react-native';

export default ({
    size = 100, 
    contSize, 
    imgSize, 
    bgColor = "transparent", 
    tintColor, 
    radius = 0,
    justy = "flex-end",
    src,
    mode = "contain",
    style = {},
    effect
}) => {

    let _size = {};

    if(!imgSize) {
        if(!contSize) _size = {width: size, height: size}
        else {
            if(contSize[0]) _size.width = contSize[0]
            if(contSize[1]) _size.height = contSize[1]
        } 
    } else {
        _size = {width: imgSize[0], height: imgSize[1]}
    }
    if(!contSize) contSize = [size, size]


    return (
        <View style={{
                position: "relative",
                alignItems: "center", 
                justifyContent: justy, 
                overflow: "hidden", 
                backgroundColor: bgColor, 
                borderRadius: radius,
                width: contSize[0],
                height: contSize[1],
                ...style
            }} 
        >
            <Image
                source={src}
                style={_size}
                resizeMode={mode}
                tintColor={tintColor}
                fadeDuration={0}
            />
            {effect == "gray" && <View style={{position:"absolute", width: contSize[0] + 200, height: contSize[1] + 200, backgroundColor:"rgba(100, 100, 100, 0.5)"}} />}
            
        </View>
    )

}
   

