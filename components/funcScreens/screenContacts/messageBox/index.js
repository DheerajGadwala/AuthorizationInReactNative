import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Animated, View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles.js';

const AnimatedMessageBox = (props) =>{
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailLabel, setEmailLabel] = useState(new Animated.Value(0));
    const [messageBoxAnimator, setMessageBoxAnimator] = useState(new Animated.Value(0));

    const  validateEmail = () => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let ret = re.test(email);
        if(!ret)
            setEmailError('Invalid email id');
        return ret;
    }

    const handleSubmit = async ()=>{
        if(validateEmail()){
            //perform Action
            setEmail('');
            setEmailError('');
            props.setDisplayText('');
        }
        else{
            setEmailError('Invalid email');
        }
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

    const AnimatedLabel = (props) =>{
        return (
            <Animated.View
            style={{
                ...styles.inputLabel,
                left: props.label.interpolate({inputRange: [0, 1], outputRange: ['0%', '-2%']}),
                top: props.label.interpolate({inputRange: [0, 1], outputRange: [35, 10]}),
            }}
            pointerEvents={'none'}
            >
                <Animated.Text
                style={{
                    color: props.label.interpolate({inputRange: [0, 1], outputRange: ['white', '#4da6ff']}),
                    fontSize: props.label.interpolate({inputRange: [0, 1], outputRange: [18, 14]}),
                    fontWeight: props.label.interpolate({inputRange: [0, 1], outputRange: ['100', '700']})
                }}
                >
                    {props.children}
                </Animated.Text>
        </Animated.View>
        );
    }
    useEffect(()=>{
        if(props.displayText){
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
    }, [props.displayText]);
    if(props.displayText==='')
        return(<></>);
    else if(props.type==='withInput')
        return (
            <Animated.View style= {{
                ...styles.messageBoxContainer,
                transform: [{scale: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 1]})}],
                opacity: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 1]}),
                zIndex: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 3]})
                }}>
                <View style = {styles.messageBox}>
                    <Text style = {styles.messageBoxText}>{props.displayText}</Text>
                    <View style = {styles.inputContainer}>
                        <TextInput
                            onChangeText = {(text)=>{if(emailError) setEmailError(''); setEmail(text);}}
                            onFocus = {()=>{handleFocus(emailLabel)}}
                            onBlur = {(text)=>{handleBlur(emailLabel, email, text)}}
                            value = {email}
                            style = {styles.input}
                        />
                        <AnimatedLabel label = {emailLabel}>
                            Email
                        </AnimatedLabel>
                        <Text style={styles.error}>{emailError}</Text>
                    </View>
                    <TouchableOpacity style = {styles.messageBoxButton} onPress={handleSubmit}>
                        <Text style = {styles.messageBoxButtonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
        else if(props.type!=='withoutInput')
        return (
            <Animated.View style= {{
                ...styles.messageBoxContainer,
                transform: [{scale: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 1]})}],
                opacity: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 1]}),
                zIndex: messageBoxAnimator.interpolate({inputRange:[0, 1], outputRange:[0, 3]})
                }}>
                <View style = {styles.messageBox}>
                    <Text style = {styles.messageBoxText}>{props.displayText}</Text>
                    <TouchableOpacity style = {styles.messageBoxButton} onPress={()=>{props.setDisplayText('')}}>
                        <Text style = {styles.messageBoxButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
}

export default AnimatedMessageBox;