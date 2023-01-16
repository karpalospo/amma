import React, {useContext, useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import Agendar from '../screens/AgendarServicio'
import AgendarHogar from '../screens/AgendarHogar'
import AgendarMapa from '../screens/AgendarMapa'
import AgendarRequerimientos from '../screens/AgendarRequerimientos'
import AgendarAsignacion from '../screens/AgendarAsignacion'
import Calificar from '../screens/Calificar'
import Detalles from '../screens/Detalles'
import Perfil from '../screens/Perfil'
import EditarPerfil from '../screens/EditarPerfil'
import Caracterizacion from '../screens/Caracterizacion'
import Historial from '../screens/Historial'
import Ayuda from '../screens/Ayuda'

const Stack = createStackNavigator()

const AppStacks = () => {
    
    return (
        <Stack.Navigator initialRouteName={"Home"}>

            <Stack.Screen name='Home' component={Home} options={{ headerShown:false }}/>
            <Stack.Screen name='Agendar' component={Agendar} options={{ headerShown:false }}/>
            <Stack.Screen name='AgendarHogar' component={AgendarHogar} options={{ headerShown:false }}/>
            <Stack.Screen name='AgendarMapa' component={AgendarMapa} options={{ headerShown:false }}/>
            <Stack.Screen name='AgendarRequerimientos' component={AgendarRequerimientos} options={{ headerShown:false }}/>
            <Stack.Screen name='AgendarAsignacion' component={AgendarAsignacion} options={{ headerShown:false }}/>
            <Stack.Screen name='Calificar' component={Calificar} options={{ headerShown:false }}/>
            <Stack.Screen name='Detalles' component={Detalles} options={{ headerShown:false }}/>
            <Stack.Screen name='Caracterizacion' component={Caracterizacion} options={{ headerShown:false }}/>
            <Stack.Screen name='Perfil' component={Perfil} options={{ headerShown:false }}/>
            <Stack.Screen name='EditarPerfil' component={EditarPerfil} options={{ headerShown:false }}/>
            <Stack.Screen name='Historial' component={Historial} options={{ headerShown:false }}/>
            <Stack.Screen name='Ayuda' component={Ayuda} options={{ headerShown:false }}/>

        </Stack.Navigator>
    )
}
export default AppStacks