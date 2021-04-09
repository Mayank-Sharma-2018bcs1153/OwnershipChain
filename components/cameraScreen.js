import React, { Component } from 'react';
import { Text, View, TouchableOpacity,Dimensions,StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import Toolbaar from './toolbaarCamera';

 const {width:winWidth,height:winHeight}=Dimensions.get('window');

 export default class CameraScreen extends Component {
   constructor(props)
   {
     super(props);
     this.state={
       hasCameraPermission:null,
       captures:[],
       flashMode:Camera.Constants.FlashMode.off,
       capturing:null,
       cameraType:Camera.Constants.Type.back,
       camera:null,
     }
     this.handleShortCapture=this.handleShortCapture.bind(this);
   }

    handleShortCapture=async()=>{
      const photoData=await this.state.camera.takePictureAsync();
     this.setState({capturing:false});
     console.log(photoData);
      this.setState({captures:[photoData,...this.state.captures]});
    }
    async componentDidMount() {
      this.setState({camera:await Camera.requestPermissionsAsync()});
     
      this.setState({hasCameraPermission :(this.state.camera.status === 'granted'?true:false)});
     
  };

  render()
  {
         if (this.state.hasCameraPermission === null) {
            return <View />;
        } else if (this.state.hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View style={{ flex: 1,flexDirection:'column',alignContent:'center',justifyContent:'center' }}>
          <View style={{height:600,width:320,backgroundColor:"black",alignSelf:'center'}}>
          <Camera style={{flex:6}} ref={camera => this.state.camera = camera}>
          </Camera>
          <View style={{flex:1}}>
          <Toolbaar capturing={this.state.capturing} flashMode={this.state.flashMode} cameraType={this.state.cameraType} setFlashMode={(flashMode)=>this.setState({flashMode})} setCameraType={(cameraType)=>this.setState({cameraType})}onShortCapture={this.handleShortCapture} />
          </View>
        
          </View>
             
             
              
          {/* <View style={{flex:1}}>
          {this.state.captures.length>0 && <Gallery captures={this.state.captures}/>} */}
            {/* </View> */}
            </View>
        );
  }
}
