import React from 'react'
import {SafeAreaView} from 'react-navigation'
import {Text, StyleSheet, Button,View} from 'react-native'
import Map from '../components/Map'



const MapScreen = ( {navigation} )=>{

    const changeSm = (item) => {
        navigation.navigate("Placemarker", {item})
    }
    
    const changeVkSm = (item) => {
        navigation.navigate("PlacemarkerVk", {item})
    }

    return(
            <Map  changeSm ={{ changeSm }} changeVkSm ={{ changeVkSm }}/> 
    )
}

export default MapScreen