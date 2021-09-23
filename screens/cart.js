import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';
import {Button, Divider} from 'react-native-elements';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {removeCartItem, resetCart} from '../redux/cart/cartActions';
import config from '../config/config.json';

export default function Cart() {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartReducer.items);
  const {customerName, idNumber, tableNumber} = useSelector((state) => state.userManagementReducer);

  const placeOrder = () => {
    const data = {
      customerName,
      idNumber,
      tableNumber,
      foodItems: items.map(el => {
        return {
          item: el._id,
          qty: el.qty,
          soldPrice: el.discount ? (el.price - (el.price * el.discount) / 100).toFixed(2) : el.price
        };
      })
    };
    axios.post(`${config.API}/order`, data).then(({data}) => {
      dispatch(resetCart());
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: 'top',
        type: 'success',
        text1: 'Successfully placed your order',
      });
    }).catch(e => {
      console.log(e);
    });
  };

  const calculateTotal = () => {
    let totalPrice =0;
    items.forEach(el=>{
      if(el.discount){
        totalPrice+=el.price - (el.price * el.discount) / 100
      }else{
        totalPrice+=el.price
      }
    })
    return totalPrice
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView style={styles.container}>
        {items.length > 0 ?
          <>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Order Details</Text>
            <View style={{marginTop: 20}}>
              {
                items.map((item, index) =>
                  <View key={`${index}_cart_items`} style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
                    <View>
                      <Image
                        style={styles.image}
                        source={{
                          uri: item.img,
                        }}
                      />
                    </View>
                    <View style={{justifyContent: 'center', marginLeft: 3, width: 120}}>
                      <Text style={{fontSize: 16}}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center', marginLeft: 3}}>
                      <Text style={{fontWeight: 'bold'}}>
                        {item.qty}
                      </Text>
                    </View>
                    <View  style={{justifyContent: 'center', marginLeft: 3}}>
                      <Text style={{fontWeight: 'bold', color: '#9F7591'}}>
                        Rs. {item.price}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center', marginLeft: 3}}>
                      <TouchableOpacity>
                        <MaterialIcons onPress={()=>dispatch(removeCartItem(item))} name="delete" size={24} color="#F7685B"/>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
            </View>
            <Divider style={{marginBottom: 30, marginTop: 20}} orientation="horizontal"/>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{fontSize: 16}}>Sub Total ({items.length} Items)</Text>
              <Text style={{fontSize: 14, color: '#9F7591'}}>Rs. {calculateTotal().toFixed(2)}</Text>
            </View>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 15}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order Total</Text>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>Rs. {calculateTotal().toFixed(2)}</Text>
            </View>
          </>
          :
          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text style={{color: '#4B76D1', fontSize: 18}}>
              Your Cart seems to be Empty...
            </Text>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text>Add a few of our great items and comeback</Text>
              <Text>We will be waiting...</Text>
            </View>
          </View>
        }
        <View style={{height: 30}}/>
      </ScrollView>
      <View style={{alignItems: 'center'}}>
        <Button
          onPress={placeOrder}
          disabled={items.length > 0 ? false : true}
          buttonStyle={{height: 55}}
          containerStyle={styles.button}
          title="Confirm & Place Order"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
  image: {
    width: 60,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 8
  },
  button: {
    width: '90%',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
  },
});
