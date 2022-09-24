import React from 'react';
import { Text, View, TextInput} from 'react-native';
import { styles } from '../global/styles'

const Input = ({label="", customStyle ={}, value, onChange = () => {}, placeholder="", type="default", secureTextEntry=false, editable=true, max=9999}) => {

    return (
        <View style={[{marginTop: 13}, customStyle]}>
            <Text style={styles.labelInputs}>{label}</Text>
            <View style={styles.inputs}>
                <TextInput
                    placeholder={placeholder}
                    keyboardType={type}
                    style={styles.textInputs}
                    onChangeText={text => onChange(text)}
                    value={value}
                    editable={editable}
                    maxLength={max}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    )

}

export default Input

