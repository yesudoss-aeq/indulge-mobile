import React, { useRef, useState, useEffect } from 'react';
import { Modal, View, ScrollView, Dimensions, SafeAreaView, Pressable, Image, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { AddEventObject } from '../screen/calender/types';
import { colors } from '../utils/constant/Colors';
import Video, { OnLoadData, VideoProperties } from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import VideoProgressBar from './VideoProgressBar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface VideoPlayModalProps {
    videoModal: boolean;
    // setVideoModal: (addEventObj: AddEventObject) => void;
    setVideoModal: (visible: boolean) => void;
    videoLink: string;
}

const VideoPlayModal: React.FC<VideoPlayModalProps> = ({
    videoModal,
    setVideoModal,
    videoLink
}) => {
    const [eventTitle, setEventTitle] = useState('');
    const [paused, setPaused] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);

    const videoPlayer = useRef<Video>(null);
    const [isShowControls, setIsShowControls] = useState<boolean>(false);


    const handleSlideComplete = (value) => {
        // Handle when the user finishes sliding the progress bar
    };

    const handleValueChange = (value) => {
        // Handle value change of the progress bar
    };
    useEffect(() => {
        setPaused(false)
        setIsShowControls(false)
        return () => {

        }
    }, [])

    const onLoad = (data: OnLoadData) => {
        setDuration(data.duration || 0);
    };

    const onEnd = () => {
        setPaused(true);
        setCurrentTime(0);
    };

    const onProgress = (data: { currentTime: number }) => {
        console.log("Time:::", data.currentTime)
        setCurrentTime(data.currentTime);
    };

    const controlsView = () => {
        setPaused(!paused)
        setIsShowControls(!isShowControls)
    }
    const onPressResumeButton = () => {
        setPaused(false)
        setIsShowControls(!isShowControls)
    }
    return (
        <Modal visible={videoModal} animationType="slide" transparent>
            <SafeAreaView style={styles.modalContainer}>
                <Pressable
                    onPress={controlsView}
                //     onLongPress={onLongPress}
                //     onPressOut={onPressOut}
                >
                    <Video
                        ref={videoPlayer}
                        // autoPlay
                        source={videoLink == "VIDEO1.mp4" ? require(`../../assets/video/VIDEO1.mp4`) : require(`../../assets/video/VIDEO2.mp4`)}
                        style={{
                            flex: 1,
                            width: windowWidth,
                            height: windowHeight,
                            // aspectRatio: 17 / 37,
                            zIndex: 0,
                        }}
                        onFullScreen={false}
                        // controls
                        isLooping={true}
                        resizeMode="contain"
                        onLoad={onLoad}
                        onProgress={onProgress}
                        onEnd={onEnd}
                        paused={paused}
                        volume={10}
                    />
                </Pressable>
                {isShowControls &&
                    <Pressable onPress={() => setVideoModal(false)}
                        style={styles.closeVideoModal}
                    >
                        <Image source={require('../../assets/screen/Close_Icon_Cross_Grey.png')} />
                    </Pressable>
                }
                {isShowControls &&
                    <View style={styles.pauseORResumeview}>
                        <Pressable onPress={onPressResumeButton}
                        // style={styles.pauseORResumeButtonView}
                        >
                            <Image source={require('../../assets/screen/Video_Play_Icon_Yellow.png')} />
                        </Pressable>
                    </View>
                }
                {
                    isShowControls &&
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0)', '#000000']}
                        style={styles.videoSeekView}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {/* <VideoProgressBar
                            currentTime={currentTime}
                            totalTime={totalTime}
                            onSlideComplete={handleSlideComplete}
                            onValueChange={handleValueChange}
                        />
                        <View style={{ flex: 1, marginTop: 10, justifycontent: 'space-between', alignmentItem: 'center', flexDirection: "row" }}>
                            <Text style={{}} >
                                Activate Now
                            </Text>
                            <Text style={{}} >
                                Activate Now
                            </Text>
                        </View> */}
                    </LinearGradient>
                }
            </SafeAreaView>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE_COLOR,
        // marginTop: 10
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        elevation: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.40,
        shadowRadius: 3.84,
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 90 : 50,
    },
    verticleViewStyle: {
        width: 60,
        height: 3,
        backgroundColor: "#566D80",
        alignSelf: 'center'
    },
    yourScheduleText: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600',
        marginTop: 5,
        color: colors.BLACK_BACKGROUND_COLOR
    },
    pauseORResumeview: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        // width: windowWidth,
        zIndex: 1,
        bottom: '50%',
        left: '40%',
    },
    closeVideoModal: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        // width: windowWidth,
        zIndex: 1,
        top: Platform.OS === 'ios' ? '5%' : '1%',
        left: '85%',
    },
    videoSeekView: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        bottom: '0%',
        height: 150,
        width: '100%'
    },
    imageStyle: {
        width: 150,
        height: 150
    }
});

export default VideoPlayModal;
