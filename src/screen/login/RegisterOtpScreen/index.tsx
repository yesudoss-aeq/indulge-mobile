import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, Pressable } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
// import * as Font from 'expo-font';
// import fontName from '../assets/PFBeauSansPro-Reg_0.ttf'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterOtpScreen = () => {
    const [value, setValue] = useState("");
    const [isFontLoaded, setFontLoaded] = useState(false);
    const CELL_COUNT = 4;
    const navigation = useNavigation();
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const RESEND_OTP_TIME_LIMIT = 60;

    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT
    );
    const MAX_TRIAL_ATTEMPTS = 3;
    const [failedAttempts, setFailedAttempts] = useState(0);
    let resendOtpTimerInterval;
    const route = useRoute();
    const phoneNumber = route.params?.phoneNumber;

    // Format time as "00:00"
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    //to start resent otp option
    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - 1);
            }
        }, 1000);
    };


    const onResendOtpButtonPress = () => {
        setValue("");
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();
        resendOtp(phoneNumber)
    }

    //start timer on screen on launch
    useEffect(() => {
        startResendOtpTimer();
        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);

    //add font-family
    // useEffect(() => {
    //     const loadFont = async () => {
    //         await Font.loadAsync({
    //             'YourFont-Regular': fontName,
    //         });
    //         setFontLoaded(true);
    //     };
    //     loadFont();
    // }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }


    //back to LoginScreen
    const handleLoginScreen = () => {
        // navigation.navigate("LoginMainScreen");
        navigation.reset({
            index: 0,
            routes: [{ name: 'WelComeScreen' }],
        });
    }



    //Resend Otp Api
    const resendOtp = async (phoneNumber) => {
        try {
            const response = await axios.post("https://www.indulge.blokxlab.com/send-otp", {
                countryCode: 91,
                phoneNumber: phoneNumber,
            });
            if (response.data) {
                console.log(response.data, "response");
            } else {
                Alert.alert("Failed to fetch OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching OTP:", error);
            Alert.alert("Failed to fetch OTP. Please try again.");
        }
    };

    //verifyOtp
    const verifyOtp = async () => {
        if (value.length === CELL_COUNT) {
            try {
                const response = await axios.post(
                    "https://www.indulge.blokxlab.com/verify-otp",
                    {
                        countryCode: 91,
                        mobile_no: phoneNumber,
                        otp: value,
                    }
                );

                if (response.status === 200) {
                    const token = response.data.token;
                    await AsyncStorage.setItem("phoneNumber", phoneNumber.toString());
                    await AsyncStorage.setItem('token', token)
                    await AsyncStorage.setItem('profilePictureURI', "");

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MyDrawer' }],
                    });

                    // navigation.navigate('TypeformScreen');
                }
            } catch (error) {
                setFailedAttempts(failedAttempts + 1);
                if (failedAttempts + 1 === MAX_TRIAL_ATTEMPTS) {
                    navigation.navigate('ContactConciergePage');
                } else {
                    Alert.alert('Invalid OTP. Please try again.');
                }
            }
        }
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.backButton}>
                <Pressable onPress={handleLoginScreen}>
                    <Image source={require("../../../../assets/intro/Back.png")} />
                </Pressable>
            </View>
            <View style={Styles.logoContainer}>
                <Image source={require("../../../../assets/logo/IndulgeLogoWhite.png")} style={Styles.logo} />
            </View>
            <View style={{ marginTop: '30%' }}>
                <Text style={Styles.otpText}>Enter the OTP you received to +91{phoneNumber}</Text>
            </View>
            <View style={Styles.otpDiv}>
                <View style={Styles.textFieldDiv}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={Styles.codeFieldRoot}
                        keyboardType="number-pad"
                        autoComplete="sms-otp"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[Styles.cell, isFocused && Styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />

                </View>
            </View>
            <View style={{ marginTop: '50%', alignItems: 'center', justifyContent: 'center' }} >

                {resendButtonDisabledTime > 0 ? (
                    <Text style={Styles.resendCodeText}>

                        {/* Didn’t get the OTP? */}
                        <Text style={{ color: '#C4963D', fontFamily: 'YourFont-Regular' }}>
                            Send again in {" "}
                            {formatTime(resendButtonDisabledTime)}
                        </Text>
                    </Text>
                ) : (
                    <View>
                        <Pressable
                            disabled={resendButtonDisabledTime > 0}
                            onPress={onResendOtpButtonPress}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '3%' }}>
                                <Text style={{ color: "white", fontSize: 15, marginTop: '15%', fontFamily: 'YourFont-Regular' }}>
                                    Didn’t get the OTP?
                                </Text>
                                <Text style={{ color: '#C4963D', marginTop: '15%', marginLeft: '2%', fontSize: 14, fontFamily: 'YourFont-Regular' }}>Resend OTP</Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '35%' }}>
                <Pressable style={Styles.verifyOtpButton} onPress={verifyOtp}>
                    <Text style={Styles.verifyOtpText}>Verify OTP</Text>
                </Pressable>
            </View>

        </View>
    )
}
export default RegisterOtpScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'YourFont-Regular',
        fontWeight: '400'
    },
    phnNumber: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: '2%',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'YourFont-Regular',
    },
    otpDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 1,
        width: "100%",
        marginTop: "110%",
        position: 'absolute',

    },
    textFieldDiv: {
        width: "75%",
        color: "#FFFFFF"
    },
    root: { flex: 1 },
    codeFieldRoot: { marginTop: 0 },
    cell: {
        width: 55,
        height: 58,
        fontSize: 24,
        textAlign: "center",
        padding: 9,
        backgroundColor: "#171717",
        color: "#FFFFFF",
        borderRadius: 10,
    },
    focusCell: {
        borderColor: "#000",
    },
    resendCodeText: {
        fontSize: 15,
        color: "#FFFFFF",
        marginTop: '15%',
    },
    verifyOtpButton: {
        backgroundColor: '#C4963D',
        width: 144,
        height: 42,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'


    },
    verifyOtpText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'YourFont-Regular',
    },
    backButton: {
        marginTop: '10%',
        marginLeft: '3%'
    },
    logo: {
        width: 95,
        height: 75
    }
})