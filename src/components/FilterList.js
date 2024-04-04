import { StyleSheet, View, Pressable, Image, Text, ScrollView, TextInput, FlatList, Dimensions } from 'react-native';
import React from 'react'
import { useSelector } from 'react-redux';

const FilterList = (props) => {
    const { setSelectedCategory, selectedCategory, item, selectCategoryItem } = props
    const filterData = useSelector((state) => state.filter);
    return (
        <View style={styles.container1}>
            <Pressable onPress={() => { setSelectedCategory('car'), selectCategoryItem(item.category) }}>
                <View
                    style={filterData.includes(item.category) ?
                        styles.selectedCategoryButton :
                        styles.categoryButton
                    }
                >
                    <Image source={item.source} style={styles.image} />
                </View>
            </Pressable>
        </View>
    )
}

export default FilterList

const styles = StyleSheet.create({
    container1: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
    },
    selectedCategoryButton: {
        width: Dimensions.get('window').width / 3 - 16,
        height: Dimensions.get('window').width / 3 - 16,
        borderColor: '#FFD700',
        borderWidth: 2,
        margin: 2
    },
    categoryButton: {
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').width / 3 - 20
    },
    image: {
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').width / 3 - 20
    },
})