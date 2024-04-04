import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import IntroVideoStyle from './style'
import { useNavigation } from '@react-navigation/native';
// import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';


const IntroVideoScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const backAction = () => {
            // Close the application when back button is pressed
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(1);
    const [endVideo, setEndVideo] = useState(1)
    const [screenType, setScreenType] = useState('content');
    const [initialRoute, setInitialRoute] = useState('');
    const getInitialRouteName = async () => {
        try {
            const data = await AsyncStorage.getItem('token');
            if (data) {
                setInitialRoute("MyDrawer");
            } else {
                setInitialRoute('IntroImage');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
            setInitialRoute("IntroImage");
        }
    };
    useEffect(() => {

        getInitialRouteName();

        return () => {

        }
    }, [])
    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        // setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        // if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
        setCurrentTime(data.currentTime);
        // }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => navigation.reset({
        index: 0,
        routes: [{ name: initialRoute }],
    });

    const onError = () => alert('Oh! ', error);

    const exitFullScreen = () => {
        alert('Exit full screen');
    };

    const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'content') setScreenType('cover');
        else setScreenType('content');
    };

    // const renderToolbar = () => (
    //     <View>
    //         <Text style={styles.toolbar}> toolbar </Text>
    //     </View>
    // );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);
    useEffect(() => {

        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'MyBottomTabs' }],
        // });
        return () => {

        }
    }, [])

    return (
        <View style={IntroVideoStyle.container}>
            <Text>
                IntroVideoScreen
            </Text>
            {/* <TouchableOpacity onPress={() => {
                // Navigate to MyBottomTabs and reset the navigation stack
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MyBottomTabs' }],
                });
            }}>
                <Text>
                    OpenDrawer
                </Text>
            </TouchableOpacity> */}
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                // onLoadStart={onLoadStart}
                // onProgress={onProgress}
                paused={paused}
                ref={videoPlayer}
                resizeMode={'cover'}
                onFullScreen={isFullScreen}
                source={require('.../../../../assets/video/INDULGE_INTRO_1.mp4')}
                style={{
                    width: windowWidth,
                    aspectRatio: 17 / 37,
                    zIndex: 0,
                }}
                volume={10}
            />
        </View>
    )
}

export default IntroVideoScreen
