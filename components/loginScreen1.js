import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TouchableHighlight, TextInput, AsyncStorage, Alert } from 'react-native';
import * as firebase from "firebase";
let username2 = ''
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }
    search=()=>{
        try{
            firebase.auth().signInWithEmailAndPassword(this.state.username,this.state.password).then(username2=this.state.username,
                this.props.navigation.navigate('Home'))
            
        }catch(error){
            console.log(error)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/Login.jpeg')} style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.container}>
                        <Text style={styles.label}>
                            Email ID
                            </Text>
                        <TextInput placeholder="Email ID" onChangeText={(value) => this.setState({ username: value })} style={styles.textInput} value={this.state.username} />

                        <Text style={{ ...styles.label, marginTop: 10 }}>
                            Password
                            </Text>
                        <TextInput secureTextEntry={true} placeholder="Password" style={styles.textInput} onChangeText={(value) => this.setState({ password: value })} value={this.state.password} />
                        <TouchableHighlight underlayColor="white" style={{ marginLeft: 20, marginTop: 20, marginRight: '45%', }} >
                            <Text style={styles.text} onPress={() => { this.props.navigation.navigate('Sign Up') }}>
                                Sign Up
                                </Text>

                        </TouchableHighlight>
                        <TouchableOpacity activeOpacity={0.7} style={{ paddingVertical: 10, backgroundColor: '#f5c6ee', marginLeft: 90, marginRight: 90, borderRadius: 10, marginTop: 30 }}>
                            <View>
                                <Text style={{ textAlign: 'center', color: 'blue', fontWeight: 'bold', fontSize: 20 }} onPress={this.search}>
                                    LOGIN
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
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
        marginTop: '50%',

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
export default Login;
export {username2};
