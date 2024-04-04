import React, { useState, useEffect } from 'react';
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import {
    TouchableOpacity,
    StyleSheet, View, Pressable, Image, FlatList, Text, ActivityIndicator, BackHandler, Dimensions, KeyboardAvoidingView, ScrollView
} from 'react-native';
// import HomeScreen from './HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialTagArray } from '../../StoreRedux/TagsSlice';
import { toggleSelection } from '../../StoreRedux/FilterSlice';
import CarData from '../../../assets/tastes/CarData.png'; //'../assets/CarData.png';
import BikeData from '../../../assets/tastes/BikeData.png';
import BeautyData from '../../../assets/tastes/BeautyData.png';
import BagData from '../../../assets/tastes/BagData.png';
import CigarData from '../../../assets/tastes/CigarData.png';
import CollectiblesData from '../../../assets/tastes/CollectiblesData.png';
import GourmetData from '../../../assets/tastes/GourmetData.png';
import GadgetsData from '../../../assets/tastes/GadgetsData.png';
import ArtData from '../../../assets/tastes/ArtData.png';
import HotelsData from '../../../assets/tastes/HotelsData.png';
import GiftData from '../../../assets/tastes/GiftData.png';
import JewelleryDataImage from '../../../assets/tastes/JewelleryDataImage.png';
import PerfumeDataImage from '../../../assets/tastes/PerfumeDataImage.png';
import WatchDataImage from '../../../assets/tastes/WatchDataImage.png';
import StationaryDataImage from '../../../assets/tastes/StationaryDataImage.png'
import { Divider } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FilterList from '../../components/FilterList';

import QuestionAsnwerList from '../../components/RenderQuestionList';
import { tasteData } from '../../utils/index';
const TastesScreen = () => {
    const navigation = useNavigation();
    const [dataArr, setDataArr] = useState([
        {
            id: 1,
            category: 'Cars',
            source: CarData,
            selected: false
        },
        {
            id: 2,
            category: 'Bikes',
            source: BikeData,
            selected: false
        },
        {
            id: 3,
            category: 'Beauty',
            source: BeautyData,
            selected: false
        },
        {
            id: 4,
            category: 'Bags',
            source: BagData,
            selected: false
        },
        {
            id: 5,
            category: 'Cigar',
            source: CigarData,
            selected: false
        },
        {
            id: 6,
            category: 'Collectibles',
            source: CollectiblesData,
            selected: false
        },
        {
            id: 7,
            category: 'Gourmet',
            source: GourmetData,
            selected: false
        },
        {
            id: 8,
            category: 'Gadgets',
            source: GadgetsData,
            selected: false
        },
        {
            id: 9,
            category: 'Art',
            source: ArtData,
            selected: false
        },
        {
            id: 10,
            category: 'Hotels',
            source: HotelsData,
            selected: false
        },
        {
            id: 11,
            category: 'Gifting',
            source: GiftData,
            selected: false
        },
        {
            id: 12,
            category: 'Jewellery',
            source: JewelleryDataImage,
            selected: false
        },
        {
            id: 13,
            category: 'Fragrances',
            source: PerfumeDataImage,
            selected: false
        },
        {
            id: 14,
            category: 'Watches',
            source: WatchDataImage,
            selected: false
        },
        {
            id: 15,
            category: 'Stationary',
            source: StationaryDataImage,
            selected: false
        }
    ])
    const dispatch = useDispatch();
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [focusedElement, setFocusedElement] = useState('Category');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [drawer, setOpenDrawer] = useState(false);
    const [showTastes, setShowTastes] = useState(false);
    const [showCategory, setShowCategory] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [storedPhoneNumber, setStoredPhoneNumber] = useState("");

    const [allUserDetails, setAllUserDetails] = useState(tasteData)
    const [ansListArray, setAnsListArray] = useState([])


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
        const foundUser = allUserDetails.find(data => data?.index === index);
        const foundUserFromAnsList = ansListArray.find(data => data?.index === index);
        if (foundUserFromAnsList) {
            setAnsListArray((prevDataArray) =>
                prevDataArray.map((item) =>
                    item.index === index ? { ...item, answer: newAnswer } : item
                )
            );
        } else {
            setAnsListArray((prevDataArray) =>
                [...prevDataArray, { ...foundUser, answer: newAnswer }]
            )
        }
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const saveData = async () => {
        const finalAnsListArray = ansListArray
            .filter((item) => item.answer !== "")
            .map((item) => ({ index: item.index, answer: item.answer, question: item.question }));

        try {
            const response = await axios.post(
                "https://www.indulge.blokxlab.com/add-taste",
                {
                    mobile_no: storedPhoneNumber,
                    answersArray: finalAnsListArray,
                }
            );
            getTasteData(storedPhoneNumber);
            setAnsListArray([])
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Error while saving data:", error);
            alert("Something went wrong!")
        }
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

    const showDrawer = () => {
        setOpenDrawer(true)
        // navigation.navigate("Drawer")
        navigation.dispatch(DrawerActions.openDrawer())
    }
    const filterData = useSelector((state) => state.filter);
    const handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            backHandler.remove();
        };
    }, []);
    //add font-family
    useEffect(() => {
        // call for reset selected tag in redux state
        dispatch(setInitialTagArray())

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

    const goToWatchReel = () => {

        navigation.navigate('Feed');
    }

    const selectCategoryItem = (category) => {
        dispatch(toggleSelection(category))
        const updatedData = dataArr.map((item) =>
            item.category === category ? { ...item, selected: !item.selected } : item
        );
        setDataArr(updatedData)
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Pressable onPress={showDrawer}>
                    <Image
                        source={require('../../../assets/tastes/ImagePersonData.png')}
                        resizeMode='contain'
                        style={{ width: 36, height: 36 }}
                    />
                </Pressable>
                {/* <View style={styles.textContainer}>
                <Text style={styles.Helptext}>Help the</Text>
                <Text style={styles.Indulgetext}>Indulge AI serve you better</Text>
            </View> */}
            </View>
            <View style={styles.categoriesContainer}>
                <Pressable
                    onPress={() => {
                        setFocusedElement('Category');
                        setShowCategory(true);
                    }}
                    onFocus={() => setFocusedElement('Category')}
                    onBlur={() => setFocusedElement(null)}>
                    <Text style={[styles.categoryText, focusedElement === 'Category' && styles.focusedText]}>Category</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setFocusedElement('Tastes');
                        setShowTastes(true);
                    }}
                    onFocus={() => setFocusedElement('Tastes')}
                    onBlur={() => setFocusedElement(null)}>
                    <Text style={[styles.tasteText, focusedElement === 'Tastes' && styles.focusedText]}>Tastes</Text>
                </Pressable>
            </View>
            {focusedElement === 'Category' && (
                <View style={{ marginLeft: '8%' }}>
                    <Image source={require('../../../assets/tastes/focusLine.png')} />
                </View>
            )}
            {focusedElement === 'Tastes' && (
                <View style={{ marginLeft: '46%' }}>
                    <Image source={require('../../../assets/tastes/focusLine.png')} />
                </View>
            )}
            <View>
                <Image source={require('../../../assets/tastes/HorizontalLine.png')} />
            </View>
            {focusedElement === 'Category' && showCategory && (
                <FlatList
                    data={dataArr}
                    renderItem={({ item }) => <FilterList setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} goToWatchReel={goToWatchReel} item={item} selectCategoryItem={selectCategoryItem} />}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    contentContainerStyle={styles.flatListContainerStryle}
                />
            )}
            {focusedElement === 'Tastes' && showTastes && (
                <FlatList
                    data={allUserDetails}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <QuestionAsnwerList
                        item={item}
                        showDatePicker={showDatePicker}
                        hideDatePicker={hideDatePicker}
                        updateAnswerByIndex={updateAnswerByIndex}
                        handleConfirm={handleConfirm}
                        isDatePickerVisible={isDatePickerVisible}
                        removeClippedSubviews={false}
                        nestedScrollEnabled
                    />
                    }
                    ListEmptyComponent={() => (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )}
                    contentContainerStyle={styles.flatListContainerStryleForTaste}
                />
            )}
            <Divider style={{ marginTop: 1 }} />
            {filterData?.length > 0 && focusedElement === 'Category' && showCategory && <Pressable
                onPress={() => goToWatchReel()}
                style={styles.saveButtonForFilterContainer}>
                <Text style={styles.saveButtonForFilterText} >
                    Save
                </Text>
            </Pressable>}
            {ansListArray?.length > 0 && focusedElement === 'Tastes' && showCategory && <Pressable
                onPress={() => saveData()}
                style={styles.saveButtonForFilterContainer}>
                <Text style={styles.saveButtonForFilterText} >
                    Save
                </Text>
            </Pressable>}
            {/* <View style={styles.homeScreen}>
                <HomeScreen />
            </View> */}
        </View>
    )
}

export default TastesScreen

