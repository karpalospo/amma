import React from 'react';
import { Text, View, Image} from 'react-native';
import { styles, IMAGES } from '../global/styles'
import { CustomSelectPicker } from './CustomSelectPicker'

const Select = ({label="", customStyle ={}, img, items = [], onChange = () => {}, placeholder="Seleccione...", value="Seleccione..."}) => {

    return (
        <View style={[{marginTop: 30}, customStyle]}>
            <Text style={styles.labelInputs}>{label}</Text>
            <View style={styles.inputs}>
                {img && <Image source={IMAGES[img]} style={{width:22, height: 22, marginRight:8 ,tintColor: "#ccc"}} resizeMode="contain" />}
                <CustomSelectPicker
                    items={items}
                    style={{ justifyContent: 'center'}}
                    textStyle={{fontFamily: "pp_regular", color:"#6F757A"}}
                    onValueChange={itemValue => onChange(itemValue)}
                    placeHolder={placeholder}
                    InitialselectedItem={value}
                />
            </View>
        </View>
    )

}

export default Select


