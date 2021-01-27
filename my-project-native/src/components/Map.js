import React, { Component} from 'react';
import { Marker } from 'react-native-maps'
import  MapView, {Callout} from 'react-native-maps'
import {View, StyleSheet, Dimensions, Button, Text, Image} from 'react-native'
import MapStyles from '../MapStyles'
import Icon1 from '../images/pin1.png';
import Icon2 from '../images/pin2.png';
import Icon3 from '../images/pin3.png';


const height = Dimensions.get('window').height

const token = "77b6b82977b6b82977b6b829dd77c09835777b677b6b82917a6eb6874690d38af89c571"

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
            vkphotos: []
        }
    }



    componentDidMount() {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },error => this.setState({error: error.message})
            )

            let result = fetch(`https://api.vk.com/method/photos.search?access_token=${token}&v=${5.21}&count=${500}&lat=${56.8430983}&long=${60.6454083}` ,
            {
                method: 'get',
            })
            .then((response) => response.json().
            then((responseJson) => {
                this.setState({
                    isLoading: false,
                    vkphotos: responseJson.response.items
                })
            }))
            .catch((error) => {
                console.log(error)
            })
        
        
    } 

    goToPlacemarker(item){
        this.props.changeSm.changeSm( item )
    }

    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
          };
    return (
        
        <MapView 
            style={styles.map}
            loadingEnabled={true}
            region={{ 
                latitude: this.state.latitude,
                longitude:this.state.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            customMapStyle={MapStyles}
            >
        <Marker 
        icon={Icon3}
        coordinate={this.state}>
            <Callout  tooltip>
                <View>
                    <View style={styles.bubble}>
                        <Text>Вы здесь!</Text>
                        
                    </View>
                
                    </View>
                </Callout>
            </Marker>
        
        {this.state.vkphotos && 
            this.state.vkphotos.map((item, index) =>(
                <Marker
                    key={item.id}
                    icon={Icon3}
                    coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.long) }} 
                >
                <Callout onPress={this.goToPlacemarker.bind(this, item)}  tooltip>
                    <View>
                        <View style={styles.bubble}>
                        <Text>{item.id}</Text>
                        </View>
                    </View>
                </Callout>
                </Marker>
            ))
        
        }

        </MapView>
        

    )
}
}
const styles = StyleSheet.create({
    map:{
        height
    },
    image:{
        width: 50,
        height: 50
    },
    bubble:{
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#000',
        borderWidth:2,
        padding: 15,
        width:150 
    },
    arrow:{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder:{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    }
})

 