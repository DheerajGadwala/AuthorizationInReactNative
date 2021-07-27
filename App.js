import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import auth from '@react-native-firebase/auth';
import AuthScreen from './components/authScreens';
import FuncScreen from './components/funcScreens';

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

  return (
        <>
        {
            isLoading?
            <></>
            :
            signedIn && (userDetails.emailVerified || userDetails.providerData[0].providerId!=='password')
            ?
            <FuncScreen
            setIsLoading = {setIsLoading}
            setSignedIn = {setSignedIn}
            setUserDetails = {setUserDetails}
            />
            :
            <AuthScreen/>
        }
        </>
    
  );
};

export default App;