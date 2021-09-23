import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import logo from '../assets/logo.png';

export default function About({navigation}) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <View style={{marginLeft: 100}}>
          <Text style={{color: 'black', fontWeight: '700', textAlign: 'center', fontSize: 18}}>
            About Us
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
