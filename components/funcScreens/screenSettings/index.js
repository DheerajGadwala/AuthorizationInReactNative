import 'react-native-gesture-handler';
import React from 'react';
import {View, Button, LogBox} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles.js';

const SettingsScreen = ({navigation, route})=>{

    LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);
    const props = route.params;

    return(
        <View style={styles.screenContainer}>
                <Button
                    title="Logout"
                    onPress={async () =>{
                        props.setIsLoading(true);
                        await auth().signOut();
                        props.setSignedIn(false);
                        props.setUserDetails(null);
                        props.setIsLoading(false);
                        }
                    }
                />
        </View>
    );
}

export default SettingsScreen;