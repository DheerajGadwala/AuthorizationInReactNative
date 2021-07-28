import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    contactContainer:{
        padding: 5, 
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    userImageContainer:{
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userImage:{
        width: 70,
        height: 70,
    },  
    contactDetailsContainer: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addContactHolder:{
        position: 'absolute',
        zIndex: 2,
        width: 65,
        height: 65,
        opacity: 1,
        backgroundColor: '#66c2ff',
        borderRadius: 50,
        bottom: 35,
        right: 35
    },
    horizontalBar:{
        position: 'absolute',
        width: 25,
        height: 4,
        backgroundColor: 'white',
        top: 30.5,
        left: 20
    },
    verticalBar:{
        position:'absolute',
        width: 4,
        height: 25,
        backgroundColor: 'white',
        top: 20,
        left: 30.5

    },
});

export default styles;