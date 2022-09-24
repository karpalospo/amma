import React, { useContext, useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, ActivityIndicator, SafeAreaView } from 'react-native'

import AppStacks from './AppStacks'
import { styles, COLORS } from '../global/styles'




const NavigationStack = () => {
     
    //const { isAuth, loading, getAuth, setAuth} = useContext(AuthContext)
    //const [user, setUser] = useState(false);


    /*useEffect(() => {
        if(user) return
        (async function () {
            setUser(await getAuth())
        })()
    });*/

    const isAuth = true;
    const loading = false;

    return (
        <NavigationContainer>
 
            {loading ? 

                <SafeAreaView style={styles.main}>

                    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>

                        <ActivityIndicator color="#999" />
                    </View>

                </SafeAreaView >

            : 
            isAuth === false ? 
                <View />
                : 
                <AppStacks />
                    
            }
        </NavigationContainer>
    )
}
export default NavigationStack

const _styles = {
    labelGris: {fontSize: 13, color: "#888", paddingVertical:2, paddingRight: 20},
    labelAzul: {fontSize: 16, paddingVertical:2, color: COLORS.blueText},
}