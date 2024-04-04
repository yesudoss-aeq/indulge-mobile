import { StyleSheet } from 'react-native'


const IndulgeAiStyle = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    announcementContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    announcementText: {
        color: "#000000",
        fontFamily: "RegularFont",
        fontSize: 18
    },
    indulgeGptText: {
        color: "#000000",
        fontFamily: "RegularFont",
        fontWeight: "600",
        fontSize: 25
    },
    indulgeText: {
        color: "#000000",
        fontFamily: "YourFont-Regular",
        lineHeight: 18,
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "7%",
        marginRight: "7%",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 30,
        width: 'auto',
    },
    seachImage: {
        width: 32,
        height: 32,
        marginLeft: "3%",
    },
    search: {
        padding: "3%",
        color: "#FFFFFF",
        fontSize: 16,
        flex: 1,
    },
    sendIcon: {
        width: 32,
        height: 32,
        marginRight: "3%",
    },
    promptsContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3%",
    },
    promptRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3%",
    },
    chatgptText: {
        color: "#FFFFFF",
        backgroundColor: "#2828288C",
        width: 140,
        height: 70,
        marginLeft: "5%",
        textAlignVertical: "center",
        textAlign: "left",
        paddingLeft: 20,
        fontFamily: "YourFont-Regular",
        fontSize: 13,
        lineHeight: 18,
        borderRadius: 20,
    },
    chatgptText1: {
        color: "#FFFFFF",
        backgroundColor: "#2828288C",
        width: 140,
        height: 70,
        marginLeft: "5%",
        textAlignVertical: "center",
        textAlign: "left",
        paddingLeft: 20,
        fontFamily: "YourFont-Regular",
        fontSize: 13,
        lineHeight: 18,
        borderRadius: 20,
    },
    chatgptText2: {
        color: "#FFFFFF",
        backgroundColor: "#2828288C",
        width: 140,
        height: 70,
        marginLeft: "5%",
        textAlignVertical: "center",
        textAlign: "left",
        paddingLeft: 20,
        fontFamily: "YourFont-Regular",
        fontSize: 13,
        lineHeight: 18,
        borderRadius: 20,
    },
    chatgptText3: {
        color: "#FFFFFF",
        backgroundColor: "#2828288C",
        width: 140,
        height: 70,
        marginLeft: "5%",
        borderRadius: 20,
        fontSize: 13,
        lineHeight: 18,
        fontFamily: "YourFont-Regular",
        textAlignVertical: "center",
        textAlign: "left",
        paddingLeft: 15,
    },
    chatgptResponse: {
        backgroundColor: "#2828288C",
        borderRadius: 11,
        width: 300,
        height: 250,
        alignSelf: "center",
        marginTop: "2%",
    },
    chatgptResponseText: {
        color: "#FFFFFF",
        fontFamily: "YourFont-Regular",
        lineHeight: 18,
        fontSize: 15,
        margin: 10,
    },
    concerienceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    conciergeText: {
        color: "#ffffff",
        fontFamily: "RegularFont",
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 20,
        padding: 15,
        fontWeight: '600'
    }

})

export default IndulgeAiStyle