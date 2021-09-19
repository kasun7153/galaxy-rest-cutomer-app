import React from 'react'
import CategoriesScreen from '../screens/categories'
import CategoryItemsScreen from '../screens/category-items'
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
                <Stack.Screen name="Home" component={CategoriesScreen} />
                <Stack.Screen name="Category-Items" initialParams={{ itemId: 42 }} component={CategoryItemsScreen} />
            </Stack.Navigator>
    
    )
}

