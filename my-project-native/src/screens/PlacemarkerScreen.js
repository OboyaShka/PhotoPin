import React from 'react'
import {SafeAreaView} from 'react-navigation'
import   {Image,Text, StyleSheet, View}from 'react-native'

const MapListScreen = ( {navigation})=>{
 
    return(
            <View  style={styles.container}>
                <View style={styles.box}>
                <Text style={styles.name}>{navigation.getParam('item').name}</Text>
                <View style={styles.image}>
                    <Image source={{uri: `http://178.248.1.62:8080${navigation.getParam('item').photos[0].url}`}} style={{width:300, height: 300}}/>
                </View>
                <Text style={styles.description}>{navigation.getParam('item').description}</Text>
                <Text style={styles.author}>{navigation.getParam('item').users_permissions_user.username}</Text>
                {console.log(navigation.getParam('item').users_permissions_user.username)}
                </View>
                {/* <Text>{navigation.getParam('item').id}</Text>
                <Text>{navigation.getParam('item').text}</Text>
                {console.log(navigation.getParam('item').photo_1280)}
                <Image source={{uri:navigation.getParam('item').photo_1280}} style={{width:300, height: 300}}/> */}
            </View>
    )

}

const styles = StyleSheet.create({
    image:{
        width: 100,
        height: 100
    },
    container:{
        flex: 1,
        backgroundColor:'#7dcdcd',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    name:{
        paddingTop:20,
        fontWeight:'bold',
        fontSize:35,
        textAlign: 'center',
    },
    box:{
        backgroundColor:"#c0e8e8",
        borderRadius: 20,
        borderColor: '#000',
        borderWidth:2,
        width: "95%",
        marginTop:15,
        
    },
    description:{
        width: "95%",
        marginTop:10,
        textAlign: 'center',
        paddingBottom: 5
    },
    author:{
        fontWeight:'bold',
        fontSize:20,
        textAlign: 'right',
        marginRight: 20,
        paddingBottom: 20
    },
    image:{
        alignItems: 'center',
        paddingTop:10
    }
})


export default MapListScreen