import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { Header, Button } from '../components'
import { AntDesign } from '@expo/vector-icons'
import { API } from '../global/services';
import { UtilitiesContext } from '../context/UtilitiesContext'

const bg = require("../../assets/bgcaract.png")

const arrayfy = (obj) => {
    let ret = []
    Object.keys(obj).forEach(key => ret.push(obj[key]))
    return ret
}

const Caracterizacion = ({navigation}) => {

    const [indexGlobal, setindexGlobal] = useState(0)
    const [preguntas, setPreguntas] = useState({})
    const [respuestas, setRespuestas] = useState([])
    const [selected, setSelected] = useState({})
    const [selectedID, setSelectedID] = useState({})
    const [loading, setLoading] = useState(false)
    const [guardado, setGuardado] = useState(false)

    const { user } = useContext(UtilitiesContext)

    useEffect(() => {
        (async function () {
            if(Object.keys(preguntas).length > 0) return
            const res = await API.GET.getPreguntas()
            if(!res.error && res.message.result.length > 0) {
                let p = {}
                res.message.result.forEach(item => {
                    if(!p[item.idQu]) p[item.idQu] = {title: item.question, resp: {}}
                    else {
                        if(!p[item.idQu].resp[item.idAns]) p[item.idQu].resp[item.idAns] = {title: item.respon, id: item.idAns}
                    }
                })

                setPreguntas(p)
            }
        })()
    }, [preguntas])

    const guardar = async () => {
        setLoading(true)
        
        Object.keys(preguntas).forEach(async key => {
            //let p = preguntas[key]
            const res = await API.POST.save_pregunta({
                "idQuest": parseInt(key),
                "idAnsw": selectedID[key],
                "idUsu": user.id,
                "state" : 0
            })
            console.log(user.id, res)
        })

        setGuardado(true)
        
    
    }

    const next = (dir) => {
        let index, tot = Object.keys(preguntas).length;
        if(dir == 1) {
            index = indexGlobal + 1
            if(index > tot) {index = tot; guardar()}
        } else {
            index = indexGlobal - 1
            if(index < 0) index = 0
        }
        setindexGlobal(index)
        if(preguntas[index] && preguntas[index].resp) setRespuestas(arrayfy(preguntas[index].resp))

    }

    const seleccionar = (index, id) => {
        let seleccionados = {...selected}, seleccionadosID = {...selectedID};
        seleccionados[indexGlobal] = index
        seleccionadosID[indexGlobal] = id
        setSelected(seleccionados)
        setSelectedID(seleccionadosID)

    }

    return (
        <SafeAreaView style={styles.main}>
            
            <Header theme="dark" label={false}/>
            <View style={{position:"absolute", width:"100%", height:"100%", zIndex:-1, backgroundColor:"#00A0BC"}}></View>
            {indexGlobal > 0 && loading && !guardado &&
                <View style={{flexDirection:"column", position:"absolute", width:"100%", height:"100%", justifyContent:"center"}}>
                    <Text style={{color:"white", textAlign:"center", paddingVertical:20, fontSize:18}}>Guardando Respuestas...</Text>
                    <ActivityIndicator color="white" size={24} />
                </View>
            }

            {guardado &&
            <View style={{flexDirection:"column", position:"absolute", width:"100%", height:"100%", justifyContent:"center", zIndex:100}}>
                <Text style={{color:"white", textAlign:"center", paddingVertical:20, fontSize:18}}>Respuestas guardadas correctamente</Text>
                <Button title="Volver al Home" onPress={() => navigation.navigate("Home")} />
            </View>
            }           
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{paddingHorizontal:20, width:"100%"}}>

                {indexGlobal == 0 &&
                <View>
                    <View style={styles.rowCenter}>
                        <Image source={bg} style={{width:300, height: 250}} resizeMode="contain" />
                    </View>
                    <Text style={_styles.title} >Es importante asignarte un personal idoneo para tus servicios de Hogar</Text>
                    <View style={{height: 20}} />
                    <Text style={_styles.title} >¿Deseas hacer las preguntas de caracterización?</Text>
                    <View style={{height: 20}} />

                    <TouchableOpacity style={_styles.button} activeOpacity={0.8} onPress={() => next(1)}>
                        <Text style={_styles.buttonText} >Si deseo hacerlo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={_styles.button} activeOpacity={0.8} onPress={() => navigation.navigate("Home")}>
                        <Text style={_styles.buttonText}>No más adelante</Text>
                    </TouchableOpacity>
              
                </View>
                }
                
                {indexGlobal > 0 && !loading &&
                <View>
                    <Text style={_styles.subtitle}>{indexGlobal}/{Object.keys(preguntas).length}</Text>
                    <Text style={_styles.title} >{preguntas[indexGlobal].title}</Text>
                    <View style={{height: 30}} />
                    
                    {respuestas.map((item, index) => 
                    <TouchableOpacity key={index} style={[_styles.button, index == selected[indexGlobal] ? {backgroundColor:"#01BFE0"} : {}]} activeOpacity={0.8} onPress={() => seleccionar(index, item.id)}>
                        <Text style={[_styles.buttonText, index == selected[indexGlobal] ? {color:"white", fontFamily:"pp_bold"} : {}]}>{item.title}</Text>
                    </TouchableOpacity>
                    )}
                </View>
                }
 
                <View style={{height: 50}} />

            </ScrollView>
            {indexGlobal > 0 && !loading &&
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

