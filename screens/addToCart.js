import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Button, Divider} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/cart/cartActions';
import HeaderCartIcon from '../shared/headerCartIcon';
import Toast from 'react-native-toast-message';

export default function AddToCart({navigation, route}) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'black', fontWeight: '700', fontSize: 20}}>
            {route.params.item.name || 'Loading'}
          </Text>
        </View>
      ),
      headerRight: () => (
        <HeaderCartIcon navigation={navigation}/>
      )
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const [qty, setQty] = React.useState(1);

  const item = route.params.item || {
    name: 'Loading',
    price: 0,
    img: 'https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449019_1280.jpg',
    discount: 0
  };

  const addThisToCart = () => {
    dispatch(addToCart({...item, qty:qty}));
    setQty(1);
    Toast.show({
      topOffset: 40,
      visibilityTime: 1500,
      position: 'top',
      type: 'success',
      text1: 'Successfully added to the cart',
    });
  };

  const plusQty = () => {
    setQty(qty + 1);
  };

  const minusQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const getDiscounterPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Image
          style={styles.image}
          source={{
            uri: route.params.item.img,
          }}
        />
        <View style={styles.itemDetails}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                <AntDesign onPress={minusQty} name="minuscircle" size={40} color="#BBD7FB"
                           style={{backgroundColor: '#4B76D1', borderRadius: 100}}/>
                <Text style={styles.qty}>{qty}</Text>
                <AntDesign onPress={plusQty} name="pluscircle" size={40} color="#4B76D1"/>
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              {item.discount ?
                <>
                  <Text style={styles.price}>Rs {getDiscounterPrice(item.price, item.discount).toFixed(2)}</Text>
                  <Text style={styles.discountPrice}>Rs {item.price.toFixed(2)}</Text>
                </> :
                <Text style={styles.price}>Rs {item.price.toFixed(2)}</Text>
              }
            </View>
          </View>

          <Divider style={{marginTop: 20}} orientation="horizontal"/>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>Product Description</Text>
            <Text style={{fontSize: 16, marginTop: 10}}>
              {item.description || 'No Description Available'}
            </Text>
          </View>
          <Divider style={{marginTop: 20}} orientation="horizontal"/>
        </View>
      </ScrollView>
      <View style={{alignItems: 'center'}}>
        <Button onPress={addThisToCart} disabled={qty > 0 ? false : true} buttonStyle={{height: 55}}
                containerStyle={styles.button} title={`Add to cart (${qty} Items)`}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    color: '#4095FA',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'right'
  },
  discountPrice: {
    color: '#9F7591',
    fontWeight: 'normal',
    fontSize: 17,
    textDecorationLine: 'line-through',
    textAlign: 'right',
    marginTop: 3
  },
  button: {
    width: '90%',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  itemDetails: {
    padding: 20,
  },
  qty: {
    fontSize: 25,
    fontWeight: '800',
    width: 55,
    textAlign: 'center'
  }
});
