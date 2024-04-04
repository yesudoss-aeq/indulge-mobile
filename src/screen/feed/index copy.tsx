import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const FeedDemo = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);
    const [reelsData, setReelsData] = useState(
        [
            { id: 0, name: "AAAAA", color: "red" },
            { id: 1, name: "BBBBB", color: "green" },
            { id: 2, name: "CCCCC", color: "blue" }
        ]
    )


    const handleChangeIndexValue = ({ index }) => {
        setCurrentIndex(index);
    };
    return (
        <View style={styles.container}>
            <SwiperFlatList
                ref={swiperRef}
                data={reelsData}
                vertical={true}
                onChangeIndex={handleChangeIndexValue}
                // scrollToIndex={handleScrollIndexValue}
                // onScroll={handleScroll}
                showPagination
                renderItem={({ item }, index) => (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: item.color,
                        height: Dimensions.get('window').height
                        // backgroundColor: item.color
                    }}>
                        <Text>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

    )
}

export default FeedDemo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').height,
    },
})