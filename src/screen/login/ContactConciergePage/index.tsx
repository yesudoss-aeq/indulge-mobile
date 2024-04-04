import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Pressable,
    Image,
    Text,
    Linking,
} from "react-native";
// import * as Font from "expo-font";
// import fontName from "../assets/PFBeauSansPro-Reg_0.ttf";

const ContactConciergePage = () => {
    const navigation = useNavigation();
    const [isFontLoaded, setFontLoaded] = useState(false);

    const handleLoginScreen = () => {
        // navigation.navigate("WelComeScreen");
        navigation.reset({
            index: 0,
            routes: [{ name: 'WelComeScreen' }],
        });
    };

    //add font-family
    //   useEffect(() => {
    //     const loadFont = async () => {
    //       await Font.loadAsync({
    //         "YourFont-Regular": fontName,
    //       });
    //       setFontLoaded(true);
    //     };
    //     loadFont();
    //   }, []);

    //   if (!isFontLoaded) {
    //     return null;
    //   }

    const handleWhatsapp = () => {
        const phoneNumber = "9154367381";
        const message = "Hello, I need assistance";
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`;

        Linking.openURL(whatsappUrl)
            .then(() => { })
            .catch((error) => {
                console.error("Error opening whatsapp", error);
            });
    };
    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <Pressable onPress={handleLoginScreen}>
                    <Image source={require("../../../../assets/intro/Back.png")} />
                </Pressable>
            </View>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../../../assets/logo/IndulgeLogoWhite.png")}
                    style={styles.logo}
                />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <Text style={styles.text1}>Looks like we couldn't verify you,</Text>
                <Text style={styles.text1}>
                    please contact our concierge agents to assist you!
                </Text>
                <Text style={styles.text2}>WhatsApp and phone number</Text>
                <View style={{ flexDirection: "row", marginTop: "3%" }}>
                    <Pressable onPress={handleWhatsapp}>
                        <Image source={require("../../../../assets/intro/Calling-icon.png")} />
                    </Pressable>
                    <Image
                        source={require("../../../../assets/intro/telephone.png")}
                        style={{ marginLeft: "3%" }}
                    />
                </View>
            </View>
        </View>
    );
};
export default ContactConciergePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    backButton: {
        marginTop: "15%",
        marginLeft: "6%",
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1%",
    },
    logo: {
        width: 95,
        height: 75,
    },
    text1: {
        color: "#FFFFFF",
        textAlign: "center",
        lineHeight: 25,
        fontSize: 14,
        fontFamily: "YourFont-Regular",
    },
    text2: {
        color: "#C4963D",
        lineHeight: 25,
        fontSize: 14,
        fontFamily: "YourFont-Regular",
    },
});
