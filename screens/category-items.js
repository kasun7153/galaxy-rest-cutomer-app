import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import HeaderCartIcon from '../shared/headerCartIcon';
import axios from 'axios';
import config from '../config/config.json';

export default function categoryItems({navigation, route}) {
  const [types, setTypes] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${config.API}/food/by-category`, {params: {category: route.params.itemId}}).then(({data}) => {
      setTypes(data);
    }).catch(e => {
      console.log(e);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'black', fontWeight: '700', fontSize: 20}}>
            {route.params.itemId}
          </Text>
        </View>
      ),
      headerRight: () => (
        <HeaderCartIcon navigation={navigation}/>
      )
    });
  }, [navigation]);

  const getDiscounterPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <View style={styles.container}>
      {types.map((type, index) =>
        <TouchableOpacity onPress={() => navigation.navigate('Add-to-Cart', {item: type})} key={index}
                          style={{width: '50%', padding: 10}}>
          <View>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: type.img,
                }}
              />
            </View>
            <View>
              <Text style={styles.name}>{type.name}</Text>
            </View>
            {type.discount ?
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.price}>Rs {getDiscounterPrice(type.price, type.discount).toFixed(2)}</Text>
                <Text style={styles.discountPrice}>Rs {type.price.toFixed(2)}</Text>
              </View> :
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.price}>Rs {type.price.toFixed(2)}</Text>
              </View>
            }

          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 5
  },
  price: {
    color: '#4095FA',
    fontWeight: 'bold',
    fontSize: 17,
  },
  discountPrice: {
    color: '#9F7591',
    fontWeight: 'normal',
    fontSize: 17,
    textDecorationLine: 'line-through',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
