import SignInScreen from './ScreenSignIn';
import SignUpScreen from './ScreenSignUp';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthScreen = ()=>{
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
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
        </NavigationContainer>
    );
}

export default AuthScreen;