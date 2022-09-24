import React, { useState, createContext, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

export const UtilitiesContext = createContext();

const Provider = ({ children }) => {

    
    const [location, setLocationState] = useState({})
    const [loading, setLoading] = useState(false)

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

            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    })

    const setUser = (user) => {
        setUserState(user)
        AsyncStorage.setItem('user',JSON.stringify(user));  
    }

    const setCartItems = (items) => {
        setCart([items, ...cart])
        AsyncStorage.setItem('cart', JSON.stringify([items, ...cart]));
    }

    const clearCartItems = () => {
        setCart([])
        AsyncStorage.setItem('cart', JSON.stringify([]));
    }

    const value = {
        loading,
        location,
        setUser,
        user,
        cart,
        setCartItems,
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