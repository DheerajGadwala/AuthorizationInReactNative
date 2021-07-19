import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
        {
          console.log('here');
            auth()
              .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
              .then(() => {
                console.log('User account created & signed in!');
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }

                console.error(error);
              });
        }
        }
      />
    );
  };

  const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };
const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
            />
            <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;