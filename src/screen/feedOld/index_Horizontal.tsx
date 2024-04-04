
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
import SingleReel from '../../components/SingleReel';
import { setInitialTagArray } from '../../StoreRedux/TagsSlice';
const { height } = Dimensions.get('window');

const FeedScreen = ({ }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTag, setCurrentTag] = useState('');
    const filterData = useSelector((state) => state.filter);
    const [reelsData, setReelsData] = useState([])
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
        setReelsData(data)
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
                    <SingleReel
                        item={item}
                        index={index}
                        currentIndex={currentIndex}
                        currentTag={currentTag}
                        setCurrentTag={setCurrentTag}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => <View style={{ height: 40 }} />}
            />
        </View>
    )
};

export default FeedScreen;
