
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `#ccd8ff`
    },
    container: {
        width: '80%',
        backgroundColor: "#ccd8ff",
        padding: 20,
        borderRadius: 5
    },
    titleContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingBottom: 30
    },
    title: {
        fontSize: 25,
        padding: 10,
        color: 'black',
    },
    selected: {
        fontSize: 25,
        padding: 10,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 5,
    },
    iconsContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingBottom:30
    },
    iconElement:{
        width: '50%',
        justifyContent:'center',
        alignItems:'center'
    },
    iconElementTouchable:{
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        width: 50,
        height: 50
    },
    iconText:{
        color: '#1a53ff',
        fontWeight: '700',
        fontSize: 12
    },
    input: {
        height: 40,
        width: '100%',
        margin: 12,
        borderBottomWidth: 1,
    },
    inputLabel: {
        position: 'absolute',
    },
    inputContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 5
    },
    error:{
        position: 'absolute',
        color:'red',
        fontWeight: '700',
        top: 65,
        left: 0
    },
    button:{
        margin: 12,
        paddingTop: 10,
        paddingBottom: 5
    }
});

export default styles;