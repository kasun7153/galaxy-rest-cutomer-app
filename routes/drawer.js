import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import React from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import CategoriesStack from './categoriesStack';
import About from '../screens/about';
import logo from '../assets/logo.png';
import {AntDesign, Feather, Ionicons, MaterialIcons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import Ratings from '../screens/raings';
import TrackMyOrder from '../screens/trackMyOrder';
import {useDispatch} from 'react-redux';
import {resetUserDetails} from '../redux/userManagment/userManagementActions';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <View>
        <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
          <Image source={logo} style={{width: 100, height: 100}}/>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Help"
          icon={({focused, color, size}) => (<Feather name="help-circle" size={24} color="black"/>)}
          onPress={() => Linking.openURL('https://google.com')}
        />
      </View>
      <View>
        <DrawerItem
          label="New Customer"
          icon={({focused, color, size}) => (<MaterialIcons name="logout" size={24} color="black"/>)}
          onPress={() => {
            dispatch(resetUserDetails())
            //props.navigation.navigate('Login');
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function drawer({navigation}) {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Categories"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          drawerIcon: config => <Ionicons name="search" size={24} color="black"/>
        }}
        name="Categories"
        component={CategoriesStack}
      />
      <Drawer.Screen
        name="Track my order"
        component={TrackMyOrder}
        options={{
          drawerIcon: config => <AntDesign name="find" size={24} color="black"/>
        }}
      />

      <Drawer.Screen
        name="Ratings"
        component={Ratings}
        options={{
          drawerIcon: config => <Entypo name="star-outlined" size={24} color="black"/>
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={About}
        options={{
          drawerIcon: config => <Entypo name="info" size={24} color="black"/>
        }}
      />
    </Drawer.Navigator>
  );
}
