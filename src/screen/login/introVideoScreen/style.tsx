import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const IntroVideoStyle = StyleSheet.create({
    container: {
        flex: 1, // justifyContent: 'center', alignItems: 'center'
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mediaPlayer: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        flex: 1,
        backgroundColor: 'black',
        // justifyContent: 'center',
        width: windowWidth, // Set width to 80% of the screen width
        height: windowHeight
    },
})

export default IntroVideoStyle