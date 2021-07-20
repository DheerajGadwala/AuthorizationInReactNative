import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInScreen from './components/signInScreen';
import SignUpScreen from './components/signUpScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <>
        <Text>Signed In</Text>
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

const App = () => {

    const [signedIn, setSignedIn] = useState(false);

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
                    initialParams = {{
                        signedIn: signedIn,
                        setSignedIn: setSignedIn
                    }}
                    options={{headerShown: false}} 
                />
                <Stack.Screen
                    name="SignUp" 
                    component={SignUpScreen} 
                    initialParams = {{
                        signedIn: signedIn,
                        setSignedIn: setSignedIn
                    }}
                    options={{headerShown: false}} 
                />
            </Stack.Navigator>
        }
    </NavigationContainer>
  );
};

export default App;