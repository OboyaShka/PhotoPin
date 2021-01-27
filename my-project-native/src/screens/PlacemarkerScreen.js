import React from 'react'
import {SafeAreaView} from 'react-navigation'
import   {Image,Text, StyleSheet, View}from 'react-native'

const MapListScreen = ( {navigation})=>{
 
    return(
            <View  style={styles.container}>

                <Text>{navigation.getParam('item').id}</Text>
                <Text>{navigation.getParam('item').text}</Text>
                {console.log(navigation.getParam('item').photo_1280)}
                <Image source={{uri:navigation.getParam('item').photo_1280}} style={{width:300, height: 300}}/>
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
        backgroundColor:'#7CA1B4',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default MapListScreen