import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from './style'
import { setInitialTagArray } from '../../../StoreRedux/TagsSlice';
import { fetchLikeReelData } from '../../../StoreRedux/LikeReelSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { STATUSES } from '../../../StoreRedux/objects';
import { strings } from '../../../utils/constant/Strings';
import { colors } from '../../../utils/constant/Colors';
import SingleReel from '../../../components/SingleReel';

const FavoriteScreen = () => {
    const [reelsData, setReelsData] = useState([])
    const [dataLoadStatus, setDataLoadStatus] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTag, setCurrentTag] = useState('');
    const filterData = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const { data: reelData, status: statusLikeData } = useSelector((state) => state.likeReel);
    const swiperRef = useRef(null);

    useEffect(() => {
        // call for reset selected tag in redux state
        dispatch(setInitialTagArray())
        const fetchLikeData = async () => {
            const storedNumber = await AsyncStorage.getItem('phoneNumber');
            console.log("storedNumber:::", storedNumber)
            if (storedNumber)
                dispatch(fetchLikeReelData(storedNumber))
        }
        fetchLikeData()
    }, []);
    useEffect(() => {
        setReelsData(reelData)
        setDataLoadStatus(statusLikeData)
    }, [reelData, statusLikeData])
    const handleChangeIndexValue = ({ index }) => {
        setCurrentIndex(index);
    };

    if (dataLoadStatus === STATUSES.LOADING) {
        return <View style={styles.container}><ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} /></View>
    }
    if (reelsData && reelsData.length === 0) {
        return <View style={styles.container}><Text style={styles.textStyle}>{strings.NO_DATA_AVAILABLE}</Text></View>
    }
    return (
        <View>
            <SwiperFlatList
                ref={swiperRef}
                data={reelsData}
                vertical={false}
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

export default FavoriteScreen

