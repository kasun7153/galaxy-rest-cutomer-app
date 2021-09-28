import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import logo from '../assets/logo.png';
import axios from 'axios';
import {useSelector} from 'react-redux';
import config from '../config/config.json';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import moment from 'moment';

export default function TrackMyOrder({navigation}) {
  const {customerName, idNumber, tableNumber} = useSelector((state) => state.userManagementReducer);
  const [myOrders, setMyOrders] = React.useState([]);

  const getOrders = ()=>{
    axios.get(`${config.API}/order/${idNumber}`).then(({data}) => {
      setMyOrders(data);
    }).catch(e => {
      console.log(e);
    });
  }

  React.useEffect(() => {
    getOrders();
    const getData = setInterval(()=>{
      getOrders();
    }, 5000)
    return () => {
      clearInterval(getData);
    };
  }, [navigation]);


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

  const getPrice=(order)=>{
    let price=0
    order?.foodItems?.forEach(item=>price+=item.qty * item.soldPrice)
    return price
  }

  return (
    <View style={styles.container}>
      <ScrollView >
      {myOrders.map((order,index)=>
          <Card key={index}>
            <Text>State = {order.state}</Text>
            <Text>Order placed at= {moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}</Text>
            <Text>Total Price = Rs. {getPrice(order).toFixed(2)}</Text>
          </Card>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  }
});
