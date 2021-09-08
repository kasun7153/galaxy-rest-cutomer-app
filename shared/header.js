import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function Header({navigation, route}) {
    const styles = stylesSheet({route})
    return (
        <View style={styles.header}>
            {(route.name==="Home" || route.name==="About Us") && <MaterialIcons name="menu" size={28} style={styles.icon} onPress={() => navigation.openDrawer()}/>}
            <View>
                <Text style={styles.headerText}>{route.params?route.params.itemId:route.name}</Text>
            </View>
        </View>
    )
}

const stylesSheet= (props) => StyleSheet.create({
    header:{
        width:(props.route.name==="Home" || props.route.name==="About Us")?'100%':null,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText:{
        fontWeight:'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },
    icon:{
        position: 'absolute',
        left: 15
    }
})
