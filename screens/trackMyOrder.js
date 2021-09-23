import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import logo from '../assets/logo.png';
import axios from 'axios';
import {useSelector} from 'react-redux';
import config from '../config/config.json';

export default function TrackMyOrder({navigation}) {
  const {customerName, idNumber, tableNumber} = useSelector((state) => state.userManagementReducer);
  const [myOrders, setMyOrders] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${config.API}/order/${idNumber}`).then(({data}) => {
      setMyOrders(data);
    }).catch(e => {
      console.log(e);
    });
  }, []);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <View style={{marginLeft: 75}}>
          <Text style={{color: 'black', fontWeight: '700', textAlign: 'center', fontSize: 18}}>
            Track My Orders
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 15}}>
          <MaterialIcons name="menu" size={28} onPress={() => navigation.openDrawer()}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={{width: 200, height: 200., marginTop: 20}}/>
      <Text style={{fontSize: 18, textAlign: 'center', marginTop: 20}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad animi aspernatur at, cum distinctio dolores eos
        expedita necessitatibus nobis optio porro ratione rem sed voluptates. Aspernatur deserunt dolorem libero.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  }
});
