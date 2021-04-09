import * as React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform, Alert,ImageBackground } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAd1l5D3v2NLe_9-0Jnza9DGSyBa23pwmA",
    authDomain: "ownership-chain-oc.firebaseapp.com",
    databaseURL: "https://ownership-chain-oc.firebaseio.com",
    projectId: "ownership-chain-oc",
    storageBucket: "",
};
firebase.initializeApp(firebaseConfig);

export default function SignUpp() {
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [emailId, setEmailId] = React.useState();
    const [password, setPassword] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
        ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device." }
        : undefined);

    return (
        <View style={{flex: 1,justifyContent: 'center',}}>
            <ImageBackground source={require('./images/Login.jpeg')} style={{ flex: 1, justifyContent: 'center' }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Text style={{ marginTop: '40%' }}>Enter Email Id</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder="Email id"
                onChangeText={(emailId) => setEmailId(emailId)}
            />
            <Text style={{ marginTop: 20 }}>Enter Password</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
            <Text style={{ marginTop: 20 }}>Enter phone number</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder="+91 XXXXXXXXXX"
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
            <Button
                title="Send Verification Code"
                disabled={!phoneNumber}
                onPress={async () => {
                    // The FirebaseRecaptchaVerifierModal ref implements the
                    // FirebaseAuthApplicationVerifier interface and can be
                    // passed directly to `verifyPhoneNumber`.
                    try {
                        const phoneProvider = new firebase.auth.PhoneAuthProvider();
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                            phoneNumber,
                            recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);
                        Alert.alert("Verification code has been sent to your phone.")
                    } catch (err) {
                        Alert.alert(err)
                    }
                }
                }
            />
            <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            <Button
                title="Confirm Verification Code"
                disabled={!verificationId}
                onPress={async () => {
                    try {
                        const credential = firebase.auth.PhoneAuthProvider.credential(
                            verificationId,
                            verificationCode
                        );
                        await firebase.auth().createUserWithEmailAndPassword(emailId,password)
                        Alert.alert("Phone authentication successful, you can Login" );
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: "red" });
                    }
                }}
            />
            {message ? (
                <TouchableOpacity
                    style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
                    onPress={() => showMessage(undefined)}>
                    <Text style={{ color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
                        {message.text}
                    </Text>
                </TouchableOpacity>
            ) : undefined}
            </ImageBackground>
        </View>
    );
}
