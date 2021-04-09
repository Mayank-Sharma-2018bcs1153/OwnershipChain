import React from 'react';
import {View,Text,Image,Dimensions,StyleSheet,TouchableOpacity} from 'react-native';
import {username1,email1,phoneno1} from './signup1';
const w=Math.round(Dimensions.get('window').width);
const h=Math.round(Dimensions.get('window').height);
const ProfileScreen =()=>{
    return (
        <View>
          <Image source={require('./images/profileLL.png')} style={{resizeMode:'cover',width:w,height:h/3+140}} />
    <View style={{marginTop:30}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{flex:1,marginLeft:20,marginBottom:10,fontSize:20,fontWeight:'400'}}>Username</Text>
    <Text style={{flex:2,marginBottom:10,fontSize:18,fontWeight:'200'}}>{username1}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Text style={{flex:1,marginLeft:20,marginBottom:10,fontSize:20,fontWeight:'400'}}>Email Id</Text>
    <Text style={{flex:2,marginBottom:10,fontSize:18,fontWeight:'200'}}>{email1}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Text style={{flex:1,marginLeft:20,marginBottom:10,fontSize:20,fontWeight:'400'}}>Contact no.</Text>
    <Text style={{flex:2,marginBottom:10,fontSize:18,fontWeight:'200'}}>{phoneno1}</Text>
        </View>
        <View style = {styles.changeButton}>
        <TouchableOpacity activeOpacity={0.95} style={styles.button}>
                      <Text style={styles.buttonText} 
                      >Edit</Text>
                  </TouchableOpacity>
      </View>
    </View>
        </View>
    )

}
const styles=StyleSheet.create({
  button:{
    borderRadius:50,
    width:"35%",
    height:35,
    backgroundColor: "#6960EC",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    padding: 8
  },
  changeButton: {
    alignItems: "center",
    
  },
})
export default ProfileScreen;