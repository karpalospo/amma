import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { UtilitiesContext } from '../context/UtilitiesContext'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import {Button, Input, Select, Header} from '../components'

const Ayuda = ({navigation}) => {

    const { user } = useContext(UtilitiesContext)


    return (
        <SafeAreaView style={styles.main}>

            <Header theme="dark" label="Ayuda" navigation={navigation} />
            <View style={{position:"absolute", width:"100%", height:55, zIndex:-1, backgroundColor:"#00A0BC"}}></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:10, paddingTop:20, width:"100%"}}>

            
                    <Collapse>
                        <CollapseHeader style={_styles.header}>
                            <Text>Pregunta Frecuente 1</Text>
                        </CollapseHeader>
                        <CollapseBody style={_styles.body}>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat in ex eu fringilla. Fusce finibus velit in metus pulvinar maximus. Maecenas ut risus ut ante blandit eleifend eget ac nulla. Phasellus ac enim convallis mauris imperdiet faucibus. Vivamus vitae vestibulum augue, vel sagittis massa. Aliquam fringilla eleifend neque at dapibus. Nulla sollicitudin euismod sapien, eget tristique diam scelerisque et. Nullam sed faucibus orci, et consectetur nunc. Donec et nunc id erat vestibulum venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur nisl odio, hendrerit sed justo ut, ornare dapibus leo. Praesent nec ornare lacus. Ut vitae risus ligula. Curabitur elementum ultricies diam ac semper. Morbi porttitor justo erat, sed lacinia augue tristique eu. Duis ut vulputate nunc.</Text>
                        </CollapseBody>
                    </Collapse>

                    <Collapse>
                        <CollapseHeader style={_styles.header}>
                            <Text>Pregunta Fecuente 2</Text>
                        </CollapseHeader>
                        <CollapseBody style={_styles.body}>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat in ex eu fringilla. Fusce finibus velit in metus pulvinar maximus. Maecenas ut risus ut ante blandit eleifend eget ac nulla. Phasellus ac enim convallis mauris imperdiet faucibus. Vivamus vitae vestibulum augue, vel sagittis massa. Aliquam fringilla eleifend neque at dapibus. Nulla sollicitudin euismod sapien, eget tristique diam scelerisque et. Nullam sed faucibus orci, et consectetur nunc. Donec et nunc id erat vestibulum venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur nisl odio, hendrerit sed justo ut, ornare dapibus leo. Praesent nec ornare lacus. Ut vitae risus ligula. Curabitur elementum ultricies diam ac semper. Morbi porttitor justo erat, sed lacinia augue tristique eu. Duis ut vulputate nunc.</Text>
                        </CollapseBody>
                    </Collapse>

            </ScrollView>

      
        </SafeAreaView >
    )
}

export default Ayuda

const _styles = {
    header: {
        backgroundColor: "#ccc",
        height: 40,
        marginTop: 1,
        justifyContent: "center",
        paddingLeft: 10
    },

    body: {
        padding: 20,
        backgroundColor: "#f2f2f2"
    }
}