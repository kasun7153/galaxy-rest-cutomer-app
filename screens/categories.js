import React from 'react'
import {StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity} from 'react-native';

export default function categories({navigation}) {
    const categories = [
        {name: 'Pizza', img: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'},
        {name: 'Drinks', img: 'https://i.pinimg.com/originals/4c/90/69/4c906919db5ec51de6a7bcafc76e2812.png'},
        {name: 'Fried Rice', img: 'https://img-global.cpcdn.com/recipes/5da646cc1c73a947/1200x630cq70/photo.jpg'},
        {name: 'Other', img: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'}
    ]
    return (
    <View>
        <ScrollView>
            {categories.map((category, index)=>
                <TouchableOpacity key={index} onPress={() => navigation.navigate('Category-Items', {itemId: category.name})}>
                <View style={styles.imgCard} >
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
    )
}

const styles = StyleSheet.create({
    catNameOverlay:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor:'rgba(0,0,0,0.6)',
        zIndex: 9,
    },
    image:{
        width: '100%',
        height: 170,
        resizeMode: 'cover',
    },
    imgCard: {
        position: 'relative',
        marginBottom: 10,
    },
    catName:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    catNameText:{
        textAlign: 'center',
        fontWeight:'bold',
        fontSize: 35,
        color: 'white',
        letterSpacing: 10
    },
})
