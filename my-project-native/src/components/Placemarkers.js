import React from 'react';

import { Marker } from 'react-native-maps'
import MapView from 'react-native-maps'
import {Modal} from "react-native"
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import ModalPlacemarkers from "./ModalPlacemarkers"

class Placemarkers extends React.Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            placemarkers: [],
        }

        this.loadPlaceMarkers()
    }

    loadPlaceMarkers() {
        return fetch('http://178.248.1.62:8080/placemarkers')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    placemarkers: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {

    }

    modalActiveMarker(i, e) {
        this.currentItem = i;
        console.log("Всё круто!!!")
        this.setState({ ...this.state, modal_active: !this.state.modal_active })
    }




    render() {
        return (
            <View>
                {this.state.placemarkers.map((item, index) => (
                    <Marker
                        key={item.id}
                        coordinate={{ latitude: parseFloat(item.latCur), longitude: parseFloat(item.lngCur) }}
                        onPress={this.modalActiveMarker.bind(this, item)}
                    />
                ))}
            </View>
        )

    }
}

export default Placemarkers