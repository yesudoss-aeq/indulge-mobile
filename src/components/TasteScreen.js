import React, { useState, useEffect } from "react";
import {
    ScrollView,
    View,
    Text,
    Pressable,
    Image,
    TextInput,
    StyleSheet,
    Dimensions
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get('window').width;

const TasteScreen = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [storedPhoneNumber, setStoredPhoneNumber] = useState("");

    const flowerStatuses = [
        "Orchids",
        "Roses",
        "Hydrangeas",
        "Peonies",
        "Dahlias",
        "Daffodils",
        "Other",
    ];
    const statusOptions = [
        "Single",
        "Dating",
        "Married",
        "Choose not to say"
    ];
    const travelStatuses = ["Every Week", "Holiday Season", "Every Month", "Other"];
    const stayStatuses = ["Modern Hotels", "Heritage Hotels", "Boutique Hotels"];
    const preferStatuses = ["Window Seat", "Aisle Seat", "Center Seat"];
    const foodStatuses = ["Vegetarian", "Non-Vegetarian"];
    const dietStatuses = [
        "Not on a diet",
        "Keto",
        "Intermittent Fasting",
        "Vegan",
        "Paleo",
        "Dash",
        "Raw Food Diet",
    ];
    const coffeeStatuses = [
        "Arabica",
        "Robusta",
        "Latte",
        "Cappuccino",
        "Americano",
        "Espresso",
        "Doppio",
        "Filter",
        "Other",
    ];
    const languageStatuses = [
        "French",
        "Chinese",
        "Japanese",
        "Indian",
        "Italian",
        "Greek",
        "Spanish",
        "Mediterranean",
        "Lebanese",
        "Moroccan",
        "Thai",
        "Turkish",
        "English",
        "Other",
    ];
    const [allUserDetails, setAllUserDetails] = useState([
        { "index": 1, "answer": "", "question": "You are a" },
        { "index": 2, "answer": "", "question": "You were born on" },
        { "index": 3, "answer": "", "question": "Your marital status" },
        { "index": 4, "answer": "", "question": "Are you a pet parent? What is their name?" },
        { "index": 5, "answer": "", "question": "What is your favourite sport?" },
        { "index": 6, "answer": "", "question": "The BEST brand according to you is.....?" },
        { "index": 7, "answer": "", "question": "The Designer you ADORE..." },
        { "index": 8, "answer": "", "question": "One Book that you recommend everyone" },
        { "index": 9, "answer": "", "question": "The country you want to escape to?" },
        { "index": 10, "answer": "", "question": "How often do you travel" },
        { "index": 11, "answer": "", "question": "The car you love...?" },
        { "index": 12, "answer": "", "question": "The actor/actress you are head over heels for" },
        { "index": 13, "answer": "", "question": "The favourite artist?" },
        { "index": 14, "answer": "", "question": "The favourite watch" },
        { "index": 15, "answer": "", "question": "You like your stays in" },
        { "index": 16, "answer": "", "question": "You prefer" },
        { "index": 17, "answer": "", "question": "You are a.." },
        { "index": 18, "answer": "", "question": "Is there any specific kind of food that you are allergic to?" },
        { "index": 19, "answer": "", "question": "Are you currently on any form of diet?" },
        { "index": 20, "answer": "", "question": "Your go-to drink?" },
        { "index": 21, "answer": "", "question": "Your favourite food is?" },
        { "index": 22, "answer": "", "question": "A restaurant cannot stop recommending?" },
        { "index": 23, "answer": "", "question": "Your ideal coffee is" },
        { "index": 24, "answer": "", "question": "The cuisine that makes your mouth water" },
        { "index": 25, "answer": "", "question": "The dessert of your dreams" },
        { "index": 26, "answer": "", "question": "Which is the flower you adore?" },
        { "index": 27, "answer": "", "question": "Which is the car you travel most frequently in?" },
        { "index": 28, "answer": "", "question": "What is your blood group?" },
        { "index": 29, "answer": "", "question": "Are you diabetic?" },
        { "index": 30, "answer": "", "question": "What do you usually need assistance with?" },
        { "index": 31, "answer": "", "question": "What city do you reside in?" },
        { "index": 32, "answer": "", "question": "Is there anything regarding your lifestyle that you would like to specify?" },
        { "index": 33, "answer": "", "question": "We never got your name" },
        { "index": 34, "answer": "", "question": "Also your company and designation please" },
        { "index": 35, "answer": "", "question": "How do you find you on Instagram?" },
        { "index": 36, "answer": "", "question": "Your LinkedIn profile" },
        { "index": 37, "answer": "", "question": " Where do we send you the mail" },
    ])
    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem("phoneNumber");
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                }
            } catch (error) {
                console.error("Error retrieving phone number:", error);
            }
        };

        getPhoneNumber();
    }, []);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const updateAnswerByIndex = (index, newAnswer) => {
        setAllUserDetails((prevDataArray) =>
            prevDataArray.map((item) =>
                item.index === index ? { ...item, answer: newAnswer } : item
            )
        );
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    ;
    const saveData = async () => {
        const ansListArray = allUserDetails.filter((item) => item.answer !== "")
        try {
            const response = await axios.post(
                "https://www.indulge.blokxlab.com/add-taste",
                {
                    mobile_no: storedPhoneNumber,
                    answersArray: ansListArray,
                }
            );
            getTasteData(storedPhoneNumber);
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Error while saving data:", error);
            alert("Something went wrong!")
        }
    };

    const handleClick = () => {
        saveData();
    };
    const getTasteData = async (phoneNumber) => {
        try {
            const response = await axios.get(
                `https://www.indulge.blokxlab.com/get-taste?mobile_no=${phoneNumber}`
            );
            if (response.status === 200) {
                const userData = response.data.user.answers;
                if (userData.length > 0) {
                    const newArr = allUserDetails?.map((item) => {
                        const foundUser = userData.find(data => data?.index === item.index);
                        if (foundUser) {
                            return { ...item, "answer": foundUser.answer }
                        } else {
                            return item
                        }

                    });
                    setAllUserDetails(newArr);
                }

            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    };

    useEffect(() => {
        if (storedPhoneNumber) {
            getTasteData(storedPhoneNumber);
        }
    }, [storedPhoneNumber]);

    const handleConfirm = (date) => {
        hideDatePicker();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

        updateAnswerByIndex(2, date.toLocaleDateString('en-GB', options))
    };

    const getAnswerByQuestion = (index) => {
        const foundItem = allUserDetails.find((item) => item.index === index);
        return foundItem ? foundItem.answer : '';

    };
    return (
        <ScrollView
            style={styles.scrollViewContent}
            contentContainerStyle={{ paddingBottom: 70 }}
        >
            <View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>01.</Text>
                        <Text style={styles.questionText}>You are a </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Pressable
                            style={[
                                styles.rectangleContainer,
                                getAnswerByQuestion(1) === "Sunrise" && styles.selectedOption
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
                                styles.rectangleContainer1,
                                getAnswerByQuestion(1) === "Sunset" && styles.selectedOption
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
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            // marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>02.</Text>
                        <Text style={styles.questionText}>You were born on</Text>
                    </View>
                    <Pressable
                        onPress={() =>
                            showDatePicker()
                        }
                    >
                        <View style={styles.rectangleContainer2}>
                            <View
                                style={{ flexDirection: "row", justifyContent: "flex-start" }}
                            >
                                <Text
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 16,
                                        textAlign: "left",
                                        fontFamily: "YourFont-Regular",
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    {getAnswerByQuestion(2)
                                        ? getAnswerByQuestion(2)
                                        : "DD/MM/YYYY"}
                                </Text>
                                <Image
                                    source={require("../../assets/tastes/ArrowDownImage.png")}
                                    style={{ alignSelf: "center", marginLeft: "50%" }}
                                />
                            </View>
                        </View>
                    </Pressable>
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>03.</Text>
                        <Text style={styles.questionText}>Your marital status</Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {statusOptions.map((status, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== statusOptions.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(3) == status && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(3, status)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>04.</Text>
                        <Text style={styles.questionText}>
                            Are you a pet parent? What is their name?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    4,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(4) ? getAnswerByQuestion(4) : ''}

                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>05.</Text>
                        <Text style={styles.questionText}>
                            What is your favourite sport?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    5,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(5) ? getAnswerByQuestion(5) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>06.</Text>
                        <Text style={styles.questionText}>
                            The BEST brand according to you is?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    6,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(6) ? getAnswerByQuestion(6) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>07.</Text>
                        <Text style={styles.questionText}>The Designer you ADORE...</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    7,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(7) ? getAnswerByQuestion(7) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>08.</Text>
                        <Text style={styles.questionText}>
                            One Book that you recommend everyone
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    8,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(8) ? getAnswerByQuestion(8) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.02,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>09.</Text>
                        <Text style={styles.questionText}>
                            The country you want to escape to?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    9,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(9) ? getAnswerByQuestion(9) : ''}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>10.</Text>
                        <Text style={styles.questionText}>How often do you travel</Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {travelStatuses.map((status, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== travelStatuses.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(10) == status && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(10, status)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>11.</Text>
                        <Text style={styles.questionText}>The car you love...?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    11,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(11) ? getAnswerByQuestion(11) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>12.</Text>
                        <Text style={styles.questionText}>
                            The actor/actress you are head{"\n"}over heels for
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    12,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(12) ? getAnswerByQuestion(12) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>13.</Text>
                        <Text style={styles.questionText}>The favourite artist?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    13,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(13) ? getAnswerByQuestion(13) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>14.</Text>
                        <Text style={styles.questionText}>The favourite watch</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    14,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(14) ? getAnswerByQuestion(14) : ''}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>15.</Text>
                        <Text style={styles.questionText}>You like your stays in</Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {stayStatuses.map((status, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== stayStatuses.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(15) === status && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(15, status)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>16.</Text>
                        <Text style={styles.questionText}>You prefer</Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {preferStatuses.map((status, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== preferStatuses.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(16) == status && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(16, status)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>17.</Text>
                        <Text style={styles.questionText}>You are a..</Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {foodStatuses.map((status, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== foodStatuses.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(17) === status && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(17, status)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>18.</Text>
                        <Text style={styles.questionText}>
                            Is there any specific kind of food{"\n"}that you are allergic to?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    18,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(18) ? getAnswerByQuestion(18) : ''}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>19.</Text>
                        <Text style={styles.questionText}>
                            Are you currently on any form of {"\n"}diet?
                        </Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {dietStatuses.map((status, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== dietStatuses.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(19) == status && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(19, status)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>20.</Text>
                        <Text style={styles.questionText}>Your go-to drink?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    20,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(20) ? getAnswerByQuestion(20) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>21.</Text>
                        <Text style={styles.questionText}>Your favourite food is?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    21,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(21) ? getAnswerByQuestion(21) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>22.</Text>
                        <Text style={styles.questionText}>
                            A restaurant cannot stop recommending?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    22,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(22) ? getAnswerByQuestion(22) : ''}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>23.</Text>
                        <Text style={styles.questionText}>Your ideal coffee is</Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {coffeeStatuses.map((status, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== coffeeStatuses.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(23) == status && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(23, status)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>24.</Text>
                        <Text style={styles.questionText}>
                            The cuisine that makes your mouth water
                        </Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {languageStatuses.map((status, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== languageStatuses.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(24) == status && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(24, status)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>25.</Text>
                        <Text style={styles.questionText}>The dessert of your dreams</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    25,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(25) ? getAnswerByQuestion(25) : ''}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>26.</Text>
                        <Text style={styles.questionText}>
                            Which is the flower you adore?
                        </Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {flowerStatuses.map((flowerStatus, index) => (
                            <View
                                key={index}
                                style={{
                                    minWidth: 100,
                                    maxWidth: 180,
                                    marginRight: index !== flowerStatuses.length - 1 ? 10 : 0,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Pressable
                                    style={[
                                        styles.rectangleContainer7,
                                        getAnswerByQuestion(26) == flowerStatus && styles.selectedOption,
                                        { flex: 1 }
                                    ]}
                                    onPress={() => updateAnswerByIndex(26, flowerStatus)}
                                    android_ripple={{ color: 'transparent' }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                            textAlign: "center",
                                            fontFamily: "YourFont-Regular",
                                        }}
                                    >
                                        {flowerStatus}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>27.</Text>
                        <Text style={styles.questionText}>
                            Which is the car you travel most frequently in?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    27,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(27) ? getAnswerByQuestion(27) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>28.</Text>
                        <Text style={styles.questionText}>What is your blood group?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    28,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(28) ? getAnswerByQuestion(28) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>29.</Text>
                        <Text style={styles.questionText}>Are you diabetic?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    29,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(29) ? getAnswerByQuestion(29) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>30.</Text>
                        <Text style={styles.questionText}>
                            What do you usually need{"\n"}assistance with?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    30,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(30) ? getAnswerByQuestion(30) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>31.</Text>
                        <Text style={styles.questionText}>What city do you reside in?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    31,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(31) ? getAnswerByQuestion(31) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>32.</Text>
                        <Text style={styles.questionText}>
                            Is there anything regarding your{"\n"}lifestyle that you would like to{"\n"}specify?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    32,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(32) ? getAnswerByQuestion(32) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>33.</Text>
                        <Text style={styles.questionText}>We never got your name</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    33,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(33) ? getAnswerByQuestion(33) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.01,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>34.</Text>
                        <Text style={styles.questionText}>
                            Also your company and designation please
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    34,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(34) ? getAnswerByQuestion(34) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>35.</Text>
                        <Text style={styles.questionText}>
                            How do you find you on Instagram?
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    35,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(35) ? getAnswerByQuestion(35) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>36.</Text>
                        <Text style={styles.questionText}>Your LinkedIn profile</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    36,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(36) ? getAnswerByQuestion(36) : ''}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: windowWidth * 0.015,
                            marginLeft: windowWidth * 0.03,
                            marginTop: windowWidth * 0.01,
                        }}
                    >
                        <Text style={styles.tasteTitle}>37.</Text>
                        <Text style={styles.questionText}>
                            Where do we send you the mail
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor={"#ffffff"}
                            onChangeText={(answer) =>
                                updateAnswerByIndex(
                                    37,
                                    answer
                                )
                            }
                            value={getAnswerByQuestion(37) ? getAnswerByQuestion(37) : ''}
                        />
                    </View>
                </View>
                <View
                    style={styles.saveButtonContainer}
                >
                    <Pressable
                        style={styles.saveButton}
                        onPress={handleClick}
                    >
                        <Text
                            style={styles.saveButtonText}
                        >
                            Save
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};
export default TasteScreen;

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingBottom: 120,
    },
    tasteTitle: {
        fontSize: 16,
        color: "#566D80",
        fontFamily: "YourFont-Regular",
    },
    questionText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontFamily: "YourFont-Regular",
        marginLeft: "2%",
        letterSpacing: 1,
        lineHeight: 20
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    rectangleContainer: {
        width: 165,
        height: 76,
        borderWidth: 2,
        borderColor: "#373737",
        borderRadius: 12,
        marginLeft: windowWidth * 0.02,
    },
    rectangleContainer1: {
        width: 175,
        height: 80,
        borderWidth: 2,
        borderColor: "#373737",
        borderRadius: 12,
        marginLeft: windowWidth * 0.03,
    },
    selectedOption: {
        borderColor: "gold",
        borderWidth: 2,
    },
    optionText: {
        color: "#FFFFFF",
        position: "absolute",
        fontSize: 16,
        fontFamily: "YourFont-Regular",
        left: "45%",
        top: "25%",
        textAlign: "left",
    },
    selectedRectangleContainer: {
        borderWidth: 2,
        borderColor: "gold",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        backgroundColor: "gray",
    },
    input: {
        fontSize: 18,
        fontFamily: "YourFont-Regular",
        color: "#ffffff",
    },
    rectangleContainer7: {
        width: 150,
        height: 52,
        borderWidth: 2,
        borderColor: "#373737",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "2%",
    },
    imageStyle: {
        width: "30%",
        height: "100%",
        borderRadius: 10,
        marginLeft: "4%",
        marginTop: "2%",
    },
    rectangleContainer2: {
        width: 345,
        height: 50,
        borderWidth: 2,
        borderColor: "#373737",
        borderRadius: 12,
        backgroundColor: "#373737",
        marginHorizontal: "2%",
        marginVertical: "2%",
        paddingHorizontal: "5%",
        paddingVertical: "4%",
    },

    inputContainer: {
        width: 345,
        height: 50,
        borderWidth: 2,
        borderColor: "#373737",
        borderRadius: 12,
        backgroundColor: "#373737",
        marginHorizontal: "2%",
        marginVertical: "2%",
        paddingHorizontal: "5%",
        paddingVertical: "4%",
    },
    saveButtonText: {
        color: "#000000",
        fontSize: 18,
        fontFamily: "YourFont-Regular",
    },
    saveButton: {
        backgroundColor: "#D39F3A",
        width: 300,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    },
    saveButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2%",
    }
});
