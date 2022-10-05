import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Card from './Card';
import PadView from './PadView';
import Image from './Image';
import ProgressBar from './ProgressBar';
import TareasList from './TareasList';
import Button from './Button';


const tareasImg = require('../../assets/tarea.png')
const backtareasImg = require('../../assets/back-tareas.png')

const TareasCard = ({
    color="#0182E0",
    title="",
    infoTareas = {total:1, completed: 0}, 
    tareas = [], 
    navigation, 
    callback
}) => {
    
    if(infoTareas.total == 0) {
        return (
            <Card onPress={() => navigation.navigate("tareas")} bgColor="#69A8D9" style={{marginVertical: 30}} >
                <View style={{alignItems: "center"}}><Image src={tareasImg} size={40} /></View>
                <Text style={[styles.title, {paddingTop:8}]}>Crea tus tareas</Text>
            </Card>
        )
    } else {
        return (
            <Card bgColor="#E8F6FF" style={{marginVertical: 30}}>
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
                    <ProgressBar color="#3D86BF" progress={infoTareas.completed / infoTareas.total * 100} />
                    <View style={{height:20}} />
                    <TareasList tareas={tareas} callback={item => {
                        callback(item)
                        
                    }}/>
                </PadView>

                <PadView padding="15">
                    <Button style={{backgroundColor: color}} title="Editar Tareas" onPress={() => navigation.navigate("tareas")} />
                </PadView>
                <View style={{height:30}} />
            </Card>
        )
    }
}



export default TareasCard


const styles = StyleSheet.create({

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
    
})
