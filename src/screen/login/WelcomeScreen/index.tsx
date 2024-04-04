import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Pressable,
    Text,
    ImageBackground,
    StyleSheet,
    Dimensions, Linking, ScrollView
} from "react-native";

const WelcomeScreen = () => {
    const [isFontLoaded, setFontLoaded] = useState(false);
    const navigation = useNavigation();
    // const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const handleSubmit = () => {
        navigation.navigate("LoginMainScreen");
    };

    const handleData = () => {
        navigation.navigate("RegisterScreen");
    };

    const handleBenifitScreen = () => {
        navigation.navigate("BenifitScreen");
    };
    const handleAccountDeletion = () => {
        // Replace 'https://example.com/account-deletion' with your actual account deletion link
        const accountDeletionLink = 'https://admin-indulge.netlify.app/account-delete';

        // Open the external link in the default web browser
        Linking.openURL(accountDeletionLink);
    };
    return (
        <ImageBackground
            source={require("../../../../assets/intro/LOGINPAGEIMAGE.png")}
            style={styles.container}
        >
            <View style={styles.content}>
                <View
                    style={styles.mainContainer}
                >
                    <View style={styles.logoContainer}>
                        <View
                            style={styles.logoImageContainer}
                        >
                            {/* <Logo url={require("../../../../assets/intro/IndulgeLogoWhite.png")} /> */}
                            <View
                                style={styles.welcomeTextContainer}
                            >
                                <Text
                                    style={styles.welcomeText1}
                                >
                                    Welcome to the world of{"\n"}
                                    <Text
                                        style={styles.welcomeText2}
                                    >
                                        Indulge
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <ScrollView
                            style={styles.buttonContainer}
                        >
                            <Pressable style={styles.loginButton} onPress={handleSubmit}>
                                <Text style={styles.loginButtonText}>Login</Text>
                            </Pressable>
                            <Pressable onPress={handleData} style={styles.registerButton}>
                                <Text style={styles.registerButtonText}>Register</Text>
                            </Pressable>
                            {/* <Pressable
                                style={styles.benifitButton}
                                onPress={handleBenifitScreen}
                            >
                                <Text style={styles.benifitText}>Benefit's</Text>
                            </Pressable> */}
                            <Pressable
                                style={{}}
                                onPress={handleAccountDeletion}
                            >
                                <Text style={styles.benifitText}>Account Delete ?</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        resizeMode: "cover",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    welcomeText1: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "500",
        fontSize: 26,
        lineHeight: 42,
        // fontFamily: "YourFont-Regular",
    },
    welcomeText2: {
        color: "#C4963D",
        fontWeight: "900",
        fontSize: 30,
        // fontFamily: "YourFont-Regular",
    },
    buttonContainer: {
        // height: 270,
        width: "105%",
        flex: 1,
        position: "absolute",
        bottom: 0,
    },
    welcomeTextContainer: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: 740,
    },
    mainContainer: {
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logoContainer: {
        width: "100%",
        height: "100%",
        padding: 10
    },
    logoImageContainer: {
        display: "flex",
        height: "100%",
    },
    // benifitText: {
    //     color: "#FFFFFF",
    //     fontSize: 12,
    //     textAlign: "right",
    //     // fontFamily: "YourFont-Regular",
    //     padding: 5,
    // },
    // container: {
    //     flex: 1,
    //     backgroundColor: "transparent",
    // },
    // logoContainer: {
    //     // alignItems: "center",
    //     // justifyContent: "center",
    //     // padding: 25,
    // },
    logo: {
        width: 110,
        height: 90,

    },
    welcomeText: {
        color: "#FFFFFF",
        textAlign: "center",
        padding: 10,
        fontSize: 32,
        fontFamily: "YourFont-Regular",
    },
    button: {
        position: "absolute",
        marginTop: "145%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    loginButton: {
        backgroundColor: "#C4963D",
        width: '100%',
        height: 52,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButtonText: {
        position: "absolute",
        textAlign: "center",
        fontSize: 18,
        color: "#010101",
        fontFamily: "YourFont-Regular",
    },
    registerButton: {
        backgroundColor: "#C4963D",
        width: '100%',
        height: 52,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    registerButtonText: {
        position: "absolute",
        textAlign: "center",
        fontSize: 18,
        color: "#010101",
        fontFamily: "YourFont-Regular",
    },
    benifitButton: {
        borderWidth: 1,
        borderColor: "#A8A8A8",
        borderRadius: 12,
        width: '100%',
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    benifitText: {
        color: "#FFFFFF",
        fontSize: 18,
        textAlign: "center",
        fontFamily: "YourFont-Regular",
        padding: 5,
    },
    imageBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    whiteText: {
        color: "#FFFFFF",
        textAlign: "left",
        fontSize: 35,
        fontFamily: "YourFont-Regular",
        lineHeight: 42,
    },
    otherColorText: {
        color: "#C4963D",
        textAlign: "left",
        fontSize: 40,
        fontFamily: "YourFont-Regular",
        fontWeight: "900",
    },
});
export default WelcomeScreen;
