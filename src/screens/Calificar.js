import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Header, Avatar, TextArea} from '../components'
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler';


const deco1 = require("../../assets/deco1.png")



const Calificar = ({navigation}) => {

    //react-native-star-rating
    const [comentario, setComentario] = useState("")
    const [calificacion, setCalificacion] = useState(3)
    const [opciones, setOpciones] = useState([
        {id: 1, label:"Alegre", selected: true},
        {id: 2, label:"Amigable", selected: false},
        {id: 3, label:"Proactiva", selected: false},
        {id: 4, label:"Puntual", selected: false},
        {id: 5, label:"Conversadora", selected: false},
    ])

    const selectItem = (id) => {
        let items = [...opciones], index = items.findIndex(item => item.id == id)
        if(index >= 0) items[index].selected = !items[index].selected
        setOpciones(items)
    }

    return (
        <SafeAreaView style={styles.main}>
            
            <Header theme="dark" label="Califica el servicio" navigation={navigation} />
            <View style={{position:"absolute", width:"100%", height:160, zIndex:-1, backgroundColor:"#00A0BC"}}></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>

                <View style={{height:40}} />
                <View style={styles.rowCenter}>
                    <View style={_styles.image}>
                        <Image source={deco1} style={{width:"100%", height: 180, marginTop: -30}} resizeMode="contain" />
                        <Avatar />
                    </View>
                </View>
                <View style={{height:40}} />
                <Text style={_styles.title}>Liliana Martinez</Text>

                <View style={styles.rowCenter}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={calificacion}
                        emptyStar={'star-o'}
                        fullStar={'star'}
                        iconSet={'FontAwesome'}
                        selectedStar={(rating) => setCalificacion(rating)}
                        fullStarColor={'#E5B95F'}
                        emptyStarColor={'#E5B95F'}
                        starSize={30}
                        starStyle={{marginHorizontal:5}}
                    />
                </View>

                <Text style={_styles.p}>¿Qué fue lo que más te gustó?</Text>
                <View style={{height:20}} />
                
                <View style={[styles.rowLeft, {flexWrap: 'wrap'}]}>
                {opciones.map((item, index) => 
                    <TouchableOpacity onPress={() => selectItem(item.id)} key={index} style={[_styles.itemButton, item.selected ? {backgroundColor:"#00A0BC"} : {}]} >
                        <Text style={[_styles.itemText, item.selected ? {color:"white"} : {}]}>{item.label}</Text>
                    </TouchableOpacity>
                )
                }
                </View>
                <View style={{height:20}} />
                <TextArea
                    placeholder="Déjanos tus comentarios" 
                    value={comentario} onChange={text => setComentario(text)}
                />


                <View style={{height:30}} />
                <Button title="Calificar" onPress={() => navigation.navigate("Home")} />

            </ScrollView>
        </SafeAreaView>
    )

}

export default Calificar


const _styles = {
    title: {fontSize:26, color: "#00A0BC", textAlign: "center", fontFamily: "pp_regular"},
    p: {fontSize:15, color: "#6F757A", textAlign: "center", marginHorizontal: 20, marginVertical: 10, fontFamily: "pp_regular"},
    label: {fontSize:15, color: "#6F757A", fontFamily: "pp_bold"},
    text: {fontSize:15, color: "#6F757A", fontFamily: "pp_regular"},
    image: {width: "100%", height:120, position: "relative"},

    itemButton:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor: "#B8F4FF",
        margin: 6,
        borderRadius: 15
    },
    itemText:{
        color: "#00A0BC",
        fontFamily: "pp_bold"
    }
}

