import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, Image, StyleSheet } from 'react-native'
import { styles, COLORS } from '../global/styles'
import AppIntroSlider from 'react-native-app-intro-slider';
import {Button} from '../components'


const limpieza1 = require("../../assets/limp1.png")
const limpieza2 = require("../../assets/limp2.png")
const limpieza3 = require("../../assets/limp3.png")

const icon1 = require("../../assets/img1.png")
const icon2 = require("../../assets/img2.png")
const icon3 = require("../../assets/img3.png")


const slides = [
    {
      key: 'one',
      title: 'Title 1',
      text: 'Servicio de Aseo',
      image: limpieza1,
      image2: icon1,
      desc: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico"
    },
    {
      key: 'two',
      title: 'Title 2',
      text: 'Servicio de Reparaciones',
      image: limpieza2,
      image2: icon2,
      desc: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico"
    },
    {
      key: 'three',
      title: 'Title 3',
      text: 'Servicio de Fumigación',
      image: limpieza3,
      image2: icon3,
      desc: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico",
      button: (navigation) => navigation.navigate("InicioSesion")
    }
  ];

const Onboarding = ({navigation}) => {

    const _renderItem = ({ item }) => {
        return (
            <View style={_styles.slide}>
                <Image source={item.image} style={_styles.image} resizeMode="contain" />
                <Image source={item.image2} style={_styles.image2} resizeMode="contain" />
                <View style={{height:40}} />
                <Text style={[styles.H1, {color: "#00A0BC", fontSize:28, paddingHorizontal:30, textAlign:"center"}]}>{item.text}</Text>
                <Text style={[styles.p, {color: "#6F757A", fontSize:14, paddingHorizontal: 40}]}>{item.desc}</Text>
                <View style={{height:30}} />
                {item.button && <Button title="Continuar" onPress={() => item.button(navigation)} />}
            </View>
        )
    };


    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />
            <AppIntroSlider
                data={slides}
                renderItem={_renderItem}
                showNextButton={false}
                showDoneButton={false}
                activeDotStyle={{backgroundColor: "#00A0BC"}}
                dotStyle={{backgroundColor: "#D8F6FE"}}
            />
        </SafeAreaView>
    )
}

export default Onboarding

const _styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        position: "relative",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    image: {
      width:"100%", 
      height:420,
    },
    image2: {
      width: 100,
      height: 100,
      position:"absolute",
      left:"50%",
      marginLeft: -50,
      top: 340
    },
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
    },
});