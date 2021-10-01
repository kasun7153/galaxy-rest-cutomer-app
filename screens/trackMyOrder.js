import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Entypo, MaterialIcons} from '@expo/vector-icons';
import logo from '../assets/logo.png';
import axios from 'axios';
import {useSelector} from 'react-redux';
import config from '../config/config.json';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import moment from 'moment';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import {removeCartItem} from '../redux/cart/cartActions';
import OrderCancellationModel from './orderCancellationModel';

export default function TrackMyOrder({navigation}) {
  const {customerName, idNumber, tableNumber} = useSelector((state) => state.userManagementReducer);
  const [myOrders, setMyOrders] = React.useState([]);
  const [cancelModel, setCancelModel] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const getOrders = () => {
    axios.get(`${config.API}/order/${idNumber}`).then(({data}) => {
      setMyOrders(data);
    }).catch(e => {
      console.log(e);
    });
  };

  React.useEffect(() => {
    getOrders();
    const getData = setInterval(() => {
      getOrders();
    }, 5000);
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

  const getPrice = (order) => {
    let price = 0;
    order?.foodItems?.forEach(item => price += item.qty * item.soldPrice);
    return price;
  };

  const getColor = (state) => {
    switch (state) {
      case 'In Queue':
        return '#ffca1e';
      case 'Processing':
        return '#4bc518';
      case 'Prepared':
        return '#c55518';
      case 'Closed':
        return '#183bc5';
      case 'Canceled':
        return '#fd3434';
      default:
        return 'black';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {myOrders.map((order, index) =>
          <Card key={index}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: getColor(order.state)}}>{order.state}</Text>
            <Text style={{fontSize: 10}}>{order._id}</Text>
            <View style={{marginTop: 20}}>
              {order.foodItems.map((item, index2) =>
                <View key={`${order._id}_${item._id}_${index2}`}
                      style={{flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between'}}>
                  <View>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.item.img,
                      }}
                    />
                  </View>
                  <View style={{justifyContent: 'center', marginLeft: 3}}>
                    <Text style={{fontSize: 16}}>
                      {item.item.name}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center', marginLeft: 3}}>
                    <Text style={{fontWeight: 'bold'}}>
                      x {item.qty}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center', marginLeft: 3}}>
                    <Text style={{fontWeight: 'bold', color: '#9F7591'}}>
                      Rs. {item.soldPrice}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
              <View>
                <Text>Order placed</Text>
                <Text style={{fontSize: 16}}>{moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}</Text>
              </View>
              <View>
                <View style={{backgroundColor: 'gray', width: 1, height: 40}}></View>
              </View>
              <View>
                <Text>Price</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Rs. {getPrice(order).toFixed(2)}</Text>
              </View>
            </View>
            {order.state === 'In Queue' &&
            <Button
              onPress={() => {
                setSelectedOrder(order);
                setCancelModel(true);
              }}
              containerStyle={{marginTop: 15}}
              buttonStyle={{backgroundColor: '#de1e1e'}}
              icon={<Entypo style={{marginRight:5}} name="cross" size={24} color="white" />}
              title="Cancel Order"
            />
            }
          </Card>
        )}
        <View style={{height: 30}}/>
      </ScrollView>
      <OrderCancellationModel order={selectedOrder} open={cancelModel} setOpen={setCancelModel} fetchOrders={getOrders}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 8
  },
});
