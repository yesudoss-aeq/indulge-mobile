import { useIsFocused } from '@react-navigation/native';
import React, { useRef, useState, useEffect } from 'react';
// import { Video } from 'expo-av';
import Video from 'react-native-video';

// import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Pressable, ActivityIndicator, View, Dimensions, Text, Alert, Share, Image, StyleSheet, Platform, Linking } from 'react-native';
import LikedReelsStorage from './LikedReelsStorage';
// import * as Font from "expo-font";
// import fontName from "../assets/PFBeauSansPro-Reg_0.ttf";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../StoreRedux/AllReelsSlice'
import { likeReelApi } from '../StoreRedux/services/likeReelApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../utils/constant/Colors';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SingleReel = ({ item, index, currentIndex, currentTag, setCurrentTag }) => {
    // console.log("currentIndex::", currentIndex, "item.index::", item.index, "index::", index)
    const video = useRef(null);
    const [mute, setMute] = useState(false);
    const [like, setLike] = useState(false);
    const [likeReel, setLikeReel] = useState(false);
    const [paused, setPaused] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const isFocused = useIsFocused();

    const [likedReels, setLikedReels] = useState([]);
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);


    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');

    const dispatch = useDispatch();
    const tags = useSelector(state => state.tags);
    // const isReelLiked = useSelector((state) => state.likeReels.isLiked);

    useEffect(() => {
        LikedReelsStorage.getLikedReels().then((reels) => {
            setLikedReels(reels);
            setLike(reels.includes(item.item.video));
        });
    }, [item]);
    const handleLike = async () => {
        const updatedReels = likedReels.includes(item.item.video)
            ? likedReels.filter((url) => url !== item.item.video)
            : [...likedReels, item.item.video];

        setLikedReels(updatedReels);
        setLike(!like);

        await LikedReelsStorage.setLikedReels(updatedReels);
    };
    const handleLikeReels = async (status) => {
        let likeResponse = await likeReelApi({
            "mobile_no": Number(storedPhoneNumber),
            "videoUrl": item?.item?.videoUrl,
            "flag": status
        });
        console.log("likeResponse:::", likeResponse)

        if (likeResponse === "Reel liked" || likeResponse === "Reel already liked by the user") {
            setLikeReel(true)
            console.log("likeReel:TTTT::", likeReel)

        } else {
            setLikeReel(false)
            console.log("likeReel::FFF:", likeReel)

        }
    }

    useEffect(() => {
        console.log("isFocused:::::", isFocused)

        if (!isFocused) {
            // setPaused(false)
            // video?.current?.pauseVideo();
            // video?.current?.setNativeProps({ paused: false })
            console.log("isFocused:::::", isFocused)

            setPaused(true)
            setShowControls(false);
            // video?.current?.unloadAsync();
        } else {
            setPaused(false)
        }
    }, [isFocused]);
    useEffect(() => {
        console.log("isFocused:::::", currentIndex, item?.index)

        if (currentIndex !== item?.index) {
            // setPaused(false)
            // video?.current?.pauseVideo();
            // video?.current?.setNativeProps({ paused: false })
            console.log("isFocused:::::", isFocused)

            setPaused(true)
            setShowControls(false);
            // video?.current?.unloadAsync();
        } else {
            setPaused(false)
        }
    }, [currentIndex]);
    //add font-family
    useEffect(() => {
        // const loadFont = async () => {
        //     await Font.loadAsync({
        //         "YourFont-Regular": fontName,
        //     });
        //     setFontLoaded(true);
        // };
        // loadFont();
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };
        getPhoneNumber();
        return () => {
            // video?.current?.pauseVideo();
            // video?.current?.unloadAsync();
            setPaused(true)
            setShowControls(false);
        }
    }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }

    const onError = error => {
        console.log("error ++++:r", error)
    }

    const onBuffer = buffer => {
        console.log("nnnnn", buffer)
        // {"isBuffering": false, "target": 1975}
        setIsBuffering(buffer.isBuffering)
        setLoading(false);
    }

    //Share functionality
    const onShare = async () => {
        try {
            const videoUrl = item.item.video;

            const result = await Share.share({
                message: `${item.item.title}\n${videoUrl}`,
                title: 'Check out this video!',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            Alert.alert('Error sharing video', error.message);
        }
    };
    const handleShareLink = async () => {
        try {
            // Create a deep link URL for your app
            const deepLinkUrl = Linking.makeUrl();
            console.log("deepLinkUrl::::", deepLinkUrl)
            // Share the deep link URL
            await Share.share({
                message: 'Check out this link!',
                url: deepLinkUrl,
            });
        } catch (error) {
            console.error('Error sharing link:', error.message);
        }
    };

    const tagHandler = (c_tag) => {
        setCurrentTag(c_tag)
        dispatch(fetchProducts(c_tag))
    }

    const controlsView = () => {
        setShowControls(true); // Show/hide controls on video press
        setMute(!mute)
        setTimeout(() => {
            setShowControls(false);
        }, 2000);
    };
    const hideControlsAfterResume = () => {
        setShowControls(false);
    };
    const playOrPauseVideo = (flag) => {
        console.log("flag:::", flag)
        // video.current.paused = false;
        setPaused(flag)
        if (flag) {
            hideControlsAfterResume()
        }
    }
    const reloadVideo = () => {
        if (video.current) {
            video.current.seek(0); // Seek to the beginning to restart the video
        }
    };
    const onErrorHandler = (error) => {
        // Log the error for debugging purposes
        console.error('Video playback error:', error);
        reloadVideo()
        // Reload the video source or reinitialize it
        // video.current?.reinitialize(); // Or set the video source again
    };

    const onLongPress = () => {
        setPaused(true)
    }

    const onPressOut = () => {
        setPaused(false)
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#000000',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            <Pressable onPress={controlsView}
                onLongPress={onLongPress}
                onPressOut={onPressOut}
            >
                <Video
                    // poster={{ uri: "../../assets/intro/AccessSlide.png" }}
                    // posterResizeMode="cover"
                    ref={video}
                    onBuffer={onBuffer}
                    onError={onErrorHandler}
                    repeat={true}
                    resizeMode='cover'
                    // resizeMode="fit"
                    isLooping={true}
                    muted={mute}
                    preload={'auto'}
                    autoPlay
                    debug={{
                        enable: true,
                        thread: true,
                    }}
                    controls
                    onLoadStart={() => setIsBuffering(true)}
                    onLoad={() => setIsBuffering(false)}
                    // maxBitRate={2000000}
                    minLoadRetryCount={5}
                    // hideShutterView={true}
                    // shouldPlay={currentIndex === item?.index ? paused : false}
                    // paused={currentIndex === item?.index ? paused : true} //TODO: need to uncomment after when use pase video
                    // source={{ uri: `https://www.indulge.blokxlab.com/${item?.item?.videoUrl}` }}
                    source={{ uri: "https://www.indulge.blokxlab.com/1705066110086-WhatsApp_Video.mp4" }}
                    style={{
                        width: windowWidth,
                        height: Platform.OS === 'ios' ? windowHeight - 40 : windowHeight - 50,
                        zIndex: 0,
                    }}
                    onPlaybackStatusUpdate={(status) => {
                        console.log("statusstatusstatusstatus:::::", status)
                        if (status.isPlaying && !status.isBuffering) {
                            // hideControlsAfterResume(); //TODO: add function when video is buffering
                        }
                    }}
                />
            </Pressable>
            {showControls && (
                <Pressable //onPress={() => setMute(!mute)}
                    hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    style={styles.muteUnmuteButton}>
                    <MaterialIcons name={mute ? "volume-off" : "volume-up"} size={45} color="white" />
                </Pressable>
            )}
            {/* {showControls && (
                <View style={styles.pauseORResumeview}>
                    <Pressable onPress={() => playOrPauseVideo(!paused)}
                        style={styles.pauseORResumeButtonView}>
                        <AntDesign name={paused ? "play" : "pause"} size={45} color="white" />
                    </Pressable>
                </View>
            )} */}
            {isBuffering &&
                <View style={styles.pauseORResumeview}>
                    <Pressable onPress={() => playOrPauseVideo(!paused)}
                        style={styles.pauseORResumeButtonView}>
                        {/* <AntDesign name={"loading1"} size={45} color="white" /> */}
                        <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />

                    </Pressable>
                </View>
            }
            {!paused && <View style={styles.actionContainer}>
                <View style={styles.actionContainer1}>
                    <View>
                        <Text style={{ color: '#FFFFFF', fontFamily: "YourFont-Regular", fontSize: 20, lineHeight: 25, fontWeight: '700' }}>{item?.item?.title}</Text>
                        <Text style={{ color: '#FFFFFF', fontFamily: "YourFont-Regular", fontSize: 15, lineHeight: 20 }}>{item?.item?.description}</Text>
                    </View>
                    <Pressable onPress={() => { handleLikeReels(likeReel ? false : true) }}>
                        <AntDesign name={likeReel ? "heart" : "hearto"} size={24} color={likeReel ? 'red' : 'white'} />
                    </Pressable>
                </View>
                <View style={styles.actionContainer1}>
                    <View style={styles.styleForTags}>
                        {
                            item?.item?.tags[0] &&
                            item?.item?.tags?.map((item) => <Pressable
                                style={[styles.tagsListStyle, currentTag === item ? { backgroundColor: 'grey' } : {}]}
                                onPress={() => { tagHandler(item) }}
                                key={item}
                            >
                                <Text style={styles.tagsTextStyle}>{item}</Text>
                            </Pressable>)
                        }
                    </View>
                    <View style={styles.shareButtonContainer}>
                        {/* <Pressable onPress={handleShareLink}>
                            <Image source={require('../assets/ShareIcon.png')} />
                        </Pressable> */}

                    </View>
                </View>
            </View>}
        </View >
    )

}
export default React.memo(SingleReel);

const styles = StyleSheet.create({
    muteUnmuteButton: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        bottom: '50%',
        left: '45%',
        marginEnd: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 4
    },
    pauseORResumeview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: windowWidth,
        zIndex: 1,
        bottom: '50%',
        left: '45%',
    },
    pauseORResumeButtonView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 4
    },
    actionContainer: {
        flex: 1,
        position: 'absolute',
        width: windowWidth,
        zIndex: 1,
        bottom: '16%',
    },
    actionContainer1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '2%'
    },
    tagAndShareContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleForTags: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginRight: 10,
        padding: 5
    },
    tagsListStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#C4963D',
        justifyContent: 'center',
        marginRight: 10,
        marginTop: 10,
        padding: 5
    },
    tagsTextStyle: {
        color: '#FFFFFF',
        fontFamily: "YourFont-Regular",
        fontSize: 14,
        paddingHorizontal: 5
    }
})
