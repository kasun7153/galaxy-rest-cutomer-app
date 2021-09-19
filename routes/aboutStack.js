import React from 'react'
import HomeScreen from '../screens/categories'
import DetailsScreen from '../screens/category-items'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '../screens/about';
import Header from '../shared/header';

const Stack = createNativeStackNavigator();

export default function aboutStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="About Us" component={About} />
        </Stack.Navigator>
    )
}

