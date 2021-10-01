import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import config from '../config/config.json';


export default function OrderCancellationModel({open, setOpen, order, fetchOrders}) {

  const cancelThisOrder =async ()=>{
    try {
      await axios.delete(`${config.API}/order/${order?._id}`)
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: 'top',
        type: 'success',
        text1: 'Order cancelled successfully',
      });
      fetchOrders()
      setOpen(false)
    } catch (e) {
      console.log(e);
      setOpen(false)
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: 'top',
        type: 'error',
        text1: 'Unknown Error',
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
            <Text style={styles.modalText}>Do you really want to cancel the order?</Text>
            <Text>{order?._id}</Text>
            <View style={{flexDirection:'row', justifyContent:"space-evenly", width: "100%", marginTop:30}}>
              <Button containerStyle={{width: 100}} title="Yes" onPress={cancelThisOrder}/>
              <Button buttonStyle={{backgroundColor:'gray'}} containerStyle={{width: 100}} title="No" onPress={()=>setOpen(false)}/>
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
    marginBottom: 5,
    textAlign: 'center',
  },
});
