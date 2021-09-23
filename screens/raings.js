import React, {useLayoutEffect} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Rating, AirbnbRating, Avatar, Input, Divider} from 'react-native-elements';
import axios from 'axios';
import logo from '../assets/logo.png';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import config from '../config/config.json';

export default function Ratings({navigation}) {

  const [customerRatings, setCustomerRatings] = React.useState([]);
  const {customerName, idNumber, tableNumber} = useSelector((state) => state.userManagementReducer);

  const [rating, setRating] = React.useState(3);
  const [review, setReview] = React.useState('');

  const getReviews = () => {
    axios.get(`${config.API}/review`).then(({data}) => {
      setCustomerRatings(data);
    }).catch(e => {
      console.log(e);
    });
  };

  React.useEffect(() => {
    getReviews();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <View style={{marginLeft: 100}}>
          <Text style={{color: 'black', fontWeight: '700', textAlign: 'center', fontSize: 18}}>
            Ratings
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

  const addThisReview = () => {
    axios.post(`${config.API}/review`, {rating, review, name: customerName}).then((res) => {
      getReviews();
      setRating(3);
      setReview('');
    }).catch(e => {
      console.log(e);
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Rating
          showRating
          imageSize={35}
          onFinishRating={rate => setRating(rate)}
          value={rating}
          style={{paddingVertical: 20}}
        />
        <Input
          value={review}
          onChangeText={text => setReview(text)}
          placeholder="Write your Review" autoFocus
          type="text"
        />
        <Button
          onPress={addThisReview}
          containerStyle={{width: '100%'}}
          title="Add"
        />
      </View>
      <ScrollView>
        {customerRatings.map((el, index) =>
          <View key={`Rating_${index}`}>
            <View>
              <View style={{flexDirection: 'row', marginLeft: 25}}>
                <Avatar
                  style={{width: 40, height: 40}}
                  size="small"
                  rounded
                  source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}}
                />
                <Rating
                  startingValue={el.rating}
                  readonly
                  ratingCount={5}
                  imageSize={13}
                  style={{paddingVertical: 20, position: 'absolute', right: 35, top: -12}}
                />
                <View>
                  <Text style={{color: 'black', marginLeft: 10, fontWeight: '700'}}>
                    {el.name}
                  </Text>
                  <Text style={{color: 'black', marginLeft: 10, paddingRight: 25, marginTop: 5}}>
                    {el.review}
                  </Text>
                  {el.reply &&
                  <View style={{marginTop: 18, flexDirection: 'row', marginLeft: 7}}>
                    <Avatar
                      style={{width: 30, height: 30}}
                      rounded
                      source={logo}
                    />
                    <View style={{
                      backgroundColor: '#e7e7e7',
                      marginLeft: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      borderRadius: 9
                    }}>
                      <Text style={{color: 'black', fontWeight: '700'}}>
                        Galaxy Rest
                      </Text>
                      <Text style={{color: 'black', paddingRight: 25, marginTop: 3}}>
                        {el.reply}
                      </Text>
                    </View>
                  </View>
                  }
                </View>
              </View>
            </View>
            <Divider style={{marginVertical: 13}} orientation="horizontal"/>
          </View>
        )}
        <View style={{height: 20}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  }
});
