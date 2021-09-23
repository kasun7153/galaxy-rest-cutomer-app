import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import HeaderCartIcon from '../shared/headerCartIcon';
import axios from 'axios';
import config from '../config/config.json';

export default function categories({navigation}) {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${config.API}/category`).then(({data}) => {
      setCategories(data);
    }).catch(e => {
      console.log(e);
    });
  }, []);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerTitle: () => (
        <View style={{marginLeft: 100}}>
          <Text style={{color: 'black', fontWeight: '700', textAlign: 'center', fontSize: 18}}>
            Galaxy Rest
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity>
          <MaterialIcons name="menu" size={28} onPress={() => navigation.openDrawer()}/>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <HeaderCartIcon navigation={navigation}/>
      )
    });
  }, [navigation]);

  return (
    <View>
      <ScrollView>
        {categories.map((category, index) =>
          <TouchableOpacity key={index} onPress={() => navigation.navigate('Category-Items', {itemId: category.name})}>
            <View style={styles.imgCard}>
              <View style={styles.catName}>
                <View>
                  <Text style={styles.catNameText}>{category.name}</Text>
                </View>
              </View>
              <View style={styles.catNameOverlay}>
              </View>
              <Image
                style={styles.image}
                source={{
                  uri: category.img,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  catNameOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 9,
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
  imgCard: {
    position: 'relative',
    marginBottom: 10,
  },
  catName: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catNameText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
    letterSpacing: 10
  },
});
