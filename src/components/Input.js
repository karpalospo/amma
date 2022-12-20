import React, {useState} from 'react';
import { Text, View, TextInput, Image} from 'react-native';
import { styles, IMAGES } from '../global/styles'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const Input = ({label="", customStyle ={}, value, img, onChange = () => {}, placeholder="", type="default", secureTextEntry=false, editable=true, max=9999}) => {

    const [seePassword, setSeePassword] = useState(true)

    return (
        <View style={[{marginTop: 13}, customStyle]}>
            <Text style={styles.labelInputs}>{label}</Text>
            <View style={styles.inputs}>
                {img && <Image source={IMAGES[img]} style={{width:22, height: 22, marginRight:8 ,tintColor: "#ccc"}} resizeMode="contain" />}
                <TextInput
                    placeholder={placeholder}
                    keyboardType={type}
                    style={[styles.textInputs, secureTextEntry ? {width: "90%"} : {width: "100%"}]}
                    onChangeText={text => onChange(text)}
                    value={value}
                    editable={editable}
                    maxLength={max}
                    secureTextEntry={secureTextEntry && seePassword}
                />
                {secureTextEntry &&
                    <TouchableOpacity onPress={() => setSeePassword(!seePassword)} activeOpacity={0.6} style={{paddingLeft: 8}} >
                        <FontAwesome5 
                            name={!seePassword ? "eye" : "eye-slash"} 
                            size={22}
                            color={"#444"}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )

}

export default Input

