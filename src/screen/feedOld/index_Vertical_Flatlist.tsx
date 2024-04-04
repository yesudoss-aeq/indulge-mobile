
import React, { useState, useEffect, useRef } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { View, ActivityIndicator, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { colors } from '../../utils/constant/Colors';
import styles from './style'
import SingleReel_Copy from '../../components/SingleReel_Copy';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const FeedScreen = ({ }) => {
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
    const swiperRef = React.useRef<SwiperFlatList>(null);

    const viewRef = useRef<View>(null);
    const [viewStyle, setViewStyle] = useState({})
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState([]);

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
    const handleViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setVisibleIndex(viewableItems[0].index);
        }
    };

    const handleScroll = ({ nativeEvent }) => {
        const { contentOffset, layoutMeasurement } = nativeEvent;
        const startIndex = Math.floor(contentOffset.x / windowWidth);
        const endIndex = Math.ceil((contentOffset.x + layoutMeasurement.width) / windowWidth);

        setVisibleItems(Array.from({ length: endIndex - startIndex }, (_, index) => startIndex + index));
    };
    useEffect(() => {
        // const handleScroll = ({ nativeEvent }) => {
        //     const { contentOffset, layoutMeasurement } = nativeEvent;
        //     const startIndex = Math.floor(contentOffset.x / windowWidth);
        //     const endIndex = Math.ceil((contentOffset.x + layoutMeasurement.width) / windowWidth);

        //     setVisibleItems(Array.from({ length: endIndex - startIndex }, (_, index) => startIndex + index));
        // };

        // swiperRef.current.scrollToIndex({ index: visibleItems[0], animated: true }); // Ensure the first item is fully visible initially

        return () => {
            // Cleanup
        };
    }, []);


    const onIndexChanged = (info) => {
        // Get the index of the currently visible item
        const currentIndex = info.changed[0]?.index || 0;
        setVisibleIndex(currentIndex);
    };

    if (reelsData && reelsData.length === 0) {
        return <View style={styles.container}><Text style={styles.textStyle}>{strings.NO_DATA_AVAILABLE}</Text></View>
    }
    return (
        <View style={styles.container}
            ref={viewRef}
            onLayout={measureView}
        >
            <FlatList
                // getItemLayout={getItemLayout}
                // horizontal
                directionalLockEnabled
                pagingEnabled
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                scrollEnabled={true}
                onViewableItemsChanged={onIndexChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50
                }}
                ref={swiperRef}
                index={visibleIndex}
                data={reelsData}
                renderItem={(item, index) => (
                    <SingleReel_Copy
                        item={item}
                        index={index}
                        visibleIndex={visibleIndex}
                        videoViewStyle={{ height: viewStyle.height, width: viewStyle.width }}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
};

export default FeedScreen;
