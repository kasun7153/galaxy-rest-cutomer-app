import React from 'react';
import {TouchableOpacity, View, StyleSheet, Modal, Text, TouchableHighlight} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';

function HeaderCartIcon({navigation}) {
  const items = useSelector((state) => state.cartReducer.items);
  const [modalVisible, setModalVisible] = React.useState(true);
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <AntDesign name="shoppingcart" size={30} color="black"/>
        </TouchableOpacity>
        <Badge
          value={items.length} status="error"
          containerStyle={{position: 'absolute', top: -8, right: -10}}
        />
      </View>
    </>
  );
}

export default HeaderCartIcon;
