import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Animated, SafeAreaView, View, Text, Button, TextInput, Image, TouchableOpacity, DeviceEventEmitter, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import styles from '../styles.js';
import facebook from './images/facebook.png';
import google from './images/google.png';

const SignInScreen = ({navigation})=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailLabel, setEmailLabel] = useState(new Animated.Value(0));
    const [passwordLabel, setPasswordLabel] = useState(new Animated.Value(0));
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    GoogleSignin.configure({
        webClientId: "817191026253-dg0sr94gh2jkt0tcl2o9k9c7chub6fsg.apps.googleusercontent.com"
      });

    const AnimatedLabel = (props) =>{
        return (
            <Animated.View
            style={{
                ...props.style,
                left: props.label.interpolate({inputRange: [0, 1], outputRange: ['0%', '-2%']}),
                top: props.label.interpolate({inputRange: [0, 1], outputRange: [35, 10]}),
            }}
            pointerEvents={'none'}
            >
                <Animated.Text
                style={{
                    color: props.label.interpolate({inputRange: [0, 1], outputRange: ['#404040', '#1a53ff']}),
                    fontSize: props.label.interpolate({inputRange: [0, 1], outputRange: [18, 14]}),
                    fontWeight: props.label.interpolate({inputRange: [0, 1], outputRange: ['100', '700']})
                }}
                >
                    {props.children}
                </Animated.Text>
        </Animated.View>
        );
    }
      
    const handleFocus = (label)=>{
        Animated.timing(
            label,
            {
              toValue: 1,
              duration: 200,
              useNativeDriver: false
            }
        ).start();
    }

    const handleBlur = (label, empty)=>{
        if(!empty)
            Animated.timing(
                label,
                {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
                }
            ).start();
    }

    const  validateEmail = () => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let ret = re.test(email);
        if(!ret)
            setEmailError('Invalid email id');
        return ret;
    }

    const validatePassword = ()=> {
        if(!password){
            setPasswordError('Password can not be empty');
            return false;
        }
        else{
            return true;
        }
    }

    const validateInput = ()=>{
        return validateEmail() && validatePassword();
    }

    const handleLoginSubmit = async ()=>{
        if(validateInput()){
            try{
                let result = await auth().signInWithEmailAndPassword(email, password);
                let user = result.user;
                DeviceEventEmitter.emit("login", {'userDetails' : user});
            }
            catch(error){
                if(error.code==='auth/user-not-found'){
                    setEmailError('No record of user found');
                }
                else if(error.code==='auth/wrong-password'){
                    setPasswordError('Wrong password or user has no password');
                }
            }
        }
    }

    //https://developers.facebook.com/docs/facebook-login/android
    const facebookLogin = async ()=>{
        try{
            let permissions = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if(permissions.isCancelled)       //When user cancels login/ signup
                throw 'user cancelled login process';
            let data = await AccessToken.getCurrentAccessToken();
            if(!data)
                throw 'somthing went wrong'
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            let result = await auth().signInWithCredential(facebookCredential);
            let user = result.user;
            DeviceEventEmitter.emit("login", {'userDetails' : user});
        }
        catch(error){
            console.log(error);
        }
    }

    const googleLogin = async ()=>{
        try{
            let a = await GoogleSignin.hasPlayServices();
            console.log(JSON.stringify(a));
            let {idToken} = await GoogleSignin.signIn();
            let googleCredentials = auth.GoogleAuthProvider.credential(idToken);
            let result = await auth().signInWithCredential(googleCredentials);
            let user = result.user;
            DeviceEventEmitter.emit("login", {'userDetails' : user});
        }
        catch(error){
            console.log(JSON.stringify(error));
        }

    }

    const handleSubmit = ()=>{
        if(validateInput()){
        }
    }

    return (
        <SafeAreaView style = {styles.screen}>
            <ScrollView style = {styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            <View style = {styles.container}>
                <View style = {styles.titleContainer}>
                    <TouchableOpacity onPress={()=>{}}>
                        <Text style={styles.title} style={styles.selected}>
                            Login
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                        <Text style={styles.title}>
                            Signup
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.iconsContainer}>
                    <View style = {styles.iconElement}>
                        <TouchableOpacity style={styles.iconElementTouchable} onPress={facebookLogin}>
                            <View style={styles.iconContainer} >
                                <Image source={facebook} style={styles.icon}/>
                                <Text style={styles.iconText}>Facebook</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.iconElement}>
                        <TouchableOpacity style={styles.iconElementTouchable} onPress={googleLogin}>
                            <View style={styles.iconContainer}>
                                <Image source={google} style={styles.icon}/>
                                <Text style={styles.iconText}>Google</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.inputContainer}>
                    <TextInput
                        onChangeText = {(text)=>{emailError?setEmailError(''):()=>{}; setEmail(text)}}
                        onFocus = {()=>{handleFocus(emailLabel)}}
                        onBlur = {()=>{handleBlur(emailLabel, email)}}
                        value = {email}
                        style = {styles.input}
                    />
                    <AnimatedLabel style ={styles.inputLabel} label = {emailLabel}>
                        Email
                    </AnimatedLabel>
                    <Text style={styles.error}>{emailError}</Text>
                </View>
                <View style = {styles.inputContainer}>
                    <TextInput
                        onChangeText = {(text)=>{passwordError?setPasswordError(''):()=>{}; setPassword(text)}}
                        onFocus = {()=>{handleFocus(passwordLabel)}}
                        onBlur = {()=>{handleBlur(passwordLabel, password)}}
                        value = {password}
                        secureTextEntry = {true}
                        style = {styles.input}
                    />
                    <AnimatedLabel style ={styles.inputLabel} label = {passwordLabel}>
                        Password
                    </AnimatedLabel>
                    <Text style={styles.error}>{passwordError}</Text>
                </View>
                <View style = {styles.button}>
                    <Button
                        title = "Login"
                        color="#1a53ff"
                        onPress={handleLoginSubmit}
                    >
                    </Button>
                </View>
                <View style = {styles.button}>
                    <Button
                        title = "Login with Email Link"
                        color="#1a53ff"
                        onPress = {handleSubmit}
                    >
                    </Button>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default SignInScreen;