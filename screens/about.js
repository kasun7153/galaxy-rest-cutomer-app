import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
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
        The story of Galaxy Rest which opened its doors in 1984 is a splendid tale of continual improvement of product and the highest standards of quality in hospitality.
      </Text>

      <View style={{marginTop: 40}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="email" size={24} color="black" />
          <Text style={{fontSize: 18, textAlign: 'center', marginLeft: 10}}>
            info@galaxyresta.com
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
          <Ionicons name="call" size={24} color="black" />
          <Text style={{fontSize: 18, textAlign: 'center', marginLeft: 10}}>
            +94763250332
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
          <MaterialCommunityIcons name="web" size={24} color="black" />
          <Text style={{fontSize: 18, textAlign: 'center', marginLeft: 10}}>
            www.galaxy-rest.com
          </Text>
        </View>
      </View>
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
