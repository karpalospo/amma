import React from 'react';
import { Text, View, TextInput} from 'react-native';
import { styles } from '../global/styles'
import { CustomSelectPicker } from './CustomSelectPicker'

const Select = ({label="", customStyle ={}, items = [], onChange = () => {}, placeholder="Seleccione...", type="default"}) => {

    return (
        <View style={[{marginTop: 30}, customStyle]}>
            <Text style={styles.labelInputs}>{label}</Text>
            <View style={styles.inputs}>
                <CustomSelectPicker
                    items={items}
                    style={{ justifyContent: 'center'}}
                    textStyle={{fontFamily: "pp_regular", color:"#6F757A"}}
                    onValueChange={itemValue => onChange(itemValue)}
                    placeHolder={placeholder}
                    InitialselectedItem={"Seleccione..."}
                />
            </View>
        </View>
    )

}

export default Select


