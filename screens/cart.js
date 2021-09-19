import React from 'react'
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';
import {Button, Divider} from 'react-native-elements';

export default function Cart() {
    const items = useSelector((state) => state.cartReducer.items);

    const placeOrder = ()=>{

    }

    return (
        <View style={{backgroundColor: 'white', flex:1}}>
            <ScrollView style={styles.container}>
                {items.length>0 ?
                    <>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Order Details</Text>
                        <View style={{marginTop: 20}}>
                            {
                                items.map((item,index)=>
                                    <View key={index} style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
                                        <View>
                                            <Image
                                                style={styles.image}
                                                source={{
                                                    uri: item.img,
                                                }}
                                            />
                                        </View>
                                        <View key={index} style={{justifyContent: 'center', marginLeft: 3, width: 120}}>
                                            <Text style={{fontSize: 16}}>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <View key={index} style={{justifyContent: 'center', marginLeft: 3}}>
                                            <Text style={{fontWeight: 'bold'}}>
                                                {item.qty}
                                            </Text>
                                        </View>
                                        <View key={index} style={{justifyContent: 'center', marginLeft: 3}}>
                                            <Text style={{fontWeight: 'bold', color: '#9F7591'}}>
                                                Rs. {item.price}
                                            </Text>
                                        </View>
                                        <View key={index} style={{justifyContent: 'center', marginLeft: 3}}>
                                            <MaterialIcons name="delete" size={24} color="#F7685B" />
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                        <Divider style={{marginBottom: 30, marginTop:20}} orientation="horizontal" />
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text style={{fontSize: 16}}>Sub Total ({items.length} Items)</Text>
                            <Text style={{fontSize: 14, color: '#9F7591'}}>Rs. 234.00</Text>
                        </View>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 15}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order Total</Text>
                            <Text style={{fontSize: 14, fontWeight: 'bold',color: 'black'}}>Rs. 234.00</Text>
                        </View>
                    </>
                    :
                    <View style={{alignItems: 'center', marginTop:50}}>
                        <Text style={{color:'#4B76D1', fontSize: 18}}>
                            Your Cart seems to be Empty...
                        </Text>
                        <View style={{alignItems: 'center', marginTop:10}}>
                            <Text>Add a few of our great items and comeback</Text>
                            <Text>We will be waiting...</Text>
                        </View>
                    </View>
                }
                <View style={{height: 30}}/>
            </ScrollView>
            <View style={{alignItems: 'center'}}>
                <Button
                    onPress={placeOrder}
                    disabled={items.length>0?false:true}
                    buttonStyle={{height:55}}
                    containerStyle={styles.button}
                    title='Confirm & Place Order'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        padding:12,
    },
    image:{
        width: 60,
        height: 45,
        resizeMode: 'cover',
        borderRadius: 8
    },
    button:{
        width:'90%',
        marginBottom:10,
        marginTop:10,
        borderRadius: 8,
    },
})
