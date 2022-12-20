import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, ScrollView} from 'react-native';
import Card from './Card';
import PadView from './PadView';
import Image from './Image';
import ProgressBar from './ProgressBar';
import TareasList from './TareasList';
import Button from './Button';
import Input from './Input';
import { FontAwesome } from '@expo/vector-icons'; 
import { UtilitiesContext } from '../context/UtilitiesContext'
import moment from 'moment/min/moment-with-locales';


const backtareasImg = require('../../assets/back-tareas.png')

const arrayfy = (obj) => {
    let ret = []
    Object.keys(obj).forEach(key => ret.push(obj[key]))
    return ret
}

const TareasCard = ({
    color="#0182E0",
    title="",
    infoTareas = {total:1, completed: 0}, 
    tareas = {},
    cb_click,
    cb_save
}) => {

    const [edit, setEdit] = useState(false)
    const [tarea, setTarea] = useState("")
    
    const { user, setUser, setTareas, clearTareas } = useContext(UtilitiesContext)

    const guardar = () => {
        if(tarea.trim() == "") return
        
        let t = {...tareas}, m = moment().valueOf()
        if(cb_save) cb_save({id:m, date:m, text:tarea, completed: false, formatdate: moment(m).format("YYYY-MM-DD")})
        else {
            t[m] = {id:m, date:m, text:tarea, completed: false}
            setTareas(t)
        }
        setTarea("")
        setEdit(false)
    }

    const cb = (item) => {
        if(cb_click) return cb_click(item)
        let t = {...tareas}
        t[item.id].completed = !tareas[item.id].completed
        setTareas(t)
    }

    infoTareas.total = Object.keys(tareas).length
    infoTareas.completed = 0
    Object.keys(tareas).forEach(key => {
        if(tareas[key].completed) infoTareas.completed++
    })

    return (
        <Card bgColor="#E8F6FF">
            <View style={[styles.cardTitle, {backgroundColor:color}]}>
                <PadView padding="13 17">
                    <Text style={styles.cardTitleText}>{title}</Text>
                </PadView>
                <PadView rows justy="flex-end">
                    <Image src={backtareasImg} tintColor="white" size={36} style={{marginRight:10}} />
                    {/*<Text style={[styles.cardTitleText, {fontSize:12, textAlign:"center", width:50, paddingRight:15}]}>{infoTareas.completed} / {infoTareas.total}</Text>*/}
                </PadView>
            </View>
            
            <PadView padding="20">
                <View style={{height:10}} />
                {infoTareas.total > 0 && <ProgressBar color="#0097B1" progress={infoTareas.completed / infoTareas.total * 100} />}
                {infoTareas.total == 0 && <Text style={{textAlign:"center", fontSize:17, color: "#999"}}>Agrege una tarea</Text>}
                <View style={{height:20}} />
                {arrayfy(tareas).map(item => <TareasList key={String(item.id)} item={item} callback={item => cb(item)}/>)}
            </PadView>

            <PadView padding="15">
                <Button style={{backgroundColor: color}} title="Agregar Tareas" onPress={() => setEdit(true)} />
                {/*<Button onPress={() => clearTareas()} title="clear" textColor="white" />*/}
            </PadView>
            <View style={{height:30}} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={edit}
            >
                <View style={{flex:1, backgroundColor: "rgba(0,0,0,0.6)"}}>
                    <View style={{backgroundColor:"white", height: "40%", position:"absolute", left: 0, bottom: 0, width:"100%", padding:10, borderTopLeftRadius:15, borderTopRightRadius:15}} >
                    <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                        <TouchableOpacity onPress={() => setEdit(false)} style={{width:35, height:35, borderRadius:18, backgroundColor:"#222", alignItems:"center", justifyContent:"center"}}>
                            <FontAwesome name="times" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    
                    <ScrollView keyboardShouldPersistTaps="never">
                        <View style={{marginHorizontal:20}}>
                            <Input label="Nueva Tarea" type="default" value={tarea} onChange={text => setTarea(text)} />
                            <View style={{height:20}}></View>
                            <Button
                                onPress={() => guardar()}
                                title="Guardar" 
                                textColor="white" 
                            />
                        </View>
                    </ScrollView>
                </View>
                </View>
            </Modal>
        </Card>
    )
    
}



export default TareasCard


const styles = {

    title: {
        fontFamily: "pp_regular",
        fontSize: 18,
        color: "white",
        textAlign: "center",
    },

    cardTitle: {
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    cardTitleText: {
        fontSize:17,
        color: "white", 
        fontFamily: "pp_bold", 
        opacity:0.9
    },
    
}
