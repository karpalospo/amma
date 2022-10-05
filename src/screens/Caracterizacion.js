import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Header, Avatar} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import { API } from '../global/services';

const bg = require("../../assets/bgcaract.png")

const items = [
    {label: "Sabe lo que quiere"},
    {label: "No Sabe lo que quiere"},
    {label: "Otra Sabe lo que quiere"},
    {label: "Sabe lo que quiere"},
    {label: "No Sabe lo que quiere"},

]


const Caracterizacion = ({navigation}) => {


    const [indexGlobal, setindexGlobal] = useState(0)
    const [preguntas, setPreguntas] = useState([])

    useEffect(() => {
        (async function () {
            if(preguntas.length > 0) return
            const res = await API.GET.getPreguntas()
            if(!res.error && res.message.result.length > 0) setPreguntas(res.message.result) 
        })()
    }, [preguntas])

    const next = (dir) => {
        if(dir == 1) {
            if(indexGlobal < preguntas.length - 1) setindexGlobal(indexGlobal + 1)
            console.log(preguntas[indexGlobal + 1])
        } else {
            if(indexGlobal > 0) setindexGlobal(indexGlobal - 1)
        }
    }

    return (
        <SafeAreaView style={styles.main}>
            
            <Header theme="dark" label={false}/>
            <View style={{position:"absolute", width:"100%", height:"100%", zIndex:-1, backgroundColor:"#00A0BC"}}></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{paddingHorizontal:20, width:"100%"}}>

                {indexGlobal == 0 &&
                <View>
                    <Text style={_styles.subtitle}>1/2</Text>
                    <View style={styles.rowCenter}>
                        <Image source={bg} style={{width:300, height: 250}} resizeMode="contain" />
                    </View>
                    <Text style={_styles.title} >Es importante asignarte un personal idoneo para tus servicios de Hogar</Text>
                    <View style={{height: 20}} />
                    <Text style={_styles.title} >¿Deseas hacer las preguntas de caracterización?</Text>
                    <View style={{height: 20}} />

                    <TouchableOpacity style={_styles.button} activeOpacity={0.8} onPress={() => setindexGlobal(1)}>
                        <Text style={_styles.buttonText} >Si deseo hacerlo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={_styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Home")}>
                        <Text style={_styles.buttonText}>No más adelante</Text>
                    </TouchableOpacity>
              
                </View>
                }
                {indexGlobal > 0 &&
                <View>
                    <Text style={_styles.subtitle}>2/2</Text>
                    <Text style={_styles.title} >Al realizar una compra, usted. (Actitud con la que llega el cliente)</Text>
                    <View style={{height: 30}} />
                    
                    {items.map((item, index) => 
                    <TouchableOpacity key={index} style={_styles.button} activeOpacity={0.8}>
                        <Text style={_styles.buttonText}>{item.label}</Text>
                    </TouchableOpacity>
                    )}
                </View>
                }
 
                <View style={{height: 50}} />

            </ScrollView>
            {indexGlobal > 0 &&
            <View style={[styles.row, {height: 60, padding:10}]}>
                <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => next(-1)}>
                    <AntDesign name="arrowleft" size={22} color="white" />
                    <Text style={_styles.next}>ATRAS</Text>
                </TouchableOpacity>
                <View style={{flex:1}} />
                <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => next(1)}>
                    <Text style={_styles.next}>SIGUIENTE</Text>
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>
            }
        </SafeAreaView>
    )

}

export default Caracterizacion


const _styles = {
    next: {fontSize:16, color: "white", fontFamily: "pp_regular", marginHorizontal: 6, marginTop: 4},
    subtitle: {fontSize:16, color: "white", textAlign: "center", fontFamily: "pp_regular", marginVertical: 8},
    title: {fontSize:18, color: "white", textAlign: "center", fontFamily: "pp_regular"},
    button: {padding:10, backgroundColor: "white", borderColor: "rgba(255,255,255,0.6)", borderWidth: 1, borderRadius: 10, marginVertical:10},
    buttonText: {fontSize:16, color: "#444", textAlign: "center", fontFamily: "pp_regular", marginVertical: 8},
}

