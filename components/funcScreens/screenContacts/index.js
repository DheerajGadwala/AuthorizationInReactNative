import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AnimatedMessageBox from './messageBox'
import styles from './styles.js';
import defaultUser from './Images/defaultUser.png';

const ContactsScreen = ({navigation})=>{

    //const data = (async ()=>{let a = await firestore().collection('Users').doc(auth().currentUser.uid).get(); console.log(a); return a;})();
    const [messageBoxText, setMessageBoxText] = useState('');
    const [messageBoxType, setMessageBoxType] = useState('withInput');

    const addContact = async ()=>{
        setMessageBoxText('please enter the email you want to add');
    }

    return(
        <View style={styles.screenContainer}>
            <AnimatedMessageBox type = {messageBoxType} displayText = {messageBoxText} setDisplayText = {setMessageBoxText}/>
            <FlatList
                data={[
                ]}
                renderItem={({item}) => 
                <View style={styles.contactContainer}>
                    <View style = {styles.userImageContainer}>
                        <Image style = {styles.userImage}
                            source={defaultUser}
                        />                      
                    </View>
                    <View style={styles.contactDetailsContainer}>
                        <Text style = {styles.contactName}>Name: {item.key}</Text>
                        <Text style = {styles.contactEmail}>Email: {item.key}</Text>
                    </View>
                </View>
            }
            />
            <TouchableOpacity style = {styles.addContactHolder} onPress = {addContact}>
                <View style = {styles.horizontalBar}/>
                <View style = {styles.verticalBar}/>
            </TouchableOpacity>
        </View>
    );
}

export default ContactsScreen;