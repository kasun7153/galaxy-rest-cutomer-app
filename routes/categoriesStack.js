import React from 'react'
import CategoriesScreen from '../screens/categories'
import CategoryItemsScreen from '../screens/category-items'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../shared/header';
import AddToCart from '../screens/addToCart';

const Stack = createNativeStackNavigator();

export default function categoriesStack() {
    return (
            <Stack.Navigator
            screenOptions={({ navigation, route }) => ({
                headerTitle: props => <Header navigation={navigation} route={route}/>,
              })}
            >
                <Stack.Screen name="Home" component={CategoriesScreen} />
                <Stack.Screen name="Category-Items" component={CategoryItemsScreen} />
                <Stack.Screen name="Add-to-Cart" component={AddToCart} />
            </Stack.Navigator>
    
    )
}

