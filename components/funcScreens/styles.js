
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    topNav: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '10%',
        minHeight: 90,
        backgroundColor: '#193366',
        borderBottomColor: '#193366',
        borderBottomWidth: 5
    },
    topNavTextContainer: {
        width: '40%',
        height: '100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    topNavIconContainer:{
        width: '20%',
        height: '100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    screenSelectorBar: {
        position: 'absolute',
        top: '100%',
        width: '40%',
        height: 5,
        backgroundColor: 'white',
    },
    topNavText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    topNavIcon: {
        width: 25,
        height: 25
    }
});

export default styles;