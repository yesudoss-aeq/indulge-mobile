import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";

const QuestionAsnwerList = ({ item,
    showDatePicker,
    hideDatePicker,
    updateAnswerByIndex,
    handleConfirm,
    isDatePickerVisible,
}) => {
    // console.log("item::::", item)
    const [editing, setEditing] = useState(false);

    const handleEditToggle = () => {
        setEditing(!editing);
    };
    const inputRef = useRef(null);

    useEffect(() => {
        if (editing) {
            // Focus on the TextInput when editing becomes true
            inputRef.current.focus();
        }
    }, [editing]);
    const showQuestion = <Text style={styles.questionText}>{item.index}. {item.question}</Text>

    if (item.index === 1) {
        return <>
            {showQuestion}
            <View style={styles.imageContainer}>
                <Pressable
                    style={[
                        styles.rectangleContainer,
                        item.answer === "Sunrise" && styles.selectedOption
                    ]}
                    onPress={() => updateAnswerByIndex(1, "Sunrise")}
                    activeOpacity={0.8}
                >
                    <Image
                        source={require("../../assets/tastes/SunriseData.png")}
                        style={styles.imageStyle}
                        resizeMode="cover"
                    />
                    <Text style={styles.optionText}>Sunrise{"\n"}Person</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.rectangleContainer,
                        item.answer === "Sunset" && styles.selectedOption
                    ]}
                    onPress={() => updateAnswerByIndex(1, "Sunset")}
                    activeOpacity={0.8}
                >
                    <Image
                        source={require("../../assets/tastes/SunriseDataImage.png")}
                        style={styles.imageStyle}
                        resizeMode="cover"
                    />
                    <Text style={styles.optionText}>Sunset{"\n"}Person</Text>
                </Pressable>
            </View>
        </>
    }
    if (item.index === 2) {
        return <>
            {showQuestion}
            <Pressable
                onPress={() =>
                    showDatePicker()
                }
                style={styles.inputContainer}
            >
                <View
                    style={styles.dateSelectorView}
                >
                    <Text
                        style={styles.dateShowStyle}
                    >
                        {item.answer
                            ? item.answer
                            : "DD/MM/YYYY"}
                    </Text>
                    <Image
                        source={require("../../assets/tastes/ArrowDownImage.png")}
                        style={styles.arrowStyle}
                    />
                </View>
            </Pressable>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    }
    if (item.optionsArray) {
        return <>
            {showQuestion}
            <ScrollView horizontal={true} contentContainerStyle={{
                marginBottom: 15,
            }}>
                {item.optionsArray.map((status, index) => (
                    <View
                        key={index}
                        style={{
                            flex: 1,
                        }}
                    >
                        <Pressable
                            style={[
                                styles.rectangleContainer,
                                item.answer == status && styles.selectedOption,
                                { flex: 1 }
                            ]}
                            onPress={() => updateAnswerByIndex(item.index, status)}
                            android_ripple={{ color: 'transparent' }}
                        >
                            <Text
                                style={styles.optionArrayText}
                            >
                                {status}
                            </Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </>
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.itemContainer}>
                {showQuestion}
                <View style={styles.inputContainer}>
                    {editing ? (
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder=""
                            focusable
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(item.index, answer)
                            }
                            value={item.answer}
                        />
                    ) : (
                        <TouchableOpacity onPress={handleEditToggle}>
                            <Text style={styles.answerText}>{item.answer}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
export default QuestionAsnwerList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        marginBottom: 10,
    },
    questionText: {
        fontSize: 18,
        fontFamily: "YourFont-Regular",
        marginBottom: 8,
        color: "#ffffff",
        marginVertical: 5
    },
    answerText: {
        fontSize: 18,
        fontFamily: "YourFont-Regular",
        color: "#ffffff",
        padding: 10,
    },
    answerTextInput: {
        fontSize: 18,
        fontFamily: "YourFont-Regular",
        padding: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    input: {
        fontSize: 18,
        fontFamily: "YourFont-Regular",
        color: "#ffffff",
        padding: 10,
    },
    inputContainer: {
        flex: 1,
        borderColor: "#373737",
        borderRadius: 12,
        backgroundColor: "#373737"
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    rectangleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#373737",
        borderRadius: 12,
        marginRight: 15,
    },
    selectedOption: {
        borderColor: "gold",
        borderWidth: 2,
    },
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: "8%",
    },
    optionText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "YourFont-Regular",
        textAlign: "center",
        margin: 5
    },
    optionArrayText: {
        color: "#ffffff",
        fontSize: 18,
        textAlign: "center",
        fontFamily: "YourFont-Regular",
        padding: 10,
    },
    arrowStyle: {
        alignSelf: "center",
        marginRight: 20
    },
    dateShowStyle: {
        color: "#ffffff",
        fontSize: 18,
        textAlign: "left",
        fontFamily: "YourFont-Regular",
        paddingHorizontal: 5,
        padding: 10,
    },
    dateSelectorView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 5
    }
});