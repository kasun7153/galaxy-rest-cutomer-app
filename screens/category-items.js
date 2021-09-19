import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import HeaderCartIcon from '../shared/headerCartIcon';

export default function categoryItems({navigation,route}) {

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:()=>(
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color:"black", fontWeight: "700", fontSize: 20}}>
                        {route.params.itemId}
                    </Text>
                </View>
            ),
            headerRight:()=>(
                <HeaderCartIcon navigation={navigation}/>
            )
        })
    },[navigation])

    const { itemId } = route.params;
    const types = [
        {name: 'Chicago Pizza', price:120, img: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'},
        {name: 'Neapolitan Pizza',price:120, img: 'https://pizzaneed.com/wp-content/uploads/2019/05/different-types-of-pizza.jpg'},
        {name: 'Greek Pizza',price:120, img: 'https://www.watchmojo.com/uploads/thumbs720/LL-F-Top10-Pizza-Types-720p30.jpg', discount: 2},
        {name: 'California Pizza',price:120, img: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'}
    ]

    return (
        <View style={styles.container}>
            {types.map((type ,index)=>
                <TouchableOpacity onPress={() => navigation.navigate('Add-to-Cart', {item: type})} key={index} style={{width: '50%', padding: 10 }}>
                    <View>
                        <View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: type.img,
                                }}
                            />
                        </View>
                        <View>
                            <Text style={styles.name}>{type.name}</Text>
                        </View>
                        {type.discount?
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.price}>Rs {type.price.toFixed(2)}</Text>
                                <Text style={styles.discountPrice}>Rs {type.price.toFixed(2)}</Text>
                            </View>:
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.price}>Rs {type.price.toFixed(2)}</Text>
                            </View>
                        }

                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    name:{
        fontSize: 18,
        fontWeight: "400",
        marginTop: 5
    },
    price:{
        color: '#4095FA',
        fontWeight: "bold",
        fontSize: 17,
    },
    discountPrice:{
        color: '#9F7591',
        fontWeight: "normal",
        fontSize: 17,
        textDecorationLine: 'line-through',
    },
    image:{
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
