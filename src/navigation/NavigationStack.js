import React, { useContext, useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, ActivityIndicator, SafeAreaView } from 'react-native'

import LoginStacks from './LoginStacks'
import AppStacks from './AppStacks'
import { styles, COLORS } from '../global/styles'

import { UtilitiesContext } from '../context/UtilitiesContext'

const NavigationStack = () => {
     
    const { user, loading } = useContext(UtilitiesContext)
    //const [user, setUser] = useState(false);


    console.log(user)
    return (
        <NavigationContainer>
 
            {
                loading ? 

                <SafeAreaView style={styles.main}>

                    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>

                        <ActivityIndicator color="#999" />
                    </View>

                </SafeAreaView >

                : user.logged ? <AppStacks /> : <LoginStacks />
                
                    
            }
        </NavigationContainer>
    )
}
export default NavigationStack

const _styles = {
    labelGris: {fontSize: 13, color: "#888", paddingVertical:2, paddingRight: 20},
    labelAzul: {fontSize: 16, paddingVertical:2, color: COLORS.blueText},
}