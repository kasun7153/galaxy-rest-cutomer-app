import React from 'react'
import HomeScreen from '../screens/home'
import DetailsScreen from '../screens/details'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../shared/header';

const Stack = createNativeStackNavigator();

export default function homeStack() {
    return (
            <Stack.Navigator
            screenOptions={({ navigation, route }) => ({
                headerTitle: props => <Header navigation={navigation} route={route}/>,
              })}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" initialParams={{ itemId: 42 }} component={DetailsScreen} />
            </Stack.Navigator>
    
    )
}

