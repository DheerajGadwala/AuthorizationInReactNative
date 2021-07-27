import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Animated, SafeAreaView, View, Text, Button, TextInput, Image, TouchableOpacity, ScrollView, DeviceEventEmitter} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MessagesScreen from './screenMessages';
import ContactsScreen from './screenContacts';
import SettingsScreen from './screenSettings';
import styles from './styles.js';
import settings from './images/settings.png';

const FuncScreen = (props)=>{

    const Stack = createStackNavigator();
    const innerNavigatorRef = React.createRef()
    const [selectionBarAnimator, setSelectionBarAnimator] =  useState(new Animated.Value(0));

    const SelectionBar = ()=>{
        return(
            <Animated.View 
                style = {{
                    ...styles.screenSelectorBar,
                    left: selectionBarAnimator.interpolate({inputRange:['0', '1'], outputRange:['0%', '100%']}),
                }}
            />
        );
    }

    const navigateTo = (destination)=>{
        let allScreens = {'Messages': '0', 'Contacts': '0.4', 'Settings': '0.8'};
        if(JSON.stringify(selectionBarAnimator)!==allScreens[destination])
        {
            Animated.timing(
                selectionBarAnimator, 
                {
                    toValue: allScreens[destination], 
                    duration:200, 
                    useNativeDriver: false
                }
            ).start();
            innerNavigatorRef.current.navigate(destination);
        }

    }

    return(
        <>
        <SafeAreaView style = {styles.topNav}>
            <TouchableOpacity style = {styles.topNavTextContainer} onPress={()=>{navigateTo('Messages')}}>
                <Text style = {styles.topNavText}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.topNavTextContainer} onPress={()=>{navigateTo('Contacts')}}>
                <Text style = {styles.topNavText}>Contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.topNavIconContainer} onPress={()=>{navigateTo('Settings')}}>
                <Image style = {styles.topNavIcon}source = {settings}/>
            </TouchableOpacity>
            <SelectionBar/>
        </SafeAreaView>
        <NavigationContainer independent={true} ref = {innerNavigatorRef}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Messages"
                    component={MessagesScreen}
                    options={{headerShown: false}}
                    listeners = {
                        ()=>({
                            focus: ()=>{navigateTo('Messages')}
                        })
                    }
                />
                <Stack.Screen
                    name="Contacts"
                    component={ContactsScreen}
                    options={{headerShown: false}}
                    listeners = {
                        ()=>({
                            focus: ()=>{navigateTo('Contacts')}
                        })
                    }
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{headerShown: false}}
                    initialParams={{
                        setIsLoading: props.setIsLoading,
                        setSignedIn: props.setSignedIn,
                        setUserDetails: props.setUserDetails
                    }}
                    listeners = {
                        ()=>({
                            focus: ()=>{navigateTo('Settings')}
                        })
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    );
}

export default FuncScreen;