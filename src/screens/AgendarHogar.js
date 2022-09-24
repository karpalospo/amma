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

const AgendarHogar = ({navigation}) => {

    let esteDia = moment().businessAdd(0), maxDay, minDay
    minDay = esteDia.format("YYYY-MM-DD")
    maxDay = moment().businessAdd(60).format("YYYY-MM-DD")

    
    const [switche, setSwitche] = useState(false);
    const [jornadaIndex, setJornadaIndex] = useState(-1);

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
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={maxDay}
                    markingType={'custom'}
                    //markedDates={rango}
                    onDayPress={data => {
                        /*if(rango[data.dateString] != undefined) {
                            this.props.onSelect(data); 
                            this.setState({calendarioModal: false, date: data.timestamp})
                        }*/
                    }}
                    theme={{
                        backgroundColor: '#F8FCFF',
                        calendarBackground: '#F8FCFF',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#CCC',
                        textDisabledColor: '#CCC',
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
                {switche && <Jornada onChange={index => setJornadaIndex(index)} />}
                <View style={{height:20}}></View>
                <Text style={{fontSize: 16, fontFamily:"pp_regular", color:"#00A0BC", paddingRight:4}}>Jornada que deseas</Text>
                <View style={{height:10}}></View>
                <Jornada onChange={index => setJornadaIndex(index)} />

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