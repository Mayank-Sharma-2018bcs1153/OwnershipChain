import 'react-native-gesture-handler';
import React ,{useEffect} from 'react';
import {ScrollView,Animated,View,Image,Dimensions,Text} from 'react-native';
import SignUpp from './components/signup3';
import home from './components/home';
import Login from './components/loginScreen1';
import Loginsignup from './components/loginSignupScreen';
import ImageDescription from './components/imageDes';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Signupp=({navigation})=>{return <SignUpp navigation={navigation}/>}
const addImg=({navigation})=>{
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator>
      <Stack.Screen name="Add image from gallery" component={ImageDescription}/>
      <Stack.Screen name='Home' component={home}/>
    </Stack.Navigator>
  )

  }
const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};
const login=({navigation})=>{
  const Stack=createStackNavigator();
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerTintColor: 'black',
      }}
    />
  </Stack.Navigator>
  )}
const mainDashboard=({navigation,route})=>{
  const Drawer=createDrawerNavigator();
return(
  <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="Home" component={home} options={{ title: 'my home' }}/>
         <Drawer.Screen name="Add image" component={addImg}/>
       </Drawer.Navigator>   
)
}
 const mainScreenTimeout=({navigation})=>{
  const w=Math.round(Dimensions.get('window').width);
const h=Math.round(Dimensions.get('window').height);
useEffect(()=>{const timer=setTimeout(()=>{return navigation.navigate('Loginsignup')},1000)},[]);
  return(
    <View style={{ backgroundColor: 'white' }}>
    <View style={{ flex: 1, paddingTop: 0}}>
        <Image source={require('./components/images/mainScreen.png')} style={{width:w,height:h}} />
    </View>
 </View>
  )
}
const App=(props)=>{
const Stack=createStackNavigator();

  return(
         <NavigationContainer>  
          <Stack.Navigator initialRouteName="Main Screen" >
            <Stack.Screen name="Main Screen" component={mainScreenTimeout} />
            <Stack.Screen name="Loginsignup" component={Loginsignup} />
            <Stack.Screen name="Login" component={login} />
            <Stack.Screen name="Sign Up" component={Signupp} />
            <Stack.Screen name="Home" component={mainDashboard}  options={{headerShown:true}}/>
          </Stack.Navigator>
       </NavigationContainer>
)
  
} 
 export default App;
