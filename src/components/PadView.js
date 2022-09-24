import React from 'react';
import {View, Dimensions} from 'react-native';

const { width, height } = Dimensions.get("window");

export default ({
    style = {},
    align = "center",
    justy = "space-between",
    padding = "0",
    rows,
    cols,
    w100,
    h100,
    grow,
    bgColor,
    children
}) => {

    let 
        p = padding.split(" "),
        len = p.length,
        _style = {}
    ;

    if(len == 1) p = [p[0], p[0], p[0], p[0]]
    else if(len == 2) p = [p[0], p[1], p[0], p[1]]
    else if(len == 3) p = [p[0], p[1], p[2], p[1]]
    else if(len == 4) p = [p[0], p[1], p[2], p[3]]

    if(len > 0) {
        _style.paddingTop = Number.parseInt(p[0])
        _style.paddingRight = Number.parseInt(p[1])
        _style.paddingBottom = Number.parseInt(p[2])
        _style.paddingLeft = Number.parseInt(p[3])
    }

    if(rows || cols) {
        _style.flex = 1, 
        _style.alignItems = align, 
        _style.justifyContent = justy, 
        _style.flexDirection = rows ? "row" : "column"
    }

    if(w100) _style.width = width
    if(h100) _style.height = height

    if(bgColor) _style.backgroundColor = bgColor

    if(grow) _style.flexGrow = grow

    return (
        <View style={[_style, style]}>
            {children}
        </View>
    )
}
