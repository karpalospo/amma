import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from "react-native"
import { CustomModalDropdown } from './CustomModalDropdown';
import { useEffect } from 'react';

const arrow = require('../../assets/dropdown_arrow.png')

export const CustomSelectPicker = ({ 
    items = [],
    onValueChange = () => {},
    style = {}, 
    textStyle = {}, 
    customLabelKey = 'label', // overwrites the default selected item label key, default `label`  
    placeHolder,
    InitialselectedItem
}) => {

    const [selectedItem, setSelectedItem] = useState(InitialselectedItem)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        items.length > 0 && selectItem(items[0], 0);
    }, [])

    const selectItem = (item, index) => {
        setModalVisible(false);
        setSelectedItem(item[customLabelKey]);
        onValueChange(item, index);
    }

    return (
        <View style={{flex:1}}>
            <TouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 0, height: '100%', ...style}} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={{ fontSize: 16, flex:1, ...textStyle }}>{selectedItem ? selectedItem : placeHolder}</Text>
                <View style={{ position: 'absolute', justifyContent: 'center', right: 5 }} pointerEvents="none">
                    <Image source={arrow} style={{width: 16, height: 16, marginRight:8}} resizeMode='contain'  />
                </View>
            </TouchableOpacity>
            <CustomModalDropdown 
                items={items}
                modalVisible={modalVisible}
                onCloseModal={() => setModalVisible(false)}
                onValueChange={(item, index) => selectItem(item, index)}
            />
        </View>
    )
}