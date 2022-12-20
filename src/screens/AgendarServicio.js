import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, StatusBar, ScrollView, StyleSheet, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Header} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { API } from '../global/services';

const aseo = require("../../assets/img1.png")
const hogar = require("../../assets/hogar.png")

let data = {}

const Agendar = ({navigation, route}) => {

    const {jornadas, user} = route.params
    

    const [menu, setMenu] = useState(null)
    const [tipos, setTipos] = useState(null);
    const [clases, setClases] = useState(null);

    useEffect(() => {
        (async () => {
        if(tipos == null) {
            const res = await API.GET.getTipoServicio()
            if(!res.error) setTipos(res.message.result)
        }})()
    }, [tipos])

    useEffect(() => {
        (async () => {
        if(clases == null) {
            const res = await API.GET.getClaseServicio()
            if(!res.error) setClases(res.message.result)
        }})()
    }, [clases])

    const next = (id) => {
        data.jornadas = jornadas
        data.usuario_id = user.id
        data.idTser = menu
        data.idClas = id
        navigation.navigate("AgendarHogar", {data})
    }


    return (
        <SafeAreaView style={styles.main}>
            <Header label="Agendar" navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>
    
                <Text style={{paddingVertical:35, color:"#00A0BC", fontSize: 17, paddingLeft:20}}>Elige el tipo de servicio que necesitas</Text>

                {menu == null && tipos && tipos.map(item => 
                    <TouchableOpacity key={item.id} onPress={() => setMenu(item.id)} style={[styles.rowLeft, _styles.item, {backgroundColor: "#0056BC"}]}>
                        <Image source={hogar} style={_styles.image} resizeMode="contain" />
                        <Text style={_styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                    )
                }

                {menu != null && clases && clases.map(item => 
                    <TouchableOpacity key={item.id} onPress={() => next(item.id)} style={[styles.rowLeft, _styles.item]}>
                        <Image source={aseo} style={_styles.image} resizeMode="contain" />
                        <Text style={_styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                    )
                }

            </ScrollView>
        </SafeAreaView>
    )

}

export default Agendar

const _styles = {
    item: {
        paddingLeft:20,
        backgroundColor: "#00A0BC",
        borderRadius: 10,
        paddingVertical:15,
        marginVertical: 10
    },

    itemText: {
        color: "white", 
        fontSize:17, 
        paddingLeft: 17, 
        fontFamily:"pp_bold"
    },

    image: {
        height: 100, 
        width: 100,
        borderRadius: 51,
        borderWidth:2,
        borderColor: "white",
        backgroundColor: "white",
    }
}