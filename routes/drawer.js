import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StyleSheet} from 'react-native'
import HomeStack from './homeStack'
import AboutStack from './aboutStack'

const Drawer = createDrawerNavigator();

export default function drawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName="Notifications">
                <Drawer.Screen name="HomeStack" component={HomeStack} />
                <Drawer.Screen name="AboutStack" component={AboutStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
