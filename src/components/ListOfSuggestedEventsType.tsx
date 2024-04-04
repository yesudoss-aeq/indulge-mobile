import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { colors } from '../utils/constant/Colors';
import { EventSuggestedData } from '../utils/constant/Constant';

const ListOfSuggestedEventsType = ({ eventSuggestionView }) => {
    const [eventsSuggestedData, setEventsSuggestedData] = useState(EventSuggestedData);

    const renderEventsSuggestionItem = ({ item }) => (
        <View style={[eventSuggestionView, { backgroundColor: item.color }]}>
            <Text style={styles.eventSuggestionText}>{item.name}</Text>
        </View>
    );

    return (
        <View style={{}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={eventsSuggestedData}
                renderItem={renderEventsSuggestionItem}
                keyExtractor={(item) => item.id.toString()}
                extraData={eventsSuggestedData} // You can directly pass the state here
            />
        </View>
    );
};

const styles = StyleSheet.create({
    eventSuggestionView: {
        flex: 1,
        justifyContent: 'center',
        alignmentItems: 'center',
        paddingVerticle: 15,
        paddingHorizontal: 14,
        borderRadius: 25,
        height: 46,
        marginStart: 16,
        marginTop: 20
    },

    eventSuggestionText: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.WHITE_COLOR
    },
});

export default ListOfSuggestedEventsType;
