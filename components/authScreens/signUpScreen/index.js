import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Animated, easing, SafeAreaView, View, Text, Button, TextInput, Image, TouchableOpacity, DeviceEventEmitter, ScrollView, TouchableWithoutFeedback} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styles.js';
import facebook from './images/facebook.png';
import gmail from './images/gmail.png';
import info from './images/info.png';

const SignInScreen = ({navigation})=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailLabelAnimator, setEmailLabelAnimator] = useState(new Animated.Value(0));
    const [passwordLabelAnimator, setPasswordLabelAnimator] = useState(new Animated.Value(0));
    const [confirmPasswordLabelAnimator, setConfirmPasswordLabelAnimator] = useState(new Animated.Value(0));
    const [passwordInfoModalAnimator, setPasswordInfoModalAnimator] = useState(new Animated.Value(0));
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

    const  validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validatePassword = (password) =>{
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
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

    const handleSubmit = ()=>{
        turnOffPasswordInfoModal();
        let checker = true;
        if(!validateEmail(email))
            {setEmailError('Invalid email id');checker=false;}
        if(!validatePassword(password))
            {setPasswordError('Password too weak');checker=false;}
        if(password !== confirmPassword)
            {setConfirmPasswordError('Passwords do not match');checker=false;}
        if(checker)
            {
                auth().createUserWithEmailAndPassword(email, password)
                .then((result)=>{
                    let user = result.user;
                    console.log(user);
                    DeviceEventEmitter.emit("login", {'email':user.email, 'userId':user.userId});
                })
                .catch((error)=>{
                    console.log(error);
                });
            }
    }

    return (
        <TouchableWithoutFeedback onFocus={turnOffPasswordInfoModal} onPress={turnOffPasswordInfoModal}>
            <SafeAreaView style = {styles.screen}>
                <ScrollView style = {styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                    <TouchableWithoutFeedback onFocus={turnOffPasswordInfoModal} onPress={turnOffPasswordInfoModal}>
                        <View style = {styles.container}>
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
                                    <TouchableOpacity style={styles.iconElementTouchable} onPress={turnOffPasswordInfoModal}>
                                        <View style={styles.iconContainer} >
                                            <Image source={facebook} style={styles.icon}/>
                                            <Text style={styles.iconText}>Facebook</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.iconElement}>
                                    <TouchableOpacity style={styles.iconElementTouchable} onPress={turnOffPasswordInfoModal}>
                                        <View style={styles.iconContainer}>
                                            <Image source={gmail} style={styles.icon}/>
                                            <Text style={styles.iconText}>Gmail</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.inputContainer}>
                                <TextInput
                                    onChangeText = {(text)=>{setEmailError(''); setEmail(text)}}
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
                                    onChangeText = {(text)=>{setPasswordError(''); setPassword(text)}}
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
                                    {/* <View style = {styles.passwordInfoModal}>
                                        <Text style = {styles.passwordInfoText}> The password must contain a minimum of 8 characters and at least one lowercase character, one uppercase character, one digit and one special character.</Text>
                                    </View> */}
                                </View>
                            </View>
                            <View style = {styles.inputContainer}>
                                <TextInput
                                    onChangeText = {(text)=>{setConfirmPasswordError(''); setConfirmPassword(text)}}
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