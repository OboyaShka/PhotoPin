import React, { Component } from 'react';
import { Marker } from 'react-native-maps'
import MapView, { Callout } from 'react-native-maps'
import WebView from 'react-native-webview'
import {
    View,
    StyleSheet,
    Dimensions,
    Button,
    Text,
    Image,
    TouchableHighlight,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Animated,

} from 'react-native'
import MapStyles from '../MapStyles'
import Icon1 from '../images/pin1.png';
import Icon2 from '../images/pin2.png';
import Icon3 from '../images/pin3.png';
import Polyline from '@mapbox/polyline'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

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
            placemarkers: [],
            latMarker: 0,
            lngMarker: 0,
            coords: [],
            pointsDecode: [],
            mapAnimation: new Animated.Value(0),
            time: [],
            distance: []
        }
    }



    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        }, error => this.setState({ error: error.message })
        )

        let result = fetch(`https://api.vk.com/method/photos.search?access_token=${token}&v=${5.21}&count=${500}&lat=${56.8430983}&long=${60.6454083}`,
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

        fetch(`http://178.248.1.62:8080/placemarkers`).then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response From Server')
            }
            return response.json();
        }).then((placemarkers) => {


            this.state.mapAnimation.addListener(({ value }) => {
                let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
                if (index >= placemarkers.length) {
                    index = placemarkers.length - 1;
                }
                if (index <= 0) {
                    index = 0;
                }
            })


            this.setState({ placemarkers: placemarkers });

        })




    }

    goToPlacemarker(item) {


        this.props.changeSm.changeSm(item)
        this.setState({
            latitude: item.latCur,
            longitude: item.lngCur
        })
    }

    goToVkPlacemarker(item) {


        this.props.changeVkSm.changeVkSm(item)
        this.setState({
            latitude: item.latCur,
            longitude: item.lngCur
        })
    }

    async layRoad(item) {

        navigator.geolocation.getCurrentPosition(position => {

            this.latitudeCur = position.coords.latitude
            this.longitudeCur = position.coords.longitude

        }, error => this.setState({ error: error.message })
        )

        const startLoc = `${this.latitudeCur},${this.longitudeCur}`
        const desLoc = `${item.latCur},${item.lngCur}`
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyCPBg6Dop1NroqPhgDMj4UVnn5bGsio1d0&mode=walking`,
            {
                method: 'get',
            })
            .then((response) => response.json().then((respJson) => {
                const distance = respJson.routes[0].legs[0].distance.text
                const time = respJson.routes[0].legs[0].duration.text

                const points = Polyline.decode(respJson.routes[0].overview_polyline.points)
                const coords = points.map(point => {
                    return {
                        latitude: point[0],
                        longitude: point[1]
                    }
                })
                this.setState({
                    isLoading: false,
                    coords: coords,
                    distance: distance,
                    time: time
                })
            }))
            .catch((error) => {
                console.log(error)
            })


        this.setState({
            latitude: item.latCur,
            longitude: item.lngCur
        })
    }

    render() {


        return (
            <View style={styles.container}>
                <MapView
                    showsUserLocation
                    style={styles.map}
                    loadingEnabled={true}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    customMapStyle={MapStyles}
                >

                    {this.state.vkphotos &&
                        this.state.vkphotos.map((item, index) => (
                            <Marker
                                key={`${index}${item.id}`}
                                icon={Icon2}
                                coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.long) }}
                            >
                                <Callout onPress={this.goToVkPlacemarker.bind(this, item)} tooltip>
                                    <View style={styles.card}>
                                        <Text style={{ width: CARD_WIDTH, height: CARD_HEIGHT, position: "absolute" }}>
                                            <Image
                                                source={{ uri: item.photo_604 }}
                                                style={{ width: CARD_WIDTH, height: CARD_HEIGHT / 3 * 2 }}
                                                resizeMode="cover"
                                            />
                                        </Text>
                                        <View style={styles.textContent}>
                                            <Text numberOfLines={1} style={styles.cardtitle}>{item.id}</Text>
                                        </View>
                                    </View>
                                    
                                </Callout>
                            </Marker>
                        ))

                    }

                    {this.state.placemarkers &&
                        this.state.placemarkers.map((item, index) => (

                            <Marker
                                key={item.id}
                                icon={Icon3}
                                coordinate={{
                                    latitude: parseFloat(item.latCur),
                                    longitude: parseFloat(item.lngCur)
                                }}
                                onPress={this.layRoad.bind(this, item)}
                            >

                                <MapView.Callout onPress={this.goToPlacemarker.bind(this, item)} tooltip>
                                    <View style={styles.card}>
                                        <Text style={{ width: CARD_WIDTH, height: CARD_HEIGHT, position: "absolute" }}>
                                            <Image
                                                source={{ uri: `http://178.248.1.62:8080${item.photos[0].url}` }}
                                                style={{ width: CARD_WIDTH, height: CARD_HEIGHT / 3 * 2 }}
                                                resizeMode="cover"
                                            />
                                        </Text>
                                        <View style={styles.textContent}>
                                            <Text numberOfLines={1} style={styles.cardtitle}>{item.name}</Text>
                                            <Text numberOfLines={1} style={styles.cardDescription}>{item.description}</Text>
                                        </View>
                                    </View>
                                    {/* <View style={styles.bubble}>
                                        <Text style={styles.bubbleText}>
                                            {item.name}
                                        </Text>
                                        <View style={styles.bubbleimage}>
                                            <WebView style={styles.image} source={{ uri: `http://178.248.1.62:8080${item.photos[0].formats.small.url}`}} resizeMode="cover"/>
                                        </View>
                                        
                                    </View> */}
                                </MapView.Callout>
                            </Marker>

                        ))

                    }
                    {this.state.coords &&
                        <MapView.Polyline
                            strokeWidth={6}
                            strokeColor="rgb(9, 129, 130)"
                            coordinates={this.state.coords}
                        />
                    }

                </MapView>
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Найти место"
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        style={{ flex: 1, padding: 0 }}
                    />
                </View>
                {this.state.placemarkers &&
                    <Animated.ScrollView
                        horizontal
                        pagingEnabled
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH + 20}
                        snapToAlignment="center"
                        style={styles.scrollView}
                        contentInset={{
                            top: 0,
                            left: SPACING_FOR_CARD_INSET,
                            bottom: 0,
                            right: SPACING_FOR_CARD_INSET
                        }}
                        contentContainerStyle={{
                            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                        }}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: this.state.mapAnimation,
                                        }
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}
                    >
                        {this.state.placemarkers.map((item, index) => (
                            <View style={styles.card} key={index}>
                                <Image
                                    source={{ uri: `http://178.248.1.62:8080${item.photos[0].url}` }}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardtitle}>{item.name}</Text>
                                    <Text numberOfLines={1} style={styles.cardDescription}>{item.description}</Text>
                                    <View style={styles.button}>
                                        <TouchableOpacity
                                            onPress={this.goToPlacemarker.bind(this, item)}
                                            style={[styles.signIn, {
                                                borderColor: '#rgb(0,169,157)',
                                                borderWidth: 1
                                            }]}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#rgb(0,169,157)'
                                            }]}>Подробнее</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </Animated.ScrollView>
                }

            </View>
        )
    }
}

{/* <Text  style={styles.bubbleImage}>
                                            <Image style={styles.image} source={{ uri: `http://178.248.1.62:8080${item.photos[0].url}` }} resizeMode="contain" />
                                        </Text> */}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        height
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardText: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    image: {
        width: 200,
        height: 90,

    },
    bubble: {
        flexDirection: "column",
        alignSelf: 'flex-start',
        //alignItems: "center",
        backgroundColor: 'rgb(221,253,253)',
        borderRadius: 6,
        borderColor: '#000',
        borderWidth: 2,

    },
    bubbleText: {
        fontWeight: 'bold',
        fontSize: 15,

    },
    bubbleImage: {


    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
})

