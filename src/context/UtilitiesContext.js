import React, { useState, createContext, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

export const UtilitiesContext = createContext();

const Provider = ({ children }) => {

    
    const [location, setLocationState] = useState({})
    const [loading, setLoading] = useState(false)

    const [tareas, setTareas2] = useState({})

    const [user, setUserState] = useState({})
    const [cart, setCart] = useState([])
    const [login, setLogin] = useState(async () => {

        try {
            setLoading(true)

            let _user = await AsyncStorage.getItem('user')
            if(_user) setUserState(JSON.parse(_user))
            let _location = await AsyncStorage.getItem('location')
            if(_location) setLocationState(JSON.parse(_location))
            let _cart = await AsyncStorage.getItem('cart')
            if(_cart) setCart(JSON.parse(_cart))
            let _tareas = await AsyncStorage.getItem('tareas')
            if(_tareas) setTareas2(JSON.parse(_tareas))

            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    })

    const setUser = (user) => {
        console.log("-->", user)
        setUserState(user)
        AsyncStorage.setItem('user',JSON.stringify(user));  
    }

    const setCartItems = (items) => {
        setCart([items, ...cart])
        AsyncStorage.setItem('cart', JSON.stringify([items, ...cart]));
    }

    const setTareas = (items) => {
        setTareas2({...tareas, ...items})
        AsyncStorage.setItem('tareas', JSON.stringify({...tareas, ...items}));
    }
    
    const clearCartItems = () => {
        setCart([])
        AsyncStorage.setItem('cart', JSON.stringify([]));
    }
    const clearTareas = () => {
        setTareas2({})
        AsyncStorage.setItem('tareas', JSON.stringify({}));
    }
    

    const value = {
        loading,
        location,
        setUser,
        user,
        cart,
        tareas,
        setTareas,
        setCartItems,
        clearTareas,
        clearCartItems
    }

    return (
        <UtilitiesContext.Provider value={value}>
            {children}
        </UtilitiesContext.Provider>
    )
}
export default {
    Provider,
    Consumer: UtilitiesContext.Consumer
};