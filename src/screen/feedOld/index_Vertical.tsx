
import React, { useState, useEffect, useRef } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { colors } from '../../utils/constant/Colors';
import { strings } from '../../utils/constant/Strings';
import { STATUSES } from '../../StoreRedux/objects'
import { fetchProducts } from '../../StoreRedux/AllReelsSlice';
import { useNavigation } from '@react-navigation/native';

// import SingleForLikedReel from './SingleForLikedReel';
import { useIsFocused } from '@react-navigation/native';
// import * as Font from 'expo-font';
// import fontName from '../assets/PFBeauSansPro-Reg_0.ttf'
import styles from './style'
import SingleReel from '../../components/SingleReel_Copy';
import { setInitialTagArray } from '../../StoreRedux/TagsSlice';
const { height } = Dimensions.get('window');

const FeedScreen = ({ }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTag, setCurrentTag] = useState('');
    const filterData = useSelector((state) => state.filter);
    const [reelsData, setReelsData] = useState(
        [
            {
                "index": 0,
                "_id": "65a13e9f4accac0e5905f0c4",
                "title": "Indulge Video",
                "description": "Indulge Intro video testing",
                "videoUrl": "1705066110086-WhatsApp_Video.mp4",
                "tags": [
                    "Bags"
                ],
                "likeCount": 11,
                "__v": 0
            },
            {
                "index": 1,
                "_id": "65a13ef24accac0e5905f177",
                "title": "Indulge Bags",
                "description": "Indulge Bags video",
                "videoUrl": "1705066203306-WhatsApp_Video.mp4",
                "tags": [
                    "Bags"
                ],
                "likeCount": 9,
                "__v": 0
            },
            {
                "index": 2,
                "_id": "65a140d84accac0e5905f325",
                "title": "Video Car",
                "description": "Best Experience Hotels, Events",
                "videoUrl": "1705066672540-WhatsApp_Video.mp4",
                "tags": [
                    "Hotels"
                ],
                "likeCount": 6,
                "__v": 0
            },
            {
                "index": 3,
                "_id": "65b74994d83bd8983596ef0c",
                "title": "Rolex Panda",
                "description": "",
                "videoUrl": "1706510722724-ROlex_Panda.mp4",
                "tags": [
                    "Watches",
                    "Jewellery"
                ],
                "likeCount": 3,
                "__v": 0
            },
            {
                "index": 4,
                "_id": "65b74a65d83bd8983596ef2f",
                "title": "Patek Philippe Aquanaut 5167R",
                "description": "",
                "videoUrl": "1706510924833-Patek_Philippe_Aquanaut_5167R.mp4",
                "tags": [
                    "Watches"
                ],
                "likeCount": 1,
                "__v": 0
            },
            {
                "index": 5,
                "_id": "65b74d22d83bd8983596efee",
                "title": "Future of Cars",
                "description": "",
                "videoUrl": "1706511614463-News_soumya_stories_Flying_car.mp4",
                "tags": [
                    "Cars"
                ],
                "likeCount": 5,
                "__v": 0
            }
        ])
    const [dataLoadStatus, setDataLoadStatus] = useState('')
    const [isFontLoaded, setFontLoaded] = useState(false);
    const isFocused = useIsFocused();
    const scrollRef = React.useRef<SwiperFlatList>(null);
    const viewRef = useRef<View>(null);
    const [viewStyle, setViewStyle] = useState({})


    const { data, status } = useSelector((state) => state.product);
    // const isFocused = useIsFocused();
    const navigation = useNavigation();

    const dispatch = useDispatch();
    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        });
        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'flex'
                }
            });
        }
    }, [])
    useEffect(() => {
        // call for reset selected tag in redux state
        dispatch(setInitialTagArray())

    }, []);
    useEffect(() => {
        // Dispatch the fetchData action with the API URL
        if (filterData.length > 0) {
            dispatch(fetchProducts(filterData.join(',')));
        } else {
            dispatch(fetchProducts(''));
        }
    }, [dispatch, filterData]);
    useEffect(() => {
        // setReelsData(data)
        setDataLoadStatus(status)
    }, [data, status])
    // useEffect(() => {
    //     console.log("isFocused:::::", isFocused)
    //     if (!isFocused) {
    //         setReelsData([])
    //     }
    // }, [isFocused]);
    useEffect(() => {
        // Dispatch the fetchData action with the API URL
        // if (filterData.length > 0) {
        //     dispatch(fetchProducts(filterData.join(',')));
        // } else {
        //     dispatch(fetchProducts(''));
        // }
        setCurrentTag('')
    }, [dispatch, filterData]);

    //add font-family
    useEffect(() => {
        // const loadFont = async () => {
        //     await Font.loadAsync({
        //         'YourFont-Regular': fontName,
        //     });
        //     setFontLoaded(true);
        // };
        // loadFont();
    }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }

    const handleChangeIndexValue = ({ index }) => {
        setCurrentIndex(index);
    };
    const handleScrollIndexValue = ({ index }) => {
        console.log("indexindex::", index)
        setCurrentIndex(index);
    };
    const swiperRef = useRef(null);

    // const handleScroll = (event) => {
    //     const offsetY = event.nativeEvent.contentOffset.y;
    //     const currentIndex = Math.floor(offsetY / event.nativeEvent.layoutMeasurement.height);

    //     swiperRef.current.scrollToIndex({ index: currentIndex, animated: false });
    // };
    const measureView = () => {
        viewRef.current.measure((x, y, width, height, pageX, pageY) => {
            setViewStyle({ x, y, width, height, pageX, pageY })
            console.log('x:', x); // The x position of the view relative to its parent
            console.log('y:', y); // The y position of the view relative to its parent
            console.log('width:', width); // The width of the view
            console.log('height:', height); // The height of the view
            console.log('pageX:', pageX); // The x position of the view relative to the screen
            console.log('pageY:', pageY); // The y position of the view relative to the screen
        });
    };
    if (dataLoadStatus === STATUSES.LOADING) {
        return <View style={styles.container}><ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} /></View>
    }
    if (reelsData && reelsData.length === 0) {
        return <View style={styles.container}><Text style={styles.textStyle}>{strings.NO_DATA_AVAILABLE}</Text></View>
    }
    return (
        <View style={styles.container}
            ref={viewRef}
            onLayout={measureView}
        >
            <SwiperFlatList
                ref={scrollRef}
                data={reelsData}
                vertical={true}
                onChangeIndex={handleChangeIndexValue}
                // scrollToIndex={handleScrollIndexValue}
                // onScroll={handleScroll}
                // showPagination
                renderItem={(item, index) => (
                    <View style={[{ height: viewStyle.height, width: viewStyle.width }]}>
                        <SingleReel
                            item={item}
                            index={index}
                            currentIndex={index}
                            currentTag={currentTag}
                            setCurrentTag={setCurrentTag}
                            videoViewStyle={{ height: viewStyle.height, width: viewStyle.width }}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            // ListFooterComponent={() => <View style={{ height: 40 }} />}
            />
        </View>
    )
};

export default FeedScreen;
