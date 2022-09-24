import React from 'react';
import { Text, View, TextInput} from 'react-native';
import { styles } from '../global/styles'

const TextArea = ({label, customStyle ={}, numLines=4, height=110, value, onChange = () => {}, placeholder="", type="default"}) => {

    return (
        <View style={[{marginTop:15}, customStyle]}>
            {label && <Text style={styles.labelInputs}>{label}</Text>}
            <View style={[styles.inputs, {height, paddingVertical:8}]}>
                <TextInput
                    multiline={true}
                    numberOfLines={numLines}
                    placeholder={placeholder}
                    keyboardType={type}
                    style={[styles.textInputs, {height: "100%", textAlignVertical: 'top'}]}
                    onChangeText={text => onChange(text)}
                    value={value}
                />
            </View>
        </View>
    )

}

export default TextArea

