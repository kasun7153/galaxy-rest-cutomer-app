import React, {useLayoutEffect} from 'react';
import {Image, KeyboardAvoidingView, Picker, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import logo from '../assets/logo.png';
import {Button, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetails} from '../redux/userManagment/userManagementActions';

export default function Home({navigation}) {
  const [tableNumber, setTableNumber] = React.useState(1);
  const [customerName, setCustomerName] = React.useState('');
  const [idNumber, setIdNumber] = React.useState('');
  const dispatch = useDispatch();

  const userManager = useSelector((state) => state.userManagementReducer);

  const login = () => {
    dispatch(setUserDetails({customerName, idNumber, tableNumber}));
    setCustomerName('');
    setIdNumber('');
    setTableNumber(1);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={logo} style={{width: 200, height: 200, marginBottom: 30}}/>
      <View style={{ flexDirection: 'row', marginBottom: 30}}>
        <Picker
          selectedValue={tableNumber}
          style={{
            height: 50, width: '50%', borderColor: 'black',
            borderBottomWidth: 1,
            borderRadius: 10,
          }}
          onValueChange={(itemValue, itemIndex) => setTableNumber(itemValue)}
        >
          <Picker.Item label="Table 01" value="1"/>
          <Picker.Item label="Table 02" value="2"/>
          <Picker.Item label="Table 03" value="3"/>
          <Picker.Item label="Table 04" value="4"/>
          <Picker.Item label="Table 05" value="5"/>
        </Picker>
      </View>
      <Input
        value={customerName}
        onChangeText={text => setCustomerName(text)}
        placeholder="Your Name"
        type="text"
      />
      <Input
        value={idNumber}
        onChangeText={text => setIdNumber(text)}
        //errorMessage="NIC number is required"
        placeholder="Your NIC Number"
        type="numeric"
      />
      <Button
        onPress={login}
        disabled={!customerName || !idNumber}
        buttonStyle={{height: 55}}
        containerStyle={styles.button}
        title="Get Started"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    width: '90%',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
  }
});
