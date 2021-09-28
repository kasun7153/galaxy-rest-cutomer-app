import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import axios from 'axios';
import config from '../config/config.json';
import {Card} from 'react-native-elements';
import wifiIcon from "../assets/icons/wifi.png"
import bedIcon from '../assets/icons/bed.jpg';
import acIcon from '../assets/icons/ac.jpg';
import { LinearGradient } from 'expo-linear-gradient';
import {Button, Divider} from 'react-native-elements';
import RoomBookModel from './roomBookModel';

export default function RoomReservation({navigation}) {
  const [allRooms, setAllRooms] = React.useState([]);
  const [bookModel, setBookModel] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${config.API}/rooms`).then(({data}) => {
      setAllRooms(data);
    }).catch(e => {
      console.log(e);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <View style={{marginLeft: 100}}>
          <Text style={{color: 'black', fontWeight: '700', textAlign: 'center', fontSize: 18}}>
            Rooms
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
      <ScrollView >
        {/*<LinearGradient start={{ x: -1, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a0cbfa', 'white']}>*/}
        {allRooms.map((room,index)=>
          <TouchableOpacity onPress={()=> {
            setSelectedRoom(room)
            setBookModel(true);
          }} key={index}>
          <View style={{flexDirection: 'row', padding: 15}}>
            <View style={{justifyContent: 'center'}}>
              <Image
                style={styles.image}
                source={{
                  uri: room.img || "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
                }}
              />
            </View>
            <View style={{marginLeft:20, flex:1}}>
              <Text style={{fontWeight:"bold", marginBottom: 10, fontSize: 17}}>Room No - {room.roomNo}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.facilityItem}>
                  <Image source={bedIcon} style={styles.icon}/>
                  <Text>{room.bedCount} Beds</Text>
                </View>
                {room?.wifi && <View style={styles.facilityItem}>
                  <Image source={wifiIcon} style={styles.icon}/>
                  <Text>WiFi</Text>
                </View>}
                {room?.ac &&
                  <View style={styles.facilityItem}>
                    <Image source={acIcon} style={styles.icon}/>
                    <Text>A/C</Text>
                  </View>
                }
              </View>
              <View style={{alignItems: 'flex-end', marginTop: 10, marginRight: 5}}>
                <Text style={{color: '#1c75e9', fontWeight:'bold', fontSize: 16}}>Rs{room.price}/
                  <Text style={{color: 'gray',fontWeight:'normal'}}>night</Text>
                </Text>
              </View>
            </View>
          </View>
          <Divider style={{marginBottom: 0, marginTop: 0}} orientation="horizontal"/>
          </TouchableOpacity>
        )}
        {/*</LinearGradient>*/}
      </ScrollView>
    <RoomBookModel navigation={navigation} open={bookModel} setOpen={setBookModel} room={selectedRoom}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: 'cover',
    borderRadius:10
  },
  icon:{
    width: 35,
    height: 35,
    resizeMode: 'cover',
    marginBottom:4
  },
  facilityItem:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 50
  }
});
