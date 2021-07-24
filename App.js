import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, Button, DeviceEventEmitter} from 'react-native';
import SignInScreen from './components/authScreens/signInScreen';
import SignUpScreen from './components/authScreens/signUpScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

    const [signedIn, setSignedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        DeviceEventEmitter.addListener("login", params =>{
                setSignedIn(true);
                setUserDetails(params.userDetails);
            });
    }, []);

    const HomeScreen = ({ navigation }) => {
        return (
            <>
            <Text>{userDetails?userDetails.email:''}</Text>
            <Button
                title="Go to Jane's profile"
                onPress={() =>{
                        console.log('here');
                    }
                }
            />
            </>
        );
      };

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