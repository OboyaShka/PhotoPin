import React from 'react'
import {SafeAreaView} from 'react-navigation'
import   {Image,Text, StyleSheet, View}from 'react-native'
import { render } from 'react-dom'

const MapListScreen = ( {navigation})=>{
 
    // async function getProfile(ownerId){
    //     try{
    //     let profile
    //     console.log(`https://api.vk.com/method/users.get?v=5.52&user_ids=${ownerId}&access_token=77b6b82977b6b82977b6b829dd77c09835777b677b6b82917a6eb6874690d38af89c571`)
    //     let result = await fetch(`https://api.vk.com/method/users.get?v=5.52&user_ids=${ownerId}1&access_token=77b6b82977b6b82977b6b829dd77c09835777b677b6b82917a6eb6874690d38af89c571`,
    //         {
    //             method: 'get',
    //         })
    //         .then((response) => response.json().
    //             then((responseJson) => {
    //                 console.log(1)
    //                 //profile = responseJson.first_name
    //             }))
    //         .catch((error) => {
    //             console.log(error)
    //         })
    //     console.log(profile)
    //     return (<Text style={styles.author}>{profile}</Text>)
    //     }catch(error) {
    //         console.log(error)
    //     }
    // }

    return(
            <View  style={styles.container}>
                <View style={styles.box}>
                <Text style={styles.name}>{navigation.getParam('item').id}</Text>
                <View style={styles.image}>
                    <Image source={{uri: navigation.getParam('item').photo_1280}} style={{width:300, height: 300}}/>
                </View>
                <Text style={styles.description}>{navigation.getParam('item').text}</Text>
                {/* {getProfile(navigation.getParam('item').owner_id)} */}
                
                </View>
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