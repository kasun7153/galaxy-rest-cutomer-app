import React from 'react'
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Button,Divider} from 'react-native-elements';

export default function AddToCart() {
    const [qty, setQty] = React.useState(1);

    const plusQty = ( ) => {
        setQty(qty+1)
    }

    const minusQty = ( ) => {
        if(qty>1){
            setQty(qty-1)
        }
    }

    return (
        <View style={{backgroundColor: 'white', flex:1}}>
            <ScrollView style={{flex:1}}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449019_1280.jpg',
                    }}
                />
                <View style={styles.itemDetails}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.itemName}>Kolikuttu 1Kg</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                                <AntDesign onPress={minusQty} name="minuscircle" size={45} color="#BBD7FB" style={{backgroundColor:'#4B76D1', borderRadius: 100}}/>
                                <Text style={styles.qty}>{qty}</Text>
                                <AntDesign onPress={plusQty} name="pluscircle" size={45} color="#4B76D1" />
                            </View>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.price}>Rs 1250.00</Text>
                            <Text style={styles.discountPrice}>Rs 950.00</Text>
                        </View>
                    </View>

                    <Divider style={{marginTop: 20}} orientation="horizontal" />
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 16, fontWeight: "700"}}>Product Description</Text>
                        <Text style={{fontSize: 16, marginTop: 10}}>
                            This is the Product description of the Kolikuttu 1KG. This can be long upto many lines. And make this section scrollable.
                        </Text>
                    </View>
                    <Divider style={{marginTop: 20}} orientation="horizontal" />
                </View>
            </ScrollView>
            <View style={{alignItems: 'center'}}>
                <Button disabled={qty>0?false:true} buttonStyle={{height:55}} containerStyle={styles.button}  title={`Add to cart (${qty} Items)`}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    price:{
        color: '#4095FA',
        fontWeight: "bold",
        fontSize: 17,
        textAlign: 'right'
    },
    discountPrice:{
        color: '#9F7591',
        fontWeight: "normal",
        fontSize: 17,
        textDecorationLine: 'line-through',
        textAlign: 'right'
    },
    button:{
        width:'90%',
        marginBottom:10,
        marginTop:10,
        borderRadius: 8,
    },
    image:{
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    itemName:{
        fontSize:22,
        fontWeight:'bold'
    },
    itemDetails:{
        padding: 20,
    },
    qty:{
        fontSize:25,
        fontWeight:"800",
        width: 55,
        textAlign: 'center'
    }
})
