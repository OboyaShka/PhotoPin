import React from 'react';
import { Marker } from 'react-native-maps'
import  MapView from 'react-native-maps'
import {StyleSheet, Dimensions} from 'react-native'
import MapStyles from '../MapStyles'
import Placemarkers from './Placemarkers'


const height = Dimensions.get('window').height

const Map = () =>{
    return (
        <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{ 
                latitude: 56.837650,
                longitude:60.594528,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            customMapStyle={MapStyles}
            >

            <Placemarkers/>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map:{
        height
    }
})

export default Map