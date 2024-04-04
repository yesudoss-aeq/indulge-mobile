import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, View, Text, TextInput, Image, Modal, TouchableWithoutFeedback, Dimensions, FlatList, Alert } from "react-native";
// import * as Font from 'expo-font';
// import fontName from '../assets/PFBeauSansPro-Reg_0.ttf';
import { IconButton } from 'react-native-paper';
const { width, height } = Dimensions.get("window");
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countryData } from "../../../utils/constant/Constant";

const RegisterScreen = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isValidUserName, setValidUserName] = useState(true);
    const [isValidPhoneNo, setValidPhoneNo] = useState(true);
    const navigation = useNavigation();
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    useEffect(() => {
        setAreas(countryData);

        if (countryData.length > 0) {
            let defaultData = countryData.filter(a => a.code === "IN");

            if (defaultData.length > 0) {
                setSelectedArea(defaultData[0]);
            }
        }
    }, []);


    //add font-family
    useEffect(() => {
        // const loadFont = async () => {
        //     await Font.loadAsync({
        //         'YourFont-Regular': fontName,
        //     });
        //     setFontLoaded(true);
        // };
        // loadFont();
    }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }

    // render countries codes modal
    function renderAreasCodesModal() {

        const renderItem = ({ item }) => {
            return (
                <Pressable
                    style={{
                        padding: 10,
                        flexDirection: "row"
                    }}
                    onPress={() => {
                        setSelectedArea(item),
                            setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            height: 30,
                            width: 30,
                        }}
                    />

                    <Text style={{ marginStart: 10, fontSize: 16, color: "#fff" }}>{item.item}</Text>
                </Pressable>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: '100%' }}
                    >
                        <View
                            style={{
                                height: 300,
                                width: width * 0.8,
                                color: "#fff",
                                backgroundColor: "#342342",
                                borderRadius: 12
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                verticalScrollIndicator={false}
                                style={{
                                    padding: 20,
                                    marginBottom: 20
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    const verifyUserName = (name) => {
        let regex = new RegExp(/^[A-Za-z ]+$/);
        if (!name) return true;
        if (regex.test(name)) {
            return true;
        }
        return false;
    };

    const verifyPhoneNo = (phone) => {
        let regex = new RegExp(/^([+]\d{2})?\d{10}$/);
        if (!phone) return true;
        if (regex.test(phone)) {
            return true;
        }
        return false;
    };


    const handleLoginScreen = () => {
        navigation.navigate("LoginMainScreen");
    }


    //user signup with fullname and phone number
    const handleSignUp = async () => {
        try {
            if (!fullName || !phoneNumber) {
                return;
            }
            const response = await axios.post('https://www.indulge.blokxlab.com/sign-up', {
                full_name: fullName,
                mobile_no: phoneNumber,
            });
            if (response.data.success) {
                await AsyncStorage.setItem('fullName', fullName);
                Alert.alert('Signup Successful', 'You have been successfully registered!');
                // navigation.navigate('RegisterOtpScreen');
                handleOtpScreen();

            } else {
                Alert.alert('Signup Failed', 'User signup failed.');
            }
        } catch (error) {
            console.error('Signup Error:', error);
            Alert.alert('Signup Error', 'You have already registered , Please Login');
        }
    };

    //otp api
    const handleOtpScreen = async () => {
        if (!phoneNumber) {
            setPhoneNumberError("Please enter a phone number");
        } else if (!/^\d+$/.test(phoneNumber)) {
            setPhoneNumberError("Enter a valid phone number");
        } else {
            setPhoneNumberError("");
            try {
                const response = await axios.post(
                    "https://www.indulge.blokxlab.com/send-otp",
                    {
                        countryCode: 91,
                        phoneNumber: phoneNumber,
                    }
                );
                if (response.data) {
                    console.log(response.data, "response");
                    navigation.navigate("RegisterOtpScreen", { phoneNumber });
                } else {
                    Alert.alert("Failed to fetch OTP. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching OTP:", error);
                Alert.alert("Failed to fetch OTP. Please try again.");
            }
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>

                <Image
                    source={require("../../../../assets/logo/IndulgeLogoWhite.png")}
                    style={styles.logo}
                />
            </View>
            <View>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.loginRegisterText}>Register to continue</Text>
            </View>
            <View>
                <Text style={styles.fullNameText}>Full Name</Text>
                <TextInput
                    style={styles.fullName}
                    value={fullName}
                    onChangeText={(value) => {
                        setFullName(value)
                        const isValid = verifyUserName(value);
                        isValid ? setValidUserName(true) : setValidUserName(false);

                    }}

                />
                <Text style={styles.validText}>
                    {isValidUserName ? "" : "*Please Enter Valid User Name"}
                </Text>
                <View>
                    <View>
                        <Text style={styles.phonenoText}>Phone Number</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ textAlign: 'center' }}>
                            <Pressable
                                style={styles.flagContainer}
                                onPress={() => setModalVisible(true)}>
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode="contain"
                                    style={styles.flagImage}
                                />

                                <View style={styles.callingcodeContainer}>
                                    <Text style={styles.callingcodeText}>{selectedArea?.callingCode}</Text>
                                </View>
                                <View style={styles.dropdownContainer}>
                                    <IconButton icon="chevron-down" size={30} iconColor='white' />
                                </View>
                            </Pressable>
                        </View>

                        {/* Phone Number Text Input */}

                        <TextInput
                            style={styles.phoneNumberContainer}
                            selectionColor='#FFFFFF'
                            keyboardType="numeric"
                            maxLength={10}
                            value={phoneNumber}
                            returnKeyType={'done'}
                            onChangeText={(value) => {
                                setPhoneNumber(value);
                                const isValid = verifyPhoneNo(value);
                                isValid ? setValidPhoneNo(true) : setValidPhoneNo(false);
                            }}
                        />
                        <Text style={styles.validText}>
                            {phoneNumberError}
                        </Text>
                    </View>
                    <View style={styles.digitContainer}>
                        <Text style={styles.digitText}>A 4-digit OTP will be sent to your phone and{"\n"}automatically verified</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.loginButton}
                    onPress={handleSignUp}
                // onPress={() => onSubmit()}
                >
                    <Text style={styles.loginText1}>Register</Text>
                </Pressable>
            </View>
            <View style={styles.alreadyTextContainer}>
                <Text style={styles.text}>Already have an account? </Text>
                <Pressable onPress={handleLoginScreen}>
                    <Text style={styles.loginText}>Login</Text>
                </Pressable>
            </View>
            {renderAreasCodesModal()}
        </View>
    )
}


export default RegisterScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25
    },
    logo: {
        width: 95,
        height: 75
    },
    welcomeText: {
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 10,
        fontSize: 32,
        fontFamily: 'YourFont-Regular'
    },
    loginRegisterText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'YourFont-Regular',
    },
    fullName: {
        borderWidth: 1,
        borderRadius: 170,
        margin: 10,
        padding: 12,
        color: '#FFFFFF',
        backgroundColor: '#171717',
        fontSize: 16,
    },
    fullNameText: {
        color: '#FFFFFF',
        marginTop: '20%',
        marginLeft: '5%',
        fontSize: 16,
        fontFamily: 'YourFont-Regular',
    },
    phonenoText: {
        color: '#FFFFFF',
        marginTop: '5%',
        marginLeft: '5%',
        fontSize: 16,
        fontFamily: 'YourFont-Regular',
    },
    phoneno: {
        borderWidth: 1,
        borderColor: '#171717',
        borderRadius: 170,
        margin: 10,
        padding: 12,
        color: '#FFFFFF'
    },
    loginButton: {
        backgroundColor: '#C4963D',
        marginTop: '10%',
        width: '50%',
        padding: 15,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText1: {
        textAlign: 'center',
        fontSize: 16,
        textTransform: 'capitalize',
        fontFamily: 'YourFont-Regular',
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'YourFont-Regular',
        fontSize: 16
    },
    validText: {
        color: "#ff0000",
        marginLeft: '6%'
    },
    otpMessage: {
        color: "#FFFFFF",
        fontSize: 16,
        marginTop: '15%',
        fontFamily: 'YourFont-Regular',
    },
    flagContainer: {
        width: 130,
        height: 50,
        marginHorizontal: 5,
        backgroundColor: '#171717',
        borderBottomWidth: 1,
        flexDirection: "row",
        fontSize: 12,
        borderWidth: 1,
        borderRadius: 170,
        marginTop: 10,
    },
    flagImage: {
        width: 30,
        height: 30,
        marginTop: '8%',
        marginLeft: '8%'
    },
    callingcodeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    callingcodeText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '15%'
    },
    dropdownContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    phoneNumberContainer: {
        marginVertical: 10,
        borderBottomColor: "#111",
        borderBottomWidth: 1,
        height: 50,
        width: 205,
        fontSize: 16,
        borderRadius: 170,
        color: '#FFFFFF',
        backgroundColor: '#171717',
        paddingLeft: 13
    },
    digitContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%'
    },
    digitText: {
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 16,
        fontSize: 14,
        fontFamily: 'YourFont-Regular'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    alreadyTextContainer: {
        flexDirection: 'row',
        marginTop: '13%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        color: '#C4963D',
        marginLeft: '10%',
        fontFamily: 'YourFont-Regular',
        fontSize: 16
    }
})