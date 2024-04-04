import { StyleSheet } from 'react-native'


const TasteStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: -10,
        marginTop: 10
    },
    profileIcon: {
        width: 52,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        alignItems: 'left',
    },
    Helptext: {
        color: '#566D80',
        fontSize: 18,
        marginLeft: 5,
        fontWeight: '800',
        lineHeight: 25,
        fontFamily: 'YourFont-Regular',
    },
    Indulgetext: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 5,
        fontWeight: '600',
        lineHeight: 25,
        fontFamily: 'YourFont-Regular',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginRight: '20%'
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
    pressableText: {
        padding: 10,
    },
    selectedCategory: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    selectedLine: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginHorizontal: 20,
    },
    focusedText: {
        color: '#FFFFFF',
        fontFamily: 'YourFont-Regular',
    },
    selectedCategoryButton: {
        borderColor: '#FFD700',
        borderWidth: 2,
        backgroundColor: '#000000',
    },
    categoryButton: {
        backgroundColor: '#000000',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container1: {
        marginTop: "5%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    homeScreen: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: "15%",
    },
    flatListContainerStryle: {
        marginTop: '4%',
        marginStart: '2.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    flatListContainerStryleForTaste: {
        padding: 16,
        marginBottom: 800,
    },
    saveButtonForFilterText: {
        color: "#000000",
        fontSize: 18,
        fontFamily: "YourFont-Regular"
    },
    saveButtonForFilterContainer: {
        marginHorizontal: '5%',
        backgroundColor: "#D39F3A",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        padding: 10,
        // marginBottom: 20,
        marginTop: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default TasteStyle