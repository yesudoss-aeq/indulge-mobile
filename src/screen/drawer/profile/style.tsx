import { StyleSheet, Dimensions } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    firstContainer: {
        backgroundColor: '#535353',
        height: SCREEN_HEIGHT / 4.7
    },
    secondContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1 / 1
    },
    profileImage: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: '3%',

    },
    camera: {
        position: 'absolute',
        top: 100,
        left: 218,
    },
    modalContainer: {
        flex: 1,
        marginTop: '128%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.40,
        shadowRadius: 3.84,
    },

    profilePicture:
    {
        marginTop: '10%',
        marginLeft: '5%',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'YourFont-Regular',
    },
    deleteIcon: {
        marginTop: '10%',
        marginRight: '10%'
    },
    cancelButton: {
        backgroundColor: '#ffbf00',
        width: 123,
        height: 33,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButton: {
        padding: 2,
        marginTop: '4%',
        marginLeft: '5%'
    },
    tabBar: {
        flexDirection: "row",
    },
    tabButton1: {
        padding: 2,
        marginTop: '4%',
        marginLeft: '7%'
    },
    activeTab: {
        backgroundColor: "#ddd",
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 1,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    categoryText: {
        color: '#8E93A6',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'YourFont-Regular',
    },
    tasteText: {
        color: '#8E93A6',
        fontSize: 20,
        fontWeight: '400',
        marginLeft: '30%',
        fontFamily: 'YourFont-Regular',
    },
    focusedText: {
        color: '#FFFFFF',
        fontFamily: 'YourFont-Regular',
    },

})

export default Styles