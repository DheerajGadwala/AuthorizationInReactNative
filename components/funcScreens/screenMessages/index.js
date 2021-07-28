import 'react-native-gesture-handler';
import React from 'react';
import {Animated, SafeAreaView, View, Text, Button, TextInput, Image, TouchableOpacity, ScrollView, DeviceEventEmitter} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles.js';

const MessagesScreen = ({navigation})=>{
    return(
        <View style={styles.screenContainer}>
            <Text>Messages</Text>
        </View>
    );
}

export default MessagesScreen;