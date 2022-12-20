import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { UtilitiesContext } from '../context/UtilitiesContext'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

const Ayuda = (props) => {

    const { user } = useContext(UtilitiesContext)


    return (
        <SafeAreaView style={styles.main}>

            <Collapse>
                <CollapseHeader style={_styles.header}>
                    <Text>Acordion 1</Text>
                </CollapseHeader>
                <CollapseBody style={_styles.body}>
                    <Text>Contenido 1</Text>
                </CollapseBody>
            </Collapse>

            <Collapse>
                <CollapseHeader style={_styles.header}>
                    <Text>Aconrdion 2</Text>
                </CollapseHeader>
                <CollapseBody style={_styles.body}>
                    <Text>Contenido 2</Text>
                </CollapseBody>
            </Collapse>

      
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