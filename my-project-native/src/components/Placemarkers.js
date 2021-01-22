import React from 'react';

import { Marker } from 'react-native-maps'
import  MapView from 'react-native-maps'
import { View } from 'react-native'


class Placemarkers extends React.Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            placemarkers: [],
        }

        this.loadPlaceMarkers()
    }

    loadPlaceMarkers(){
        return fetch('http://178.248.1.62:8080/placemarkers')
        .then((response) =>response.json())
        .then( (responseJson) => {
            this.setState({
                isLoading: false,
                placemarkers: responseJson
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    componentWillMount() {
        this.loadPlaceMarkers()
    }
    




    render() {
        return (
            <View>
                {this.state.placemarkers.map((item, index) => (
                    <Marker
                        key={item.id}
                        coordinate={{ latitude: parseFloat(item.latCur), longitude: parseFloat(item.lngCur) }}

                    />
                ))}
            </View>
        )

    }
}
//id,name,latCur,lngCur,description, photos


export default Placemarkers;