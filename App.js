import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, Button, DeviceEventEmitter} from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInScreen from './components/authScreens/signInScreen';
import SignUpScreen from './components/authScreens/signUpScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [signedIn, setSignedIn] = useState(auth()._user!==null);
    const [userDetails, setUserDetails] = useState(auth()._user);

    useEffect(()=>{
        //onAuthStateChange is not detecting changes made to emailVerified, so I'm using DeviceEventEmitter instead.
        DeviceEventEmitter.addListener('@verified_login', params=>{
            setIsLoading(true);
            setSignedIn(auth()._user!==null);
            setUserDetails(auth()._user);
            setIsLoading(false);
        });
    }, []);


    const HomeScreen = ({ navigation }) => {
        return (
            <>
            <Text></Text>
            <Button
                title="Logout"
                onPress={async () =>{
                        setIsLoading(true);
                        await auth().signOut();
                        setSignedIn(false);
                        setUserDetails(null);
                        setIsLoading(false);
                    }
                }
            />
            </>
        );
      };

  return (
    <NavigationContainer>
        {
            isLoading?
            <></>
            :
            signedIn && (userDetails.emailVerified || userDetails.providerData[0].providerId!=='password')
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