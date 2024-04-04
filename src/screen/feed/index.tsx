import React, { useRef, useState } from 'react';
import { Text, Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import SingleReel from '../../components/SingleReel_Copy';

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;
const FeedDemo = () => {
    const [currentIndex, setCurrentIndex] = useState<Number>(0);
    const scrollRef = React.useRef<SwiperFlatList>(null);
    const viewRef = useRef<View>(null);
    const [viewStyle, setViewStyle] = useState({})
    const handleChangeIndexValue = ({ index }) => {
        console.log("INDEX", index)
        setCurrentIndex(index);
    };
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
    const [currentTag, setCurrentTag] = useState('');

    const handlePrev = (index) => {
        console.log("INDEX000", index, index - 1)

        if (index !== 0) {
            scrollRef.current?.scrollToIndex({ index: index - 1 });
            setCurrentIndex(index - 1);
        }
    };
    const handleNext = (index) => {
        console.log("INDEX111", index)

        // if (index) {
        scrollRef.current?.scrollToIndex({ index: 1 });
        setCurrentIndex(index + 1);
        // }
    };
    const goToSecondIndex = () => {
        scrollRef.current?.scrollToIndex({ index: 1 });
    };
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
    // view: {
    //     width: 100,
    //     height: 100,
    //     marginVertical: 10,
    //     backgroundColor: 'red',
    //   } as ViewStyle,
    return (
        <View style={styles.container}
            ref={viewRef}
            onLayout={measureView}
        >
            <SwiperFlatList
                ref={scrollRef}
                vertical={true}
                onChangeIndex={handleChangeIndexValue}
                // showPagination
                data={reelsData}
                // scrollToIndex={currentIndex}
                renderItem={({ item, index }) => {
                    console.log("indexindexindexindex:", index)
                    return (
                        <View style={[{ height: viewStyle.height, width: viewStyle.width }, { backgroundColor: item }]}>
                            <SingleReel
                                item={item}
                                index={index}
                                currentIndex={index}
                                currentTag={currentTag}
                                setCurrentTag={setCurrentTag}
                                videoViewStyle={{ height: viewStyle.height, width: viewStyle.width }}
                            />
                        </View>
                    )
                }}
            />
        </View>
    )
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'red', marginBottom: 0 },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.5, textAlign: 'center' },
});

export default FeedDemo;





{/* <Text style={[styles.text, {
                                width: windowWidth,
                                // aspectRatio: 17 / 37,
                                zIndex: 0,
                            }]}>
                                {item}
                            </Text>
                            <TouchableOpacity onPress={() => handlePrev(index)}>
                                <Text>Previous{index}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleNext(index)}>
                                <Text>NEXT</Text>
                            </TouchableOpacity> */}