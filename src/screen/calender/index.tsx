import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, FlatList, Image, } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalenderStyle from './style'
import { colors } from '../../utils/constant/Colors';
import moment from 'moment';
import { EventSuggestedData } from '../../utils/constant/Constant';
import LinearGradient from 'react-native-linear-gradient';
import AddEventsModal from '../../components/AddEventsModal';
import { AddEventObject } from './types';
import ListOfSuggestedEventsType from '../../components/ListOfSuggestedEventsType';

const CalenderScreen = () => {
    const currentDate = moment().format('YYYY-MM-DD');
    const currentDateForDisplay = moment();

    const dayOfMonth = currentDateForDisplay.format('DD');
    const monthFullName = currentDateForDisplay.format('MMMM');
    const year = currentDateForDisplay.format('YYYY');

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [modalVisible, setModalVisible] = useState(false);
    const [eventSaveModalVisible, setEventsSaveModalVisible] = useState(false);

    const [events, setEvents] = useState([
        {
            id: 0, eventName: 'Sanjay Reddy', eventType: 'Meeting',
            eventDate: '08 Fri', eventTime: '11:00 AM'
        },
        {
            id: 1, eventName: 'Sanjay Reddy', eventType: 'Meeting',
            eventDate: '08 Fri', eventTime: '11:00 AM'
        },
        {
            id: 2, eventName: 'Sanjay Reddy', eventType: 'Meeting',
            eventDate: '08 Fri', eventTime: '11:00 AM'
        },
        {
            id: 3, eventName: 'Sanjay Reddy', eventType: 'Meeting',
            eventDate: '08 Fri', eventTime: '11:00 AM'
        },
        {
            id: 4, eventName: 'Sanjay Reddy', eventType: 'Meeting',
            eventDate: '08 Fri', eventTime: '11:00 AM'
        }
    ]);
    const [eventsSuggestedData, setEventsSuggestedData] = useState(EventSuggestedData);



    // LocaleConfig.locales['fr'] = {
    //     dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    // };
    // LocaleConfig.defaultLocale = 'fr';
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        // setModalVisible(true);
    };

    const handleAddEvent = () => {
        // Implement logic to add event to the selected date
        // For now, let's just close the modal
        setModalVisible(false);
    };
    // background: linear-gradient(90deg, #373737 0%, rgba(55, 55, 55, 0) 100%);
    // background: linear-gradient(90deg, #373737 0%, rgba(55, 55, 55, 0) 100%);

    const renderItem = ({ item }) => (
        <View style={styles.linearGradientMainView}>

            <LinearGradient
                colors={['#373737', 'rgba(55, 55, 55, 0)']}
                style={styles.linearGradientView1}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.eventItem}
                >
                    <Text style={styles.eventDateText}>{item.eventDate}</Text>
                    <Text style={styles.eventTimeText}>{item.eventTime}</Text>
                </View>
                {/* <View style={styles.eventItem}
                >
                    <Text>{item.title}</Text>
                </View> */}
            </LinearGradient>
            <LinearGradient
                colors={['#373737', 'rgba(55, 55, 55, 0)']}
                style={styles.linearGradientView2}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.eventItem}
                >
                    <Text style={styles.eventNameText}>{item.eventName}</Text>
                    <Text style={styles.eventTypeText}>{item.eventType}</Text>
                </View>
                {/* <View style={styles.eventItem}
                >
                    <Text>{item.title}</Text>
                </View> */}
            </LinearGradient>
        </View>


    );
    const renderEventsSuggestionItem = ({ item }) => (
        <View style={[styles.eventSuggestionView, {
            backgroundColor: item.color,
        }]}>
            <Text style={styles.eventSuggestionText}>{item.name}</Text>
        </View>
    )
    const renderDay = (day) => {
        // Get the first letter of the day and capitalize it
        const firstLetter = day.day[0].toUpperCase();
        return (
            <View>
                <Text style={styles.yourScheduleText}>
                    sd {firstLetter}
                </Text>

            </View>
        );
    };
    const renderCustomDay = (date, item) => {
        // Get the first letter of the day and capitalize it
        const firstLetter = item.date[0].toUpperCase();

        // Style for the text
        const textStyle = {
            textAlign: 'center',
            textTransform: 'uppercase', // Capitalize the text
        };

        return (
            <View>
                <Text style={textStyle}>{firstLetter}</Text>
            </View>
        );
    };
    const onAddEventsSave = (addEventObj: AddEventObject) => {
        console.log("addEventObj::", addEventObj)
        
        setEventsSaveModalVisible(false)
    }
    const onAddEventsPress = () => {
        setEventsSaveModalVisible(true)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../../assets/screen/Profile_round.png')}
                    style={styles.logo}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.currentYear}>{year}</Text>
                    <Text style={styles.currentDate}>{dayOfMonth} {monthFullName}</Text>
                </View>

                {/* Add button */}
                <TouchableOpacity style={styles.addButton} onPress={onAddEventsPress}>
                    <Image
                        source={require('../../../assets/screen/Close.png')}
                        style={styles.logo}
                    />
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <Calendar
                    // style={{
                    //     borderWidth: 1,
                    //     borderColor: 'gray',
                    //     height: 261
                    // }}
                    enableSwipeMonths={true}
                    hideArrows={true}
                    // hideExtraDays={true}
                    // hideDayNames={true}
                    // showWeekNumbers={true}
                    renderHeader={date => {
                        <View>
                            <Text style={styles.currentDate}>.</Text>
                        </View>
                    }}

                    // renderDay={renderDay}
                    onDayPress={handleDayPress}
                    // dayComponent={({ date, item }) => renderCustomDay(date, item)}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: colors.YELLO_THEME_COLOR },
                        // [currentDate]: { selected: true, selectedColor: colors.YELLO_THEME_COLOR } // Set current date color to yellow

                    }}
                    theme={{
                        calendarBackground: colors.BLACK_BACKGROUND_COLOR,
                        todayTextColor: colors.YELLO_THEME_COLOR, // Current day text color
                        dayTextColor: colors.WHITE_COLOR, // Default day text color
                        textDisabledColor: colors.GREY_FONT_FONT_COLOR
                    }}
                    leftArrowImageSource={require('../../../assets/screen/Profile_round.png')}
                />
            </View>
            <View style={{ flex: 1 }}>
                {/* <View style={{}}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={eventsSuggestedData}
                        renderItem={renderEventsSuggestionItem}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={(item) => item.id}
                    />
                </View> */}
                <ListOfSuggestedEventsType eventSuggestionView={styles.eventSuggestionView} />
                <LinearGradient
                    colors={['#272727', '#373737']}
                    style={styles.eventLinereGradientMainView}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.verticleViewStyle} />
                    <Text style={styles.yourScheduleText}>
                        Your Schedule
                    </Text>
                    <FlatList
                        data={events}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={(item) => item.id}
                    />
                </LinearGradient>
            </View>
            <AddEventsModal
                eventSaveModalVisible={eventSaveModalVisible}
                setEventsSaveModalVisible={setEventsSaveModalVisible}
                onAddEventsSave={onAddEventsSave}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Add Event</Text>
                        <TouchableOpacity onPress={handleAddEvent}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    linearGradientMainView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    linearGradientView1: {
        flex: 0.45,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        marginEnd: -10
    },
    linearGradientView2: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 16
    },
    eventLinereGradientMainView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    eventSuggestionView: {
        flex: 1,
        justifyContent: 'center',
        alignmentItems: 'center',
        paddingVerticle: 15,
        paddingHorizontal: 14,
        borderRadius: 25,
        height: 46,
        marginStart: 16,
        marginTop: 30
    },
    eventSuggestionText: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.WHITE_COLOR
    },
    eventDateText: {
        fontSize: 20,
        fontWeight: '400',
        color: colors.WHITE_COLOR
    },
    eventTimeText: {
        fontSize: 15,
        fontWeight: '400',
        color: colors.GREY_FONT_COLOR
    },
    eventNameText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.YELLO_THEME_COLOR
    },
    eventTypeText: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.GREY_FONT_COLOR
    },
    verticleViewStyle: {
        width: 60,
        height: 3,
        backgroundColor: "#566D80",
        alignSelf: 'center'
    },
    yourScheduleText: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '400',
        marginTop: 5,
        color: "#D9D9D9"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5
    },
    eventItem: {
        borderRadius: 16,
        padding: 20
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        paddingHorizontal: 20,
        marginTop: 5
    },
    logoProfile: {
        width: 36,
        height: 36,
        resizeMode: 'contain'
    },
    logoClose: {
        width: 42,
        height: 42,
        resizeMode: 'contain'
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    currentYear: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.GREY_FONT_COLOR
    },
    currentDate: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.WHITE_COLOR
    },
    addButton: {
        // width: 30,
        // height: 30,
        // borderRadius: 15,
        // backgroundColor: '#007bff',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});

export default CalenderScreen;
