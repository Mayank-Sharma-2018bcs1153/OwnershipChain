import * as React from 'react';
import { Button, Image, View, Text, TextInput, StyleSheet, ImageBackground, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import {username2} from './loginScreen1'

export default class Documentdes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      image: null,
      description: ''
    }
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground source={require('./images/Login.jpeg')} style={{ flex: 1, justifyContent: 'center',paddingLeft:70,paddingRight:70 }}>
          <View style={styles.container}>
            <Text style={styles.label}>
              Username
            </Text>
            <TextInput style={{marginLeft:30}} defaultValue={username2} editable={false} />
            <Text style={styles.label}>
              Description
            </Text>
            <TextInput placeholder="Description" onChangeText={(value) => this.setState({ description: value })} style={styles.textInput} value={this.state.password} />
          </View>
          <Button title="Pick a document from folder" onPress={this._pickImage}  />
          <Button title="Upload" onPress={this._pickupload} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </ImageBackground>
      </View>
    );
  }
  _pickupload = () => {
    this.state.username=username2
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    let date1=date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
    let data=new FormData();
    data.append('username',this.state.username)
    let s=this.state.image;
    const uriPart = s.split('.');
    const fileExtension = uriPart[uriPart.length - 1];
    data.append('image', {
      uri: this.state.image,
      name: this.state.image+`.${fileExtension}`,
      type: `image/${fileExtension}`
    })
    // data.append('image',this.state.image);
    data.append('description',this.state.description)
    data.append('date',date1)
    // this._picksave
    fetch('https://ownershipchain1.000webhostapp.com/ownership_chain_imagesave.php',{method: 'POST',body:data}).then(response=>{
      if(!response.ok){
        throw new Error('oops something is wrong');
      }
    }).catch((err)=>{
      console.log(err);
    });
    // this.props.navigation.navigate('Login')
    this.props.navigation.navigate('Home')
  }

  // componentDidMount() {
  //   this.getPermissionAsync();
  // }

//   getPermissionAsync = async () => {
//     if (Constants.platform.ios) {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   };

  _pickImage = async () => {
    try {
        let result = await DocumentPicker.getDocumentAsync({});
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
const styles = StyleSheet.create({
  textInput: {
    marginLeft: 20,
    height: 30,
    borderBottomWidth: 1,
    marginRight: 20,
    borderBottomColor: 'blue',
  },
  label: {
    marginLeft: 20,
    fontSize: 20,
    color: 'blue',
    marginBottom: 5,
    marginTop: 1,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 20
  }
})
