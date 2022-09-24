import React from 'react';
import { TouchableOpacity} from 'react-native';

export default ({bgColor = "#ffffff", padding = 0, onPress, children, style = {}}) => 

<TouchableOpacity
    activeOpacity={onPress ? 0.8 : 1}
    style={[{borderRadius:12, backgroundColor: bgColor, padding, position: "relative", elevation: 10}, style]}
    onPress={onPress}
>
    {children}
</TouchableOpacity>