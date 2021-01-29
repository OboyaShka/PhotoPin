import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack';

import  MapScreen from '../screens/MapScreen'
import  PlacemarkerScreen from '../screens/PlacemarkerScreen'
import  PlacemarkerVkScreen from '../screens/PlacemarkerVkScreen'

const AppNavigator = createStackNavigator({
    Map:{
        screen: MapScreen,
        navigationOptions: {
            title: "Карта"
        }
    },
    Placemarker:{
        screen: PlacemarkerScreen,
        navigationOptions: ({navigation})=>({
            title: `${navigation.getParam('item').name}`
        })
    },
    PlacemarkerVk:{
        screen: PlacemarkerVkScreen,
        navigationOptions: ({navigation})=>({
            title: `${navigation.getParam('item').id}`
        })
    },
})

export default createAppContainer(AppNavigator)