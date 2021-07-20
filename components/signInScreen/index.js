import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Animated, StyleSheet, SafeAreaView, View, Text, Button, TextInput, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import facebook from './images/facebook.png';
import gmail from './images/gmail.png';

const SignInScreen = ({route, navigation})=>{

    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `#ccd8ff`
        },
        container: {
            width: '80%',
            backgroundColor: "#ccd8ff",
            padding: 20,
            borderRadius: 5
        },
        titleContainer:{
            width: '100%',
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingBottom: 30
        },
        title: {
            fontSize: 25,
            padding: 10,
            color: 'black',
        },
        selected: {
            fontSize: 25,
            padding: 10,
            backgroundColor: 'white',
            color: 'black',
            borderRadius: 5
        },
        iconsContainer:{
            width: '100%',
            flexDirection: 'row',
            justifyContent:'space-around',
            paddingBottom:30
        },
        iconElement:{
            width: '50%',
            justifyContent:'center',
            alignItems:'center'
        },
        iconElementTouchable:{
        },
        iconContainer:{
            justifyContent:'center',
            alignItems:'center'
        },
        icon:{
            width: 50,
            height: 50
        },
        iconText:{
            color: '#1a53ff',
            fontWeight: '700',
            fontSize: 12
        },
        input: {
            height: 40,
            width: '100%',
            margin: 12,
            borderBottomWidth: 1,
        },
        inputLabel: {
            position: 'absolute',
        },
        inputContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            paddingTop: 10,
            paddingBottom: 5
        },
        button:{
            margin: 12,
            paddingTop: 10,
            paddingBottom: 5
        }
    });

    const props = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailLabel, setEmailLabel] = useState(new Animated.Value(0));
    const [passwordLabel, setPasswordLabel] = useState(new Animated.Value(0));

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

    const handleBlur = (label)=>{
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
                    <TouchableOpacity onPress={()=>{}}>
                        <Text style={styles.title} style={styles.selected}>
                            Login
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('SignUp', { signedIn: props.signedIn, setSignedIn: props.setSignedIn })}}>
                        <Text style={styles.title}>
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
                        onBlur = {()=>{handleBlur(emailLabel)}}
                        value = {email}
                        style = {styles.input}
                    />
                    <AnimatedLabel style ={styles.inputLabel} label = {emailLabel}>
                        Email
                    </AnimatedLabel>
                </View>
                <View style = {styles.inputContainer}>
                    <TextInput
                        onChangeText = {setPassword}
                        onFocus = {()=>{handleFocus(passwordLabel)}}
                        onBlur = {()=>{handleBlur(passwordLabel)}}
                        value = {password}
                        secureTextEntry = {true}
                        style = {styles.input}
                    />
                    <AnimatedLabel style ={styles.inputLabel} label = {passwordLabel}>
                        Password
                    </AnimatedLabel>
                </View>
                <View style = {styles.button}>
                    <Button
                        title = "Login"
                    >
                    </Button>
                </View>
                <View style = {styles.button}>
                    <Button
                        title = "Login with Email Link"
                    >
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}


export default SignInScreen;