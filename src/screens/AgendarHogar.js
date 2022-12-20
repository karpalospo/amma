import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, ScrollView, StyleSheet, Image, Switch, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import {Button, Jornada, Header} from '../components'
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

let data = {}

const AgendarHogar = ({navigation, route}) => {

    data = route.params.data;

 
    let esteDia = moment(), maxDay, minDay
    minDay = esteDia.format("YYYY-MM-DD")
    maxDay = moment().businessAdd(60).format("YYYY-MM-DD")

    const [switche, setSwitche] = useState(false);
    const [jornada, setJornada] = useState();
    const [repeticion, setRepeticion] = useState();
    const [meses, setMeses] = useState("12");
    const [selected, setSelected] = useState({});

    const next = () => {
        let dias = []
        Object.keys(selected).forEach(key => {
            dias.push({date: key})
        })

        data.jornada = jornada
        data.programa = dias

        if(Object.keys(selected).length == 0) {
            return Alert.alert("Servicios AMMA", "Seleccione por lo menos un día")
        }
        navigation.navigate("AgendarMapa", {data})
    }

    return (
        <SafeAreaView style={styles.main}>
            
            <Header label="Agendar" navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{padding:20, width:"100%"}}>

                <Text style={{color:"#00A0BC", textAlign: "center", fontSize: 16, fontFamily:"pp_regular"}}>Selecciona la agenda de tu servicio</Text>

                <Calendar 
                    horizontal={true}
                    style={{
                        paddingBottom:10,
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

                {/*<View style={[styles.rowCenter]}>
                    <Text style={{fontSize: 17, fontFamily:"pp_regular", color:"#00A0BC", paddingRight:4}}>Repetir</Text>
                    <Switch
                        trackColor={{ false: "#888", true: "#00adf5" }}
                        thumbColor="#fff"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={value => setSwitche(value)}
                        value={switche}
                />
                </View>*/}

                {switche && <Jornada items={repeticiones} justify="center" numMeses={meses} changeMeses={text => setMeses(text)} onChange={value => setRepeticion(value)} />}
                <Text style={{fontSize: 16, textAlign:"center", fontFamily:"pp_regular", color:"#00A0BC", paddingTop:15}}>Jornada que deseas</Text>
                <View style={{height:10}}></View>
                <Jornada items={data.jornadas} onChange={value => setJornada(value)} />

                <View style={{height:50}}></View>

                <Button title="Continuar" onPress={() => next()} />
                    
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