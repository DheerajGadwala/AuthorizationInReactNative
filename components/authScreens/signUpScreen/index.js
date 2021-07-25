import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Animated, SafeAreaView, View, Text, Button, TextInput, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, DeviceEventEmitter} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import styles from '../styles.js';
import facebook from './images/facebook.png';
import google from './images/google.png';
import info from './images/info.png';

const SignInScreen = ({navigation})=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailLabelAnimator, setEmailLabelAnimator] = useState(new Animated.Value(0));
    const [passwordLabelAnimator, setPasswordLabelAnimator] = useState(new Animated.Value(0));
    const [confirmPasswordLabelAnimator, setConfirmPasswordLabelAnimator] = useState(new Animated.Value(0));
    const [passwordInfoModalAnimator, setPasswordInfoModalAnimator] = useState(new Animated.Value(0));
    const [messageBoxAnimator, setMessageBoxAnimator] = useState(new Animated.Value(0));
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
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

    const PasswordInfoModal = (props) =>{
        return(
            <Animated.View
            style={{
                ...props.style,
                transform: [{scale: passwordInfoModalAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 1]})}],
                left: passwordInfoModalAnimator.interpolate({inputRange:[0, 1], outputRange:['-150%', '-400%']})
            }}
            pointerEvents={'none'}
            >
                <Text style={styles.passwordInfoText}> The password must contain a minimum of 8 characters and at least one lowercase character, one uppercase character, one digit and one special character.</Text>
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
                useNativeDriver: false,
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

    const validatePassword = () =>{
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let ret = re.test(password);
        if(!ret)
            setPasswordError('Password too weak');
        return ret;
    }

    const validateConfirmPassword = ()=> {
        if(password!==confirmPassword){
            setConfirmPasswordError('Passwords do not match');
            return false;
        }
        else{
            return true;
        }
    }

    const validateInput = ()=>{
        return validateEmail() && validatePassword() && validateConfirmPassword();
    }

    const togglePasswordInfoModal = ()=>{
        if(JSON.stringify(passwordInfoModalAnimator)==='0')
            Animated.timing(
                passwordInfoModalAnimator,
                {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }
            ).start();
        else
            Animated.timing(
                passwordInfoModalAnimator,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }
            ).start(); 
    }

    const turnOffPasswordInfoModal = ()=>{
        if(JSON.stringify(passwordInfoModalAnimator)==='1')
            Animated.timing(
                passwordInfoModalAnimator,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                }
            ).start(); 
    }

    //https://developers.facebook.com/docs/facebook-login/android
    const facebookSignup = async ()=>{
        turnOffPasswordInfoModal();
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


    //https://github.com/react-native-google-signin/google-signin#project-setup-and-initialization
    const googleSignup = async ()=>{
        turnOffPasswordInfoModal();
        try{
            let a = await GoogleSignin.hasPlayServices();
            console.log(JSON.stringify(a));
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

    const handleSubmit = async ()=>{
        turnOffPasswordInfoModal();
        if(validateInput()){
            try{
                await auth().createUserWithEmailAndPassword(email, password).then(userData=>{
                    userData.user.sendEmailVerification();
                    setMessageBox('A verification link has been sent to your email. Please verify to proceed.');
                    let emailVerificationEventListener = setInterval(async ()=>{
                        console.log('listening', auth().currentUser, auth()._user);
                        auth().currentUser.reload();
                        if (auth().currentUser.emailVerified) {
                            clearInterval(emailVerificationEventListener);
                            DeviceEventEmitter.emit('@verified_login');
                        }
                    }, 1000);
                });
            }
            catch(error){
                if(error.code==='auth/email-already-in-use')
                    setEmailError('An account is already linked to this email');
                else
                    setMessageBox(error);
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
        <TouchableWithoutFeedback onFocus={turnOffPasswordInfoModal} onPress={turnOffPasswordInfoModal}>
            <SafeAreaView style = {styles.screen}>
                <ScrollView style = {styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                    <TouchableWithoutFeedback onFocus={turnOffPasswordInfoModal} onPress={turnOffPasswordInfoModal}>
                        <View style = {styles.container}>
                        <AnimatedMessageBox style = {styles.messageBoxContainer}/>
                            <View style = {styles.titleContainer}>
                                <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}>
                                    <Text style={styles.title}>
                                        Login
                                    </Text> 
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{}}>
                                    <Text style={styles.title} style={styles.selected}>
                                        Signup
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.iconsContainer}>
                                <View style = {styles.iconElement}>
                                    <TouchableOpacity style={styles.iconElementTouchable} onPress={facebookSignup}>
                                        <View style={styles.iconContainer} >
                                            <Image source={facebook} style={styles.icon}/>
                                            <Text style={styles.iconText}>Facebook</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.iconElement}>
                                    <TouchableOpacity style={styles.iconElementTouchable} onPress={googleSignup}>
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
                                    onFocus = {()=>{handleFocus(emailLabelAnimator)}}
                                    onBlur = {()=>{handleBlur(emailLabelAnimator, email)}}
                                    value = {email}
                                    style = {styles.input}
                                />
                                <AnimatedLabel style ={styles.inputLabel} label = {emailLabelAnimator}>
                                    Email
                                </AnimatedLabel>
                                <Text style={styles.error}>{emailError}</Text>
                            </View>
                            <View style = {styles.inputContainer}>
                                <TextInput
                                    onChangeText = {(text)=>{passwordError?setPasswordError(''):()=>{}; setPassword(text)}}
                                    onFocus = {()=>{handleFocus(passwordLabelAnimator)}}
                                    onBlur = {()=>{handleBlur(passwordLabelAnimator, password)}}
                                    value = {password}
                                    secureTextEntry = {true}
                                    style = {styles.inputPassword}
                                />
                                <AnimatedLabel style ={styles.inputLabel} label = {passwordLabelAnimator}>
                                    Password
                                </AnimatedLabel>
                                <Text style={styles.error}>{passwordError}</Text>
                                <View style={styles.infoIconContainer}>
                                    <TouchableOpacity onPress={togglePasswordInfoModal}>
                                        <Image source={info} style={styles.passwordInfo}/>
                                    </TouchableOpacity>
                                    <PasswordInfoModal
                                        style = {styles.passwordInfoModal}
                                    />
                                </View>
                            </View>
                            <View style = {styles.inputContainer}>
                                <TextInput
                                    onChangeText = {(text)=>{confirmPasswordError?setConfirmPasswordError(''):()=>{}; setConfirmPassword(text)}}
                                    onFocus = {()=>{handleFocus(confirmPasswordLabelAnimator)}}
                                    onBlur = {()=>{handleBlur(confirmPasswordLabelAnimator, confirmPassword)}}
                                    value = {confirmPassword}
                                    secureTextEntry = {true}
                                    style = {styles.input}
                                />
                                <AnimatedLabel style ={styles.inputLabel} label = {confirmPasswordLabelAnimator}>
                                    Confirm Password
                                </AnimatedLabel>
                                <Text style={styles.error}>{confirmPasswordError}</Text>
                            </View>
                            <View style = {styles.button}>
                                <Button
                                    title = "Signup"
                                    color="#1a53ff"
                                    onPress={handleSubmit}
                                >
                                </Button>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}


export default SignInScreen;