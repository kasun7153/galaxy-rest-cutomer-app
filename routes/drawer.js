import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StyleSheet} from 'react-native'
import CategoriesStack from './categoriesStack'
import AboutStack from './aboutStack'

const Drawer = createDrawerNavigator();

export default function drawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName="Categories">
                <Drawer.Screen name="Categories" component={CategoriesStack} />
                <Drawer.Screen name="About Us" component={AboutStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
