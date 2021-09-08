import React from 'react'
import HomeScreen from '../screens/home'
import DetailsScreen from '../screens/details'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '../screens/about';
import Header from '../shared/header';

const Stack = createNativeStackNavigator();

export default function aboutStack() {
    return (
    
            <Stack.Navigator screenOptions={({ navigation, route }) => ({
                headerTitle: props => <Header navigation={navigation} route={route}/>,
            })}>
                <Stack.Screen name="About Us" component={About} />
            </Stack.Navigator>
       
    )
}

