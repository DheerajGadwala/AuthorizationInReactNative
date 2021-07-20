import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Animated, SafeAreaView, View, Text, Button, TextInput, Image, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styles.js';
import facebook from './images/facebook.png';
import gmail from './images/gmail.png';

const SignInScreen = ({route, navigation})=>{

    const props = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailLabel, setEmailLabel] = useState(new Animated.Value(0));
    const [passwordLabel, setPasswordLabel] = useState(new Animated.Value(0));
    const [confirmPasswordLabel, setConfirmPasswordLabel] = useState(new Animated.Value(0));
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

    return (
        <SafeAreaView style = {styles.screen}>
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
                        <TouchableOpacity style={styles.iconElementTouchable} onPress={()=>{}}>
                            <View style={styles.iconContainer} >
                                <Image source={facebook} style={styles.icon}/>
                                <Text style={styles.iconText}>Facebook</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.iconElement}>
                        <TouchableOpacity style={styles.iconElementTouchable} onPress={()=>{}}>
                            <View style={styles.iconContainer}>
                                <Image source={gmail} style={styles.icon}/>
                                <Text style={styles.iconText}>Gmail</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.inputContainer}>
                    <TextInput
                        onChangeText = {setEmail}
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
                        onChangeText = {setPassword}
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
                <View style = {styles.inputContainer}>
                    <TextInput
                        onChangeText = {setConfirmPassword}
                        onFocus = {()=>{handleFocus(confirmPasswordLabel)}}
                        onBlur = {()=>{handleBlur(confirmPasswordLabel, confirmPassword)}}
                        value = {confirmPassword}
                        secureTextEntry = {true}
                        style = {styles.input}
                    />
                    <AnimatedLabel style ={styles.inputLabel} label = {confirmPasswordLabel}>
                        Confirm Password
                    </AnimatedLabel>
                    <Text style={styles.error}>{confirmPasswordError}</Text>
                </View>
                <View style = {styles.button}>
                    <Button
                        title = "Signup"
                        color="#1a53ff"
                        onPress={()=>{DeviceEventEmitter.emit("login");}}
                    >
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}


export default SignInScreen;