import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, StyleSheet, Image, Switch } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Jornada, Header} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment-business-days';


LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
    today: 'Hoy\'Hoy'
};

LocaleConfig.defaultLocale = 'es';

moment.locale('es-us')

moment.updateLocale('es-us', {
    holidays: [],
    holidayFormat: 'YYYY-MM-DD',
    workingWeekdays: [1, 2, 3, 4, 5, 6]
});

const jornadas = [
    {label: "Mañana", value:"mañana", label2:"6 am a 12 pm"},
    {label: "Tarde", value:"tarde", label2:"1 pm a 6 pm"},
    {label: "Completa", value:"completa", label2:"6 am a 6 pm"},
]
const repeticiones = [
    {label:"Semanal", value:"semanal"}, 
    {label:"Mensual", value:"mensual"}
]


const dayStyle = {
    selected: true,
    customStyles: {
        container: {
            backgroundColor: '#01BFE0',
            borderRadius: 25
        },
        text: {
            color: 'white'
        },
    }
}



const AgendarHogar = ({navigation}) => {

    let esteDia = moment().businessAdd(0), maxDay, minDay
    minDay = esteDia.format("YYYY-MM-DD")
    maxDay = moment().businessAdd(60).format("YYYY-MM-DD")

    const [switche, setSwitche] = useState(false);
    const [jornada, setJornada] = useState();
    const [repeticion, setRepeticion] = useState();
    const [meses, setMeses] = useState("12");
    const [selected, setSelected] = useState({});

    return (
        <SafeAreaView style={styles.main}>
            
            <Header label="Agendar" navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>

                <Text style={{color:"#00A0BC", fontSize: 16, fontFamily:"pp_regular", paddingLeft:20}}>Elige cuales días necesitas el servicio</Text>

                <Calendar 
                    horizontal={true}
                    style={{
                        borderRadius: 12,
                        margin:20,
                        marginTop: 0,
                        paddingBottom:20,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                    minDate={minDay}
                    maxDate={maxDay}
                    markingType={'custom'}
                    markedDates={selected}
                    onDayPress={data => {
                        let d = {...selected}, day = data.dateString
                        if(selected[day] && selected[day].selected) delete d[day]
                        else {
                            d[day] = {...dayStyle}
                            if(repeticion == "semanal") {
                                d[moment(day).add(7, 'd').format("YYYY-MM-DD")] = {...dayStyle}
                                d[moment(day).add(14, 'd').format("YYYY-MM-DD")] = {...dayStyle}
                                d[moment(day).add(21, 'd').format("YYYY-MM-DD")] = {...dayStyle}
                            } else if(repeticion == "mensual") {
                                for(let i = 1; i < meses - 1; i++)
                                    d[moment(day).add(i, 'M').format("YYYY-MM-DD")] = {...dayStyle}
                            }
     
                        }
                        setSelected(d)
                        
                    }}
                    theme={{
                        backgroundColor: '#F8FCFF',
                        calendarBackground: '#F8FCFF',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#01BFE0',
                        arrowColor: '#01BFE0',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: '#01BFE0',
                        indicatorColor: 'blue',
                        textDayFontFamily: 'pp_regular',
                        textMonthFontFamily: 'pp_bold',
                        textDayHeaderFontFamily: 'pp_bold',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: 'bold',
                        textDayFontSize: 16,
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 16
                    }}
                />

                <View style={[styles.rowCenter]}>
                    <Text style={{fontSize: 17, fontFamily:"pp_regular", color:"#00A0BC", paddingRight:4}}>Repetir</Text>
                    <Switch
                        trackColor={{ false: "#888", true: "#00adf5" }}
                        thumbColor="#fff"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={value => setSwitche(value)}
                        value={switche}
                    />
                </View>
                {switche && <Jornada items={repeticiones} justify="center" numMeses={meses} changeMeses={text => setMeses(text)} onChange={value => setRepeticion(value)} />}
                <View style={{height:30}}></View>
                <Text style={{fontSize: 16, fontFamily:"pp_regular", color:"#00A0BC", paddingRight:4}}>Jornada que deseas</Text>
                <View style={{height:10}}></View>
                <Jornada items={jornadas} onChange={value => setJornada(value)} />

                <View style={{height:50}}></View>

                <Button title="Continuar" onPress={() => navigation.navigate("AgendarMapa")} />
                    
                <View style={{height:50}}></View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default AgendarHogar

const _styles = StyleSheet.create({

    headerCont: {
        borderBottomWidth: 1,
        borderColor: "#B8F4FF",
        justifyContent: "center"
    },

 


    
})