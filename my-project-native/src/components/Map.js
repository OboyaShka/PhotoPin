import React, { Component} from 'react';
import { Marker , Polyline } from 'react-native-maps'
import  MapView, {Callout} from 'react-native-maps'
import {View, StyleSheet, Dimensions, Button, Text, Image, TouchableHighlight} from 'react-native'
import MapStyles from '../MapStyles'
import Icon1 from '../images/pin1.png';
import Icon2 from '../images/pin2.png';
import Icon3 from '../images/pin3.png';


const height = Dimensions.get('window').height

const token = "77b6b82977b6b82977b6b829dd77c09835777b677b6b82917a6eb6874690d38af89c571"

const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjExODQ4NTY2LCJleHAiOjE2MTQ0NDA1NjZ9.SS7SD0RtVf94tMahjKJlTeG__KsALZo_Ke7pOovL2zE"

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
            vkphotos: [],
            placemarkers:[],
            latMarker: 0,
            lngMarker: 0,
            points:[],
            pointsDecode:[]
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

            // let result = fetch(`https://api.vk.com/method/photos.search?access_token=${token}&v=${5.21}&count=${500}&lat=${56.8430983}&long=${60.6454083}` ,
            // {
            //     method: 'get',
            // })
            // .then((response) => response.json().
            // then((responseJson) => {
            //     this.setState({
            //         isLoading: false,
            //         vkphotos: responseJson.response.items
            //     })
            // }))
            // .catch((error) => {
            //     console.log(error)
            // })

            fetch(`http://178.248.1.62:8080/placemarkers`).then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response From Server')
            }
            return response.json();
        }).then((placemarkers) => {
            this.setState({ placemarkers: placemarkers });
        })
        
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${50,50}&destination=${60,60}&key=AIzaSyCPBg6Dop1NroqPhgDMj4UVnn5bGsio1d0`,
        {
                method: 'get',
            })
            .then((response) => response.json().
            then((respJson) => {

                this.setState({
                    isLoading: false,
                    points: respJson.routes[0].overview_polyline.points
                })
            }))
            .catch((error) => {
                console.log(error)
            })

       

    } 

    goToPlacemarker(item){
        this.props.changeSm.changeSm( item )
    }

    layRoad(item){
        this.state.latMarker = item.latCur
        this.state.lngMarker = item.lngCur
        this.setState(this.state)
    }

    render() {
        pointsDecode = Polyline.decode(this.state.points)
        console.log(this.state.points)
    return (
        
        <MapView 
            showsUserLocation
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
                    
     
        {/* <Marker 
        icon={Icon3}
        coordinate={
            {
                latitude: this.state.latitude,
                longitude:this.state.longitude,
            }
        }>
            <Callout  tooltip>
                <View>
                    <View style={styles.bubble}>
                        <Text>Вы здесь!</Text>
                        
                    </View>
                
                    </View>
                </Callout>
            </Marker> */}
        
        {this.state.placemarkers  && 
            this.state.placemarkers.map((item, index) =>(
                
                <Marker
                    key={item.id}
                    icon={Icon3}
                    coordinate={{ 
                        latitude: parseFloat(item.latCur), 
                        longitude: parseFloat(item.lngCur) }} 
                        onPress={this.layRoad.bind(this, item)}
                >
 
                <Callout onPress={this.goToPlacemarker.bind(this, item)}  tooltip>
                    <View>
                        <View style={styles.bubble}>
                        <Text>{item.name}</Text>
                        </View>
                    </View>
                </Callout>
                </Marker>
            ))
        
        }
   
       <Polyline  
		coordinates={[
            { latitude:  this.state.latitude, longitude:  this.state.longitude },

			{ latitude:  this.state.latMarker, longitude:  this.state.lngMarker }
		]}
		strokeColor="rgb(9, 129, 130)" // fallback for when `strokeColors` is not supported by the map-provider

		strokeWidth={6}
	    />
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

// {this.state.vkphotos && 
//     this.state.vkphotos.map((item, index) =>(
//         <Marker
//             key={item.id}
//             icon={Icon3}
//             coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.long) }} 
//         >
//         <Callout onPress={this.goToPlacemarker.bind(this, item)}  tooltip>
//             <View>
//                 <View style={styles.bubble}>
//                 <Text>{item.id}</Text>
//                 </View>
//             </View>
//         </Callout>
//         </Marker>
//     ))

// }