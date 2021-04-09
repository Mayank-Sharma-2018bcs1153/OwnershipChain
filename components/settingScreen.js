import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default function SettingScreen(props)
{const navigation=props.navigation;
   
    return (
        <View style={styles.conatiner}>
            <Text onPress={()=>{navigation.navigate('Profile')}} style={styles.text}>Account</Text>
            <Text style={styles.text}>Display</Text>
            <Text style={styles.text}>Privacy</Text>
            <Text style={styles.text}>About Us</Text>
            <Text onPress={()=>{navigation.navigate('Login')}} style={styles.text}>Log Out</Text>
        </View>

    )
}
const styles=StyleSheet.create({
    conatiner:{
        flex:1,
        backgroundColor:'black',
    },
    text:{
        marginVertical:15,
        fontSize:24,
        color:'white',
        marginHorizontal:20
    }
})