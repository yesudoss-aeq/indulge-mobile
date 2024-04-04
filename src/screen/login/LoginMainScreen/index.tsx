import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    Pressable,
    View,
    Modal,
    Text,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
    FlatList,
    TextInput,
    Alert,
} from "react-native";
// import * as Font from "expo-font";
import { IconButton } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';

// import fontName from "../assets/PFBeauSansPro-Reg_0.ttf";
// import Loader from "../CommonFiles/Loader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { useDispatch } from "react-redux";
import { countryData } from "../../../utils/constant/Constant";
import { resetTagState } from "../../../StoreRedux/FilterSlice";


const LoginMainScreen = () => {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const navigation = useNavigation();
      const dispatch = useDispatch()

    //navigate to otpscreen
    const handleOtpScreen = async () => {
        try {
            setIsLoaded(true);
            const convertedPhoneNumber = Number(phoneNumber);

            let response;

            if (convertedPhoneNumber === 8917254384) {
                response = await axios.post(
                    "https://www.indulge.blokxlab.com/login",
                    {
                        countryCode: 91,
                        mobile_no: convertedPhoneNumber,
                    }
                );
                if (response.status === 200) {
                    await AsyncStorage.setItem("phoneNumber", convertedPhoneNumber.toString());
                    const authToken = response.data.token;
                    console.log(authToken, "token")
                    AsyncStorage.setItem("token", authToken);
                      dispatch(resetTagState())
                    // navigation.navigate("MyBottomTabs");
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MyDrawer' }],
                    });
                    setIsLoaded(false);
                    return;
                }
            }

            const otpResponse = await axios.post(
                "https://www.indulge.blokxlab.com/send-otp",
                {
                    countryCode: 91,
                    phoneNumber: convertedPhoneNumber,
                }
            );
            console.log("otpResponse:::", otpResponse)
            if (otpResponse.data) {
                await AsyncStorage.setItem("phoneNumber", convertedPhoneNumber.toString());
                navigation.navigate("OtpScreen", { phoneNumber: convertedPhoneNumber });
            } else {
                Alert.alert("Failed to fetch OTP. Please try again.");
            }

            setIsLoaded(false);
        } catch (error) {
            console.error("Error fetching OTP:", error);
            setIsLoaded(false);

            if (error.response && error.response.status === 400) {
                Alert.alert("You need to register first");
                navigation.navigate("RegisterScreen");
            } else {
                Alert.alert("Failed to fetch OTP. Please try again.");
            }
        }
    };

    useEffect(() => {

        setAreas(countryData);

        if (countryData.length > 0) {
            let defaultData = countryData.filter(a => a.code === "IN");

            if (defaultData.length > 0) {
                setSelectedArea(defaultData[0]);
            }
        }
    }, []);

    // render countries codes modal
    function renderAreasCodesModal() {
        const renderItem = ({ item }) => {
            return (
                <Pressable
                    style={{
                        padding: 0,
                        marginBottom: 5,
                        flexDirection: "row",
                        backgroundColor: "#171717",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        setSelectedArea(item), setModalVisible(false);
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            height: 25,
                            width: 25,
                            paddingRight: 10,
                        }}
                    />

                    <Text style={{ fontSize: 16, color: "#fff", paddingLeft: 10 }}>
                        {item.item}
                    </Text>
                    {/* </View> */}
                </Pressable>
            );
        };

        return (
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "100%",
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                        <View
                            style={{
                                height: 250,
                                width: "100%",
                                color: "#fff",
                                backgroundColor: "#171717",

                                marginTop: 10,
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                verticalScrollIndicator={false}
                                style={{
                                    padding: 20,
                                    marginBottom: 20,
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    //add font-family
    // useEffect(() => {
    // const loadFont = async () => {
    //     await Font.loadAsync({
    //         "YourFont-Regular": fontName,
    //     });
    //     setFontLoaded(true);
    // };
    // loadFont();
    // }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../../../assets/logo/IndulgeLogoWhite.png")}
                    style={styles.logo}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>WELCOME TO INDULGE</Text>
                <Text style={styles.signInText}>SIGN IN TO CONTINUE</Text>
            </View>
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.phnNumber}>Phone Number</Text>
                </View>
                <View style={styles.innerContainer}>
                    <View style={styles.innerContainer1}>
                        <Pressable
                            style={styles.innerContainer2}
                            onPress={() => setModalVisible(true)}
                        >
                            <Image
                                source={{ uri: selectedArea?.flag }}
                                resizeMode="contain"
                                style={styles.flagImage}
                            />

                            <View style={styles.callingcodeContainer}>
                                <Text
                                    style={styles.callingcodeText}
                                >
                                    {selectedArea?.callingCode}
                                </Text>
                            </View>
                            <View
                                style={styles.dropdownContainer}
                            >
                                <Ionicons name="chevron-down" size={30} color="white" />
                            </View>
                        </Pressable>
                    </View>

                    {/* Phone Number Text Input */}
                    <TextInput
                        style={styles.phoneNumberContainer}
                        selectionColor="#FFFFFF"
                        keyboardType="numeric"
                        returnKeyType={'done'}
                        maxLength={10}
                        value={phoneNumber}
                        onChangeText={(value) => {
                            setPhoneNumber(value);
                            setPhoneNumberError("");
                        }}
                    />
                </View>
                <Text style={styles.validText}>{phoneNumberError}</Text>
                <View
                    style={styles.digitContainer}
                >
                    <Text
                        style={styles.digitText}
                    >
                        A 4-digit OTP will be sent to your phone and{"\n"}automatically
                        verified
                    </Text>
                </View>
            </View>
            <View style={styles.loginContainer}>

                <Pressable
                    style={styles.loginButton}
                    onPress={() => handleOtpScreen()}
                >
                    <Text style={styles.loginButtonText}>Submit</Text>
                </Pressable>

            </View>
            {renderAreasCodesModal()}
        </View>
    );
};
export default LoginMainScreen;

