import Home from '../screens/home';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drawer from './drawer';
import {useSelector} from 'react-redux';
import * as RootNavigation from '../RootNavigation.js';

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: {backgroundColor: 'white'},
  headerTitleStyle: {color: 'black'},
  headerTintColor: '#ccc',
  headerShown: false,
};

export default function navigator({navigation}) {

  const userManager = useSelector((state) => state.userManagementReducer);

  React.useEffect(() => {
    if(userManager.tableNumber && userManager.customerName && userManager.idNumber){
      RootNavigation.navigate('Drawer')
    } else {
      RootNavigation.navigate('Login')
    }
  }, [userManager]);

  return(
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Home}/>
        <Stack.Screen name="Drawer" component={Drawer}/>
      </Stack.Navigator>
  )
}
