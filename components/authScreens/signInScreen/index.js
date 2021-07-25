import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Animated, SafeAreaView, View, Text, Button, TextInput, Image, TouchableOpacity, ScrollView, DeviceEventEmitter} from 'react-native';
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
    const [messageBoxAnimator, setMessageBoxAnimator] = useState(new Animated.Value(0));
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [messageBox, setMessageBox] = useState('');

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

    const AnimatedMessageBox = (props) =>{
        return (
            <Animated.View style= {{
                ...props.style,
                transform: [{scale: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 1]})}],
                opacity: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 1]}),
                zIndex: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 3]})
                }}>
                <View style = {styles.messageBox}>
                    <Text style = {styles.messageBoxText}>{messageBox}</Text>
                    <View style = {styles.messageBoxButton}>
                        <Button
                            title = "Ok"
                            color="#4da6ff" 
                            onPress = {()=>{setMessageBox('')}}
                        >
                        </Button>
                    </View>
                </View>
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
                await auth().signInWithEmailAndPassword(email, password);
                if(auth()._user.emailVerified)
                    DeviceEventEmitter.emit('@verified_login');
                else{
                        auth()._user.sendEmailVerification()
                        .then(()=>{
                            setMessageBox('A verification link has been sent to your email. Please verify to proceed.');
                            let emailVerificationEventListener = setInterval(async ()=>{
                                auth().currentUser.reload();
                                if (auth().currentUser.emailVerified) {
                                    clearInterval(emailVerificationEventListener);
                                    DeviceEventEmitter.emit('@verified_login');
                                }
                            }, 1000); 
                        })
                        .catch(error=>{
                            if(error.code === 'auth/too-many-requests')
                                setMessageBox('We have blocked all requests from this device due to unusual activity. Try again later.');
                            else
                                setMessageBox(error);
                    });
                }
            }
            catch(error){
                if(error.code==='auth/user-not-found'){
                    setEmailError('No record of user found');
                }
                else if(error.code==='auth/wrong-password'){
                    setPasswordError('Wrong password or user has no password');
                }
                else{
                    setMessageBox(error);
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
            await auth().signInWithCredential(facebookCredential);
            DeviceEventEmitter.emit('@verified_login');
        }
        catch(error){
            if(error.code==='auth/account-exists-with-different-credential'){
                setMessageBox(`An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address. [Try logging in with your Google account]`);
            }
            else{
                setMessageBox(error);
            }
        }
    }

    const googleLogin = async ()=>{
        try{
            let a = await GoogleSignin.hasPlayServices();
            let {idToken} = await GoogleSignin.signIn();
            let googleCredentials = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredentials);
            DeviceEventEmitter.emit('@verified_login');
        }
        catch(error){
            if(error.code==='auth/account-exists-with-different-credential'){
                setMessageBox(`An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address. [Try logging in with your Facebook account]`);
            }
            else{
                setMessageBox(error);
            }
        }

    }

    const resetPassword = async()=>{
        console.log(auth());
        if(validateEmail()){
            try{
                await auth().sendPasswordResetEmail(email);
                setMessageBox('An email link to reset your password has been sent');
            }
            catch(error){
                if(error.code='auth/user-not-found'){
                    setMessageBox('There is no user record corresponding to this email. The user may have been deleted.')
                }
                else{
                    setMessageBox(error.message);
                }
            }
        }
    }

    useEffect(()=>{
        if(messageBox){
            Animated.timing(
                messageBoxAnimator,
                {
                  toValue: 1,
                  duration: 200,
                  useNativeDriver: false
                }
            ).start();
        }
        else{
            Animated.timing(
                messageBoxAnimator,
                {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: false
                }
            ).start();
        }
    }, [messageBox]);

    return (
        <SafeAreaView style = {styles.screen}>
            <ScrollView style = {styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            <View style = {styles.container}>
                <AnimatedMessageBox style = {styles.messageBoxContainer}/>
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
                        title = "Reset Password"
                        color="#1a53ff"
                        onPress = {resetPassword}
                    >
                    </Button>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default SignInScreen;