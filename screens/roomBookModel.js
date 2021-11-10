import React from 'react';
import {Modal, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import config from '../config/config.json';

export default function RoomBookModel({open, setOpen, room, navigation}) {
  const [customerEmail, setCustomerEmail] = React.useState('');
  const {customerName, idNumber} = useSelector((state) => state.userManagementReducer);
  const [customerContactNumber, setCustomerContactNumber] = React.useState('');

  const [arrivalDatePickerShow, setArrivalDatePickerShow] = React.useState(false);
  const [arrivalDate, setArrivalDate] = React.useState(new Date());

  const [departureDatePickerShow, setDepartureDatePickerShow] = React.useState(false);
  const [departureDate, setDepartureDate] = React.useState(new Date());

  const onChangeArrivalDate = (event, selectedDate) => {
    const currentDate = selectedDate || arrivalDate;
    setArrivalDate(currentDate);
    setArrivalDatePickerShow(Platform.OS === 'ios');
  };

  const onChangeDepartureDate = (event, selectedDate) => {
    const currentDate = selectedDate || departureDate;
    setDepartureDate(currentDate);
    setDepartureDatePickerShow(Platform.OS === 'ios');
  };

  const reserveThisRoom = ()=>{
    const data={
      customerName,
      customerEmail,
      customerContactNumber,
      startDate:moment(arrivalDate).format(),
      endDate:moment(departureDate).format(),
      room:room._id
    }
    if(data.customerEmail && data.customerContactNumber){
      axios.post(`${config.API}/booking/add`,data).then(({data}) => {
        setOpen(false)
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: 'top',
          type: 'success',
          text1: 'Successfully booked your room',
        });
      }).catch(e => {
        console.log(data)
        console.log(e);
        setOpen(false)
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: 'top',
          type: 'error',
          text1: 'Unknown Error',
        });
      });
    } else {
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: 'top',
        type: 'error',
        text1: 'Please fill all the details',
      });
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Room No - {room?.roomNo}</Text>
            <Input
              value={customerEmail}
              onChangeText={text => setCustomerEmail(text)}
              placeholder="Your Email"
              type="email"
            />
            <Input
              value={customerContactNumber}
              onChangeText={text => setCustomerContactNumber(text)}
              placeholder="Contact Number"
              type="text"
            />
            <View style={{width:'100%', marginTop: 10}}>
              <TouchableOpacity onPress={()=>setArrivalDatePickerShow(true)}>
                <Text style={{fontSize: 18}}>Arrival Date - {moment(arrivalDate).format('DD-MM-YYYY')}</Text>
              </TouchableOpacity>
              {arrivalDatePickerShow && <DateTimePicker
                testID="dateTimePicker"
                value={arrivalDate}
                mode='date'
                display="default"
                onChange={onChangeArrivalDate}
                minimumDate={new Date()}
              />}

              <TouchableOpacity style={{marginTop: 10}} onPress={()=>setDepartureDatePickerShow(true)}>
                <Text style={{fontSize: 18}}>Departure Date - {moment(departureDate).format('DD-MM-YYYY')}</Text>
              </TouchableOpacity>
              {departureDatePickerShow &&
              <DateTimePicker
                testID="dateTimePicker"
                value={departureDate}
                mode='date'
                display="default"
                onChange={onChangeDepartureDate}
                minimumDate={new Date()}
              />
              }
            </View>
            <View style={{width:'100%', marginTop: 30}}>
              <Button onPress={reserveThisRoom} title="Reserve this Room"/>
              <Button
                buttonStyle={{backgroundColor: '#e76767', width: '100%', marginTop:10}}
                onPress={() => {
                  setOpen(false);
                }} title="Cancel"/>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: "90%",
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
});
