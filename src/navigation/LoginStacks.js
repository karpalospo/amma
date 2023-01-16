import React, {useContext, useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import CrearCuenta from '../screens/CrearCuenta'
import InicioSesion from '../screens/InicioSesion'
import OlvidoContrasena from '../screens/OlvidoContrasena'
import Onboarding from '../screens/Onboarding'


const Stack = createStackNavigator()

const LoginStacks = () => {
    
    return (
        <Stack.Navigator initialRouteName={"Onboarding"}>

            <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown:false }}/>
            <Stack.Screen name='CrearCuenta' component={CrearCuenta} options={{ headerShown:false }}/>
            <Stack.Screen name='OlvidoContrasena' component={OlvidoContrasena} options={{ headerShown:false }}/>
            <Stack.Screen name='InicioSesion' component={InicioSesion} options={{ headerShown:false }}/>

        </Stack.Navigator>
    )
}
export default LoginStacks