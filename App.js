import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text, Button, DeviceEventEmitter} from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInScreen from './components/authScreens/signInScreen';
import SignUpScreen from './components/authScreens/signUpScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

    const [signedIn, setSignedIn] = useState(false);
    const [signedInEmail, setSignedInEmail] = useState('');
    const [signedInUserId, setSignedInUserId] = useState('');

    const HomeScreen = ({ navigation }) => {
        return (
            <>
            <Text>{signedInEmail}YOLO</Text>
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                {
                console.log('here');
                    // auth()
                    // .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
                    // .then(() => {
                    //     console.log('User account created & signed in!');
                    // })
                    // .catch(error => {
                    //     if (error.code === 'auth/email-already-in-use') {
                    //     console.log('That email address is already in use!');
                    //     }
    
                    //     if (error.code === 'auth/invalid-email') {
                    //     console.log('That email address is invalid!');
                    //     }
    
                    //     console.error(error);
                    // });
                }
                }
            />
            </>
        );
      };

    useEffect(() => {
        DeviceEventEmitter.addListener("login", params =>{
                setSignedIn(true); 
                setSignedInEmail(params.email); 
                setSignedInUserId(params.userId);
            });
    }, []);
  return (
    <NavigationContainer>
        {
            signedIn
            ?
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
            :
            <Stack.Navigator  >
                <Stack.Screen
                    name="SignIn" 
                    component={SignInScreen}
                    options={{headerShown: false}} 
                />
                <Stack.Screen
                    name="SignUp" 
                    component={SignUpScreen} 
                    options={{headerShown: false}} 
                />
            </Stack.Navigator>
        }
    </NavigationContainer>
  );
};

export default App;