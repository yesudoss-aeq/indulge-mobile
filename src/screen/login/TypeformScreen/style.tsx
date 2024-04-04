import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const LoginMainScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    welcomeText: {
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 50,
        fontSize: 30,
        fontWeight: "500",
    },
    loginText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 14,
    },
    phonenoText: {
        color: "#FFFFFF",
        // marginTop: "20%",
        marginLeft: "3%",
        fontSize: 16,
    },
    phoneno: {
        borderWidth: 1,
        borderColor: "#171717",
        borderRadius: 170,
        margin: 12,
        padding: 14,
        color: "#FFFFFF",
    },
    phoneText: {
        color: "white",
        marginTop: "7%",
        textAlign: "center",
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: "#C4963D",
        marginTop: "30%",
        width: 144,
        height: 42,
        padding: 7,
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButtonText: {
        textAlign: "center",
        fontSize: 18,
        textTransform: "capitalize",
        fontFamily: "YourFont-Regular",
    },
    validText: {
        color: "red",
        marginLeft: "48%",
    },
    phnNumber: {
        color: "#FFFFFF",
        marginLeft: "6%",
        fontSize: 14,
        fontFamily: "YourFont-Regular",
        fontWeight: "400",
    },
    logo: {
        width: 120,
        height: 90,
    },
    header: {
        alignItems: 'center',
        marginTop: '10%',
    },
    welcomeText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: "YourFont-Regular",
    },
    signInText: {
        color: '#C4963D',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "YourFont-Regular",
    },
    mainContainer: {
        marginTop: "30%"
    },
    innerContainer: {
        flexDirection: "row"
    },
    innerContainer1: {
        textAlign: "center",
        marginTop: 2
    },
    innerContainer2: {
        width: 130,
        height: 50,
        marginHorizontal: 9,
        backgroundColor: "#171717",
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
        marginTop: "8%",
        marginLeft: "8%",
    },
    callingcodeContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    callingcodeText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: "15%",
    },
    dropdownContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    phoneNumberContainer: {
        marginVertical: 11,
        borderBottomColor: "#111",
        borderBottomWidth: 1,
        height: 50,
        width: 198,
        fontSize: 16,
        borderRadius: 170,
        color: "#FFFFFF",
        backgroundColor: "#171717",
        textAlignVertical: "center",
        textAlign: "justify",
        marginLeft: 10,
        paddingLeft: 18,
    },
    digitContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    digitText: {
        color: "#FFFFFF",
        textAlign: "center",
        lineHeight: 16,
        fontSize: 14,
        fontFamily: "YourFont-Regular",
    },
    loginContainer: {
        alignItems: "center",
        justifyContent: "center"
    }
})

export default LoginMainScreenStyle