import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    messageBoxContainer:{
        position: 'absolute',
        zIndex: 3,
        width:'100%',
        height:'100%',
        
    },
    messageBox: {
        position: 'relative',
        margin: 20,
        padding: 20,
        justifyContent: 'space-around',
        alignItems:'center',
        borderRadius: 7,
        backgroundColor: '#33334d',
    },
    messageBoxText: {
        color: 'white',
        paddingBottom: 20
    },
    messageBoxButton:{
        width:'50%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#4da6ff',
        alignItems:'center',
        justifyContent:'center'
    },
    messageBoxButtonText:{
        color: 'white',
        fontSize: 18
    },
    inputContainer: {
        width: '80%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 30
    },
    input: {
        height: 40,
        width: '100%',
        marginTop: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: 'white',
        color: 'white'
    },
    inputLabel: {
        position: 'absolute',
    },
    error:{
        position: 'absolute',
        color:'red',
        fontWeight: '700',
        top: 65,
        left: 0
    },
});

export default styles;