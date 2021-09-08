import React from 'react'
import {StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image} from 'react-native';

export default function details({navigation,route}) {
    const { itemId } = route.params;
    const types = [
        {name: 'Chicago Pizza', price:120, img: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'},
        {name: 'Neapolitan Pizza',price:120, img: 'https://i.pinimg.com/originals/4c/90/69/4c906919db5ec51de6a7bcafc76e2812.png'},
        {name: 'Greek Pizza',price:120, img: 'https://img-global.cpcdn.com/recipes/5da646cc1c73a947/1200x630cq70/photo.jpg'},
        {name: 'California Pizza',price:120, img: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'}
    ]
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <ScrollView>
                {types.map((category, index)=>
                    <TouchableOpacity key={index} >
                        <View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: category.img,
                                }}
                            />
                            <View>
                                <Text>{category.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },
})

