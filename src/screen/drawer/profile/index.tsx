import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Image, Text, Pressable, Modal, StyleSheet, Dimensions, FlatList, Alert, BackHandler, PermissionsAndroid } from "react-native";
// import * as ImagePicker from 'expo-image-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

// import { Camera } from 'expo-camera';
import { Camera, useCameraPermission } from 'react-native-vision-camera'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const { width } = Dimensions.get('window');
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './style'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState(require('../../../../assets/drawer/ProfileImageData.png'));
    const [showModalVisible, setShowModalVisible] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0)
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const [focusedElement, setFocusedElement] = useState('Personal');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('13 January');
    const [selectedStatus, setSelectedStatus] = useState('Married');
    const statusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
    const [selectedChildren, setSelectedChildren] = useState('2');
    const childrenOptions = ['0', '1', '2', '3', '4+'];
    const [childrenModalVisible, setChildrenModalVisible] = useState(false);
    const [imagePermissionResult, setImagePermissionResult] = useState(false);
    const [isPhotoSelected, setIsPhotoSelected] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Enter Name',
        age: 'Enter Age',
        relationStatus: 'Single',
        numberOfChildren: '0',
        birthday: 'Enter Birthday',
    });
    const { hasPermission, requestPermission } = useCameraPermission()

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        const formattedDate = formatDate(date);
        setSelectedDate(formattedDate);
        // setProfileData((item) => {...item, birthday: formattedDate});
        setProfileData((prevData) => ({
            ...prevData,
            birthday: formattedDate,
        }));
    };


    const formatDate = (date) => {
        return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
    };


    const getMonthName = (monthIndex) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    };


    const toggleModal = () => {
        setShowModalVisible(!showModalVisible);
    };

    const handleStatusSelection = (status) => {
        setSelectedStatus(status);
        setProfileData((prevData) => ({
            ...prevData,
            relationStatus: status,
        }));
        toggleModal();
    };



    const renderStatusOption = ({ item }) => {
        return (
            <Pressable onPress={() => handleStatusSelection(item)}>
                <Text style={{ padding: 10, fontSize: 18 }}>{item}</Text>
            </Pressable>
        );
    };

    const toggleShowModal = () => {
        setChildrenModalVisible(!childrenModalVisible);
    };

    const handleChildrenSelection = (children) => {
        setSelectedChildren(children);
        setProfileData((prevData) => ({
            ...prevData,
            numberOfChildren: children,
        }));
        toggleShowModal();
    };

    const renderChildrenOption = ({ item }) => {
        return (
            <Pressable onPress={() => handleChildrenSelection(item)}>
                <Text style={{ padding: 10, fontSize: 18 }}>{item}</Text>
            </Pressable>
        );
    };
    const handleBackButton = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            backHandler.remove();
        };
    }, []);
    //stored phone number
    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };

        getPhoneNumber();
    }, []);

    //get-wallet-balance api
    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber) {
                    const response = await axios.get("https://www.indulge.blokxlab.com/get-wallet-balance", {
                        params: {
                            mobile_no: storedNumber,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const updatedBalance = response.data.customer_balance;
                    setWalletBalance(updatedBalance || 0);
                } else {
                    console.error('Stored phone number is undefined');
                    Alert.alert('Error', 'Stored phone number is undefined');
                }
            } catch (error) {
                console.error('Error fetching wallet balance:', error);
                Alert.alert('Error', 'Failed to fetch wallet balance.');
            }
        };

        fetchWalletBalance();
    }, []);

    const handleBackDrawerScreen = () => {
        navigation.navigate('Drawer')
        setShowSaveButton(false);
    }

    useEffect(() => {
        loadProfilePicture();
    }, []);

    const loadProfilePicture = async () => {
        try {
            const uri = await AsyncStorage.getItem('profilePictureURI');
            if (uri) {
                setProfilePicture({ uri });
                setIsPhotoSelected(true);
            }
        } catch (error) {
            console.error('Error loading profile picture:', error);
        }
    };

    //choose photo from camera
    const handleCaptureImage = async () => {
        hideModal();

        // const { status } = await Camera.requestCameraPermissionsAsync();
        if (!hasPermission) {
            requestPermission()
            // alert("Allow camera permission first? for upload profile image")
        } else {
            const result = await ImagePicker.launchCamera({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const selectedImage = result.assets[0];
                setProfilePicture({ uri: selectedImage.uri })
                try {
                    await AsyncStorage.setItem('profilePictureURI', selectedImage.uri);
                } catch (error) {
                    console.error('Error saving profile picture:', error);
                }
            }
        }
        setIsPhotoSelected(true);
        setShowSaveButton(true);
    };

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Permission title",
                    message:
                        "Permission message",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the EXTERNAL_STORAGE");
                setImagePermissionResult(true)
            } else {
                setImagePermissionResult(false)
                console.log("EXTERNAL_STORAGE permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    //Choose photo from gallery
    const handleSelectProfileImage = async () => {
        hideModal();
        // const imagePermissionResult = true // await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (imagePermissionResult) {
            const result = await ImagePicker.launchImageLibrary({
                mediaTypes: 'image',
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const selectedImage = result.assets[0];
                setProfilePicture({ uri: selectedImage.uri })

                try {
                    await AsyncStorage.setItem('profilePictureURI', selectedImage.uri);
                    console.log(selectedImage.uri, "image")
                } catch (error) {
                    console.error('Error saving profile picture:', error);
                }
            }
        } else {
            requestStoragePermission()
        }
        setIsPhotoSelected(true);
        setShowSaveButton(true);
    };

    const showModal = () => {
        setModalVisible(true)
    }

    const hideModal = () => {
        setModalVisible(false)
    }

    const saveProfilePicture = async () => {
        try {
            const storedNumber = await AsyncStorage.getItem('phoneNumber');
            const profilePictureURI = await AsyncStorage.getItem('profilePictureURI');
            if (profilePictureURI && storedNumber) {
                await uploadProfilePicture(storedNumber, profilePictureURI);
            }

            if (isEditing) {
                await updateProfileAPI(storedNumber, selectedDate, selectedStatus, selectedChildren);
            }

            await fetchProfileDetails();
            setShowSaveButton(false);
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };

    // upload-profile-picture api
    const uploadProfilePicture = async (mobileNumber, uri) => {
        const formData = new FormData();
        formData.append('profilePicture', {
            uri,
            type: 'image/jpeg',
            name: 'profile_picture.jpg',
        });

        try {
            const response = await axios.post(
                `https://www.indulge.blokxlab.com/upload-profile-picture?mobile_no=${mobileNumber}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Profile picture uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    // save button
    const renderSaveButton = () => {
        if ((isPhotoSelected && showSaveButton) || isEditing) {
            return (
                <Pressable
                    style={{ backgroundColor: '#D39F3A', width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}
                    onPress={saveProfilePicture}>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'YourFont-Regular' }}>Save</Text>
                </Pressable>
            );
        }
        return null;
    };

    // press edit icon
    const handleEditIconPress = () => {
        setIsEditing(!isEditing);
        setShowSaveButton(true);
    };


    // edit-profile api
    const updateProfileAPI = async (mobileNumber, birthday, relationStatus, children) => {
        try {
            const response = await axios.post(
                `https://www.indulge.blokxlab.com/edit-profile`,
                {
                    mobile_no: mobileNumber,
                    birthday: birthday,
                    Relation_status: relationStatus,
                    Children: children,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Profile updated through API:', response.data.userUpdate.profile_section);
        } catch (error) {
            console.error('Error updating profile through API:', error);
        }
    };

    useEffect(() => {
        if (isEditing) {
            updateProfileAPI(storedPhoneNumber, selectedDate, selectedStatus, selectedChildren);
        }
    }, [isEditing]);


    useEffect(() => {
        fetchProfileDetails();
    }, [isEditing]);

    // get-profile-details api
    const fetchProfileDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const storedNumber = await AsyncStorage.getItem('phoneNumber');
            if (storedNumber) {
                const response = await axios.get("https://www.indulge.blokxlab.com/get-profile-details", {
                    params: {
                        mobile_no: storedNumber,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { name, age, Relation_status, number_of_children, birthdate } = response.data;
                console.log(response.data, "profile response");
                setProfileData({
                    name: name || 'Enter Name',
                    age: age || 'Enter Age',
                    relationStatus: Relation_status || 'Single',
                    numberOfChildren: number_of_children || '0',
                    birthday: birthdate || 'Enter Birthday',
                });
            } else {
                console.error('Stored phone number is undefined');
            }
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
            {/* <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10%', marginLeft: '5%' }} onPress={handleBackDrawerScreen}>
                <Image source={require('../../../../assets/intro/WhiteBackArrow.png')} style={{ marginRight: 15 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'YourFont-Regular', }}>Profile Edit</Text>
            </Pressable> */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ padding: 15, position: 'relative' }}>
                    <Pressable >
                        <Image source={profilePicture} style={{ marginBottom: 20, width: 124, height: 124, borderRadius: 32, resizeMode: 'contain' }} />
                    </Pressable>
                    <Pressable onPress={showModal} style={{ position: 'absolute', left: '80%', top: 100 }}>
                        <Image source={require('../../../../assets/drawer/CameraImage.png')} />
                    </Pressable>
                </View>
                {/* <View style={{ alignItems:'center',justifyContent:'center'}}>
          <Text style={{ color: '#8E93A6', fontSize: 16, fontFamily: 'YourFont-Regular', }}>Wallet</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'YourFont-Regular', }}>₹ {walletBalance}</Text>
        </View> */}
            </View>
            {/* Modal */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={isModalVisible}
                onRequestClose={hideModal}>
                <View style={styles.modalContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.profilePicture}>Upload Profile</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '15%', justifyContent: 'space-between' }}>
                        <Pressable style={{ marginLeft: '20%', alignItems: 'center', justifyContent: 'center' }} onPress={handleCaptureImage} >
                            <Image source={require('../../../../assets/drawer/UploadCameraPic.png')} style={{ width: 55, height: 55 }} />
                            <Text style={{ marginTop: '15%', fontSize: 15, fontWeight: '500', fontFamily: 'YourFont-Regular', }}>Take a Photo</Text>
                        </Pressable>

                        <Pressable style={{ marginRight: '16%', alignItems: 'center', justifyContent: 'center' }} onPress={handleSelectProfileImage}>
                            <Image source={require('../../../../assets/drawer/Gallery.png')} style={{ width: 55, height: 55 }} />
                            <Text style={{ marginTop: '15%', fontSize: 15, fontWeight: '500', fontFamily: 'YourFont-Regular' }}>Photo Gallery</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.categoriesContainer}>
                <Pressable
                    onPress={() => setFocusedElement('Personal')}
                    onFocus={() => setFocusedElement('Personal')}
                    onBlur={() => setFocusedElement(null)}>
                    <Text style={[styles.categoryText, focusedElement === 'Personal' && styles.focusedText]}>Personal Info</Text>
                </Pressable>
            </View>
            {focusedElement === 'Personal' && (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../../../assets/drawer/focusLine.png')} />
                </View>
            )}
            <View style={{ backgroundColor: '#272727', flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <View style={{ marginTop: '2%' }}>
                    <Text style={{ color: '#B6B6B6', fontSize: 18, fontFamily: 'YourFont-Regular', left: 30, textAlign: 'left', marginBottom: 5 }}>Name</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'YourFont-Regular', left: 30, fontWeight: '900', textAlign: 'left' }}>{profileData.name}</Text>
                    <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={{ width: '93%', top: 10, left: 10 }} resizeMode="contain" />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: '#B6B6B6', fontSize: 18, fontFamily: 'YourFont-Regular', left: 30, marginBottom: 5 }}>Mobile No</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'YourFont-Regular', left: 30, fontWeight: '900' }}>+91 {storedPhoneNumber}</Text>
                    <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={{ width: '93%', top: 10, left: 10 }} resizeMode="contain" />
                </View>
                {/* <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#B6B6B6', fontSize: 18, fontFamily: 'YourFont-Regular', left: 30, marginBottom: 5 }}>Age</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'YourFont-Regular', left: 30, fontWeight: '900' }}>{profileData.age}</Text>
          <Image source={require('../assets/ProfileVectorLine.png')} style={{ width: '93%', top: 10, left: 10 }} resizeMode="contain" />
        </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#B6B6B6', fontSize: 18, fontFamily: 'YourFont-Regular', marginBottom: 5, left: 30 }}>Birthday</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'YourFont-Regular', fontWeight: '900', left: 30 }}>{profileData.birthday}</Text>
                        <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={{ width: '105%', top: 10, left: 10 }} resizeMode="contain" />
                    </View>
                    <Pressable style={{ marginRight: '5%' }} onPress={() => { showDatePicker(); handleEditIconPress(); }}>
                        <Image source={require('../../../../assets/drawer/EditImageIcon.png')} />
                    </Pressable>
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#B6B6B6', fontSize: 18, fontFamily: 'YourFont-Regular', marginBottom: 5, left: 30 }}>Relation Status</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'YourFont-Regular', fontWeight: '900', left: 30 }}>{profileData.relationStatus}</Text>
                        <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={{ width: '105%', top: 10, left: 10 }} resizeMode="contain" />
                    </View>
                    <Pressable style={{ marginRight: '5%' }} onPress={() => { toggleModal(); handleEditIconPress(); }}>
                        <Image source={require('../../../../assets/drawer/EditImageIcon.png')} />
                    </Pressable>
                    <Modal visible={showModalVisible} transparent animationType="slide" >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                                <FlatList
                                    data={statusOptions}
                                    renderItem={renderStatusOption}
                                    keyExtractor={(item) => item}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#B6B6B6', fontSize: 18, fontFamily: 'YourFont-Regular', marginBottom: 5, left: 30 }}>Children</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'YourFont-Regular', fontWeight: '900', left: 30 }}>{profileData.numberOfChildren}</Text>
                        <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={{ width: '105%', top: 10, left: 10 }} resizeMode="contain" />
                    </View>
                    <Pressable style={{ marginRight: '5%' }} onPress={() => { toggleShowModal(); handleEditIconPress(); }}>
                        <Image source={require('../../../../assets/drawer/EditImageIcon.png')} />
                    </Pressable>
                    <Modal visible={childrenModalVisible} transparent animationType="slide">
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                                <FlatList
                                    data={childrenOptions}
                                    renderItem={renderChildrenOption}
                                    keyExtractor={(item) => item}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 100 }}>
                    {profilePicture && <Image source={{ uri: profilePicture.uri }} />}
                    {renderSaveButton()}
                </View>
            </View>
        </View>
    )
}
export default ProfileScreen;
