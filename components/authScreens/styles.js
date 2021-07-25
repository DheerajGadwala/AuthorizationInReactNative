
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `#ccd8ff`
    },
    scrollContainer:{
        width:'100%',
    },
    scrollContent:{
        flexGrow: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    container: {
        width: '80%',
        backgroundColor: "#ccd8ff",
        padding: 20,
        borderRadius: 5,
    },
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
        width: '100%',
        top: '40%',
        height:'35%',
        justifyContent: 'space-around',
        alignItems:'center',
        borderRadius: 7,
        backgroundColor: '#33334d'
    },
    messageBoxText: {
        color: 'white',
        paddingBottom: 20
    },
    messageBoxButton:{
        width:'50%',
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
        backgroundColor: '#1a53ff',
        color: 'white',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#1a53ff'
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
    inputContainer: {
        width: '100%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 5
    },
    input: {
        height: 40,
        width: '100%',
        marginTop: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
    },
    inputPassword: {
        height: 40,
        width: '80%',
        marginTop: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
    },
    infoIconContainer:{
        width: '20%',
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        justifyContent:'center',
        alignItems:'center',
        position: 'relative'
    },
    passwordInfo:{
        width: 30,
        height: 30
    },
    passwordInfoModal:{
        backgroundColor: '#1a53ff',
        padding: 15,
        position: 'absolute',
        borderRadius: 5,
        zIndex: 2,
        width: '400%',
        left: '50%'
    },
    passwordInfoText:{
        color:'white',
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
    button:{
        margin: 12,
        paddingTop: 10,
        paddingBottom: 5,
        zIndex: 1
    }
});

export default styles;