import React, { useState } from 'react';
import { Modal, View, ScrollView, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { AddEventObject } from '../screen/calender/types';
import { colors } from '../utils/constant/Colors';
import ListOfSuggestedEventsType from './ListOfSuggestedEventsType';

interface AddEventsModalProps {
    eventSaveModalVisible: boolean;
    onAddEventsSave: (addEventObj: AddEventObject) => void;
    setEventsSaveModalVisible: (visible: boolean) => void;
}

const AddEventsModal: React.FC<AddEventsModalProps> = ({
    eventSaveModalVisible,
    onAddEventsSave,
    setEventsSaveModalVisible
}) => {
    const [eventTitle, setEventTitle] = useState('');
    const [date, setDate] = useState('');
    const [remindMe, setRemindMe] = useState('');
    const [notes, setNotes] = useState('');

    const handleSave = () => {
        // Check if any of the inputs are empty
        if (eventTitle.trim() === '' || date.trim() === '' || remindMe.trim() === '' || notes.trim() === '') {
            // Display red color message
            Alert.alert("Alert", "Please fill all the fields");
            return; // Prevent saving if any input is empty
        }
        const addEventObj: AddEventObject = {
            title: eventTitle, // Replace 'value1' with actual value from your component state
            remindMe: remindMe, // Replace 'value2' with actual value from your component state
            notes: notes, // Replace 'value3' with actual value from your component state
        };
        // Save data
        onAddEventsSave({ eventTitle, remindMe, notes });

        // Clear inputs after saving
        setEventTitle('');
        setRemindMe('');
        setNotes('');
    };

    return (
        <Modal visible={eventSaveModalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <KeyboardAvoidingView
                    // style={styles.keyboardAvoidingContainer}
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    enabled
                >
                    <ScrollView style={styles.modalContent}>
                        <View style={styles.verticleViewStyle} />
                        <Text style={styles.yourScheduleText}>
                            Add Calender
                        </Text>
                        <ListOfSuggestedEventsType eventSuggestionView={styles.eventSuggestionView} />

                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Dinson Birthday'}
                            value={eventTitle}
                            onChangeText={setEventTitle}
                        />

                        <Text style={styles.label}>Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'04/01/2024'}
                            value={date}
                            onChangeText={setDate}
                        />

                        <Text style={styles.label}>Remind Me</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'3 days in advance'}
                            value={remindMe}
                            onChangeText={setRemindMe}
                        />

                        <Text style={styles.label}>Add Note</Text>
                        <TextInput
                            style={styles.inputNotes}
                            placeholder={'Write a note here'}
                            numberOfLines={3}
                            multiline={true}
                            value={notes}
                            onChangeText={setNotes}
                        />

                        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                            <Text style={styles.buttonText}>Save in Calender</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setEventsSaveModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 90 : 50,
        // marginBottom: 50
    },
    verticleViewStyle: {
        // marginTop: 10,
        width: 60,
        height: 3,
        backgroundColor: "#566D80",
        alignSelf: 'center'
    },
    yourScheduleText: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600',
        marginTop: 5,
        color: colors.BLACK_BACKGROUND_COLOR
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '600',
        color: colors.BLACK_BACKGROUND_COLOR
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderColor: '#EFF1F4',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        fontWeight: "400",
        fontSize: 20,
        color: "#566D80"
    },
    inputNotes: {
        height: 100,
        backgroundColor: "#FFFFFF",
        borderColor: '#EFF1F4',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        fontWeight: "400",
        fontSize: 20,
        color: "#566D80"
    },
    saveButton: {
        backgroundColor: '#D39F3A',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontWeight: '400',
        fontSize: 18
    },
    eventSuggestionView: {
        // flex: 1,
        justifyContent: 'center',
        alignmentItems: 'center',
        paddingVerticle: 15,
        paddingHorizontal: 14,
        borderRadius: 25,
        height: 46,
        marginStart: 16,
        // marginTop: 10
    },
});

export default AddEventsModal;
