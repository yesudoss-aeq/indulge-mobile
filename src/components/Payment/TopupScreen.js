import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Modal, Alert } from 'react-native';
// import * as Font from 'expo-font';
// import fontName from '../../../assets/drawer/payment/PFBeauSansPro-Reg_0.ttf'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import fontBold from '../../../assets/drawer/payment/PFBeauSansPro-Bold_0.ttf'
import axios from "axios";
// import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePaymentSheet, initPaymentSheet } from '@stripe/stripe-react-native';

const TopupScreen = () => {
    const [isFontLoaded, setFontLoaded] = useState(false);
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState('option1');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [addedAmount, setAddedAmount] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [expiryDate, setExpiryDate] = useState('');
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const { presentPaymentSheet } = usePaymentSheet();


    const fetchPaymentSheetParams = async (amount) => {
        console.log("amount:::", amount)

        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token, "token data")
            // const parseToken = JSON.parse(token);
            // console.log("token::", parseToken.token)
            const phoneNumber = Number(storedPhoneNumber);
            const response = await axios.post(
                'https://www.indulge.blokxlab.com/add-funds',
                {
                    amount,
                    mobile_no: phoneNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("response:::", response)
            const paymentIntent = response.data.client_secret;
            const customerId = response.data.customer_id
            console.log(customerId, "customerId")
            return {
                paymentIntent, customerId
            };
        } catch (error) {
            console.error('Error fetching payment sheet params:', error);
            throw error;
        }
    };

    // async function handleProceed() {
    //     try {
    //         const amountValue = parseInt(enteredAmount);
    //         const { paymentIntent, customerId } = await fetchPaymentSheetParams(amountValue);
    //         console.log("paymentIntent,customerId:::", paymentIntent, customerId)
    //         if (paymentIntent) {
    //             const { error } = await initPaymentSheet({
    //                 paymentIntentClientSecret: paymentIntent,
    //                 merchantDisplayName: 'Example Inc',
    //                 allowsDelayedPaymentMethods: true,
    //                 returnURL: 'www.google.com',
    //                 paymentAmount: amountValue * 100,
    //             });

    //             if (error) {
    //                 console.error('Error initializing payment sheet:', error);
    //                 Alert.alert('Payment Error', 'Failed to process payment.');
    //             } else {
    //                 const { error: presentError } = await presentPaymentSheet();
    //                 if (presentError) {
    //                     console.error('Error presenting payment sheet:', presentError);
    //                     Alert.alert('Payment Error', 'Failed to process payment.');
    //                 } else {
    //                     Alert.alert('Payment Success', 'The payment was successful.');

    //                     const response = await updateWalletBalance(amountValue, customerId);

    //                     console.log(response,"data")
    //                     if (response) {
    //                         setWalletBalance(response.data.customer_balance);
    //                     }
    //                 }
    //             }
    //         } else {
    //             console.error('Payment intent not retrieved');
    //             Alert.alert('Error', 'Failed to process payment.');
    //         }
    //     } catch (error) {
    //         console.error('Error handling payment:', error);
    //         Alert.alert('Error', 'Failed to process payment.');
    //     }
    // }
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    const openPaymentSheet = async (paymentIntent, customerId, amountValue) => {
        console.log('Inside openPaymentSheet: paymentIntent is: ', paymentIntent);
        if (!paymentIntent) {
            return;
        }
        console.log('Come this far 1');
        try {
            console.log('Come this far 2');
            const { error: presentError } = await presentPaymentSheet({ clientSecret: paymentIntent }); // Fails here...
            console.log('Come this far presentError 3', presentError);

            if (presentError) {
                console.log('Error presenting payment sheet2222:', presentError);
                Alert.alert('Payment Error', 'Failed to process payment.');
            } else {
                Alert.alert('Payment Success', 'The payment was successful.');

                const response = await updateWalletBalance(amountValue, customerId);
                if (response) {
                    setWalletBalance(response.data.customer_balance);
                }
            }
        } catch (err) {
            console.log('openPaymentSheet err is: ', err);
        }

        console.log('Come this far 4');
    };
    async function handleProceed() {
        const token = await AsyncStorage.getItem('token');

        try {
            // Validation: Check if enteredAmount is a positive number
            const amountValue = parseFloat(enteredAmount);
            if (isNaN(amountValue) || amountValue <= 0) {
                Alert.alert('Invalid Amount', 'Please enter a valid amount.');
                return;
            }

            // Continue with the payment process
            const { paymentIntent, customerId } = await fetchPaymentSheetParams(amountValue);
            console.log("paymentIntent,customerId:::", paymentIntent, customerId);

            if (paymentIntent) {
                // const { error, paymentOption }
                const result = await initPaymentSheet({
                    paymentIntentClientSecret: paymentIntent,
                    merchantDisplayName: 'Example Inc',
                    allowsDelayedPaymentMethods: true,
                    returnURL: 'https://www.google.com',
                    paymentAmount: amountValue * 100,
                    customerId: customerId,
                    customFlow: true
                    // customerEphemeralKeySecret: 
                });

                console.log('Error initializing payment sheet1111000:====', result, "====paymentOption:::",);
                await sleep(2000);

                if (result.error) {
                    console.log('Error initializing payment sheet1111:', result.error);
                    Alert.alert('Payment Error', 'Failed to process payment.');
                } else {
                    console.log('Error initializing in elseelseelse', result.error);
                    const { error: presentError } = await presentPaymentSheet()
                    // clientSecret: paymentIntent,
                    // paymentMethodParams: {
                    //     type: 'card',
                    //     card: {
                    //         token: 'CARD_TOKEN',
                    //     },
                    // },
                    // billingDetails: {
                    //     name: 'John Doe',
                    //     email: 'john@example.com',
                    //     address: {
                    //         line1: '123 Main St',
                    //         city: 'Anytown',
                    //         state: 'CA',
                    //         postalCode: '12345',
                    //         country: 'US',
                    //     },
                    // },
                    //     onPresented: () => {
                    //         console.log('Payment sheet presented successfully');
                    //     },
                    //     onDismissed: () => {
                    //         console.log('Payment sheet dismissed');
                    //     },
                    // });

                    // openPaymentSheet(paymentIntent, customerId, amountValue)
                    // const { error: presentError } = await presentPaymentSheet();
                    // const { error: presentError } = await presentPaymentSheet({
                    //     clientSecret: paymentIntent,
                    //     paymentMethodParams: {
                    //         // Set the payment method type and token
                    //         type: 'card', // This can be 'card' for card payments
                    //         card: {
                    //             token: `Bearer ${token}`, // Replace with the payment method token
                    //         },
                    //     },
                    // });
                    // console.log('Error presenting payment sheet222211111:', presentError);

                    if (presentError) {
                        console.log('Error presenting payment sheet2222:', presentError);
                        Alert.alert('Payment Error', 'Failed to process payment.');
                    } else {
                        Alert.alert('Payment Success', 'The payment was successful.');

                        const response = await updateWalletBalance(amountValue, customerId);
                        if (response) {
                            setWalletBalance(response.data.customer_balance);
                        }
                    }
                }
            } else {
                console.error('Payment intent not retrieved');
                Alert.alert('Error', 'Failed to process payment.');
            }
        } catch (error) {
            console.error('Error handling payment:', error);
            Alert.alert('Error', 'Failed to process payment.');
        }
    }

    const updateWalletBalance = async (amount, customerId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const phoneNumber = Number(storedPhoneNumber);
            console.log('Token:', token);
            console.log('Phone Number:', phoneNumber);
            console.log('Customer ID:', customerId);
            console.log('Amount:', amount);
            const response = await axios.post("https://www.indulge.blokxlab.com/update-balance", {
                mobile_no: phoneNumber,
                customer_id: customerId,
                amount: amount,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.customer_balance, "responseeeeeeeeeeeeeeeeeeeee")
            if (response.data.customer_balance) {
                fetchWalletBalance();
            } else {
                Alert.alert("Wallet Balance not updated");
            }


        } catch (error) {
            console.error('Error updating wallet balance:', error);
            Alert.alert('Error', 'Failed to update wallet balance.');
        }
    };


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

    const handleDateChange = (date) => {
        const selectedDate = new Date(date);
        const formattedDate = `${selectedDate.toLocaleString('default', { month: 'short' })} ${selectedDate.getFullYear()}`;
        setExpiryDate(formattedDate);
        setShowDatePicker(false);
    };

    const closeDatePicker = () => {
        setShowDatePicker(false);
    };


    useEffect(() => {


        fetchWalletBalance();
    }, []);

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
                console.log(response.data.customer_balance, "getwalletbalance")
                const updatedBalance = response.data.customer_balance;
                setWalletBalance(updatedBalance);
            } else {
                console.error('Stored phone number is undefined');
                Alert.alert('Error', 'Stored phone number is undefined');
            }
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
            Alert.alert('Error', 'Failed to fetch wallet balance.');
        }
    };


    //add font-family
    useEffect(() => {
        // const loadFont = async () => {
        //     await Font.loadAsync({
        //         'YourFont-Regular': fontName,
        //         'YourFont-Bold': fontBold
        //     });
        //     setFontLoaded(true);
        // };
        // loadFont();
    }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }
    const handleBack = () => {
        navigation.navigate("Drawer")
    }
    console.log(walletBalance, "walletbalance")
    return (
        <View style={styles.container}>
            {/* <View style={{ flexDirection: 'row', marginTop: '12%' }}>
                <Pressable onPress={handleBack}>
                    <Image source={require('../../../assets/drawer/payment/Back1.png')} style={{ marginLeft: '10%' }} />
                </Pressable>
                <Text style={styles.topupBalanceText}> Top up Balance</Text>
            </View> */}
            <Text style={{ textAlign: 'center', padding: 20 }}>
                <Text style={[styles.text1, { marginBottom: 10 }]}>Your current wallet balance is </Text>
                {"\n"}
                <Text style={styles.text2}>₹ {walletBalance}</Text>
            </Text>

            <Text style={styles.text3}>Would you like to top it now?</Text>
            {/* <View style={{ alignItems: 'center', justifyContent: 'center',padding:5}}>
                <Pressable style={styles.gpayButton}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../assets/drawer/payment/Gpay.png')} style={styles.gpayLogo} />
                        <Text style={styles.gpayText}>Google Pay</Text>
                    </View>
                </Pressable>
            </View> */}
            {/* <View style={{ alignItems: 'center', justifyContent: 'center', padding:5}}>
                <Pressable style={styles.gpayButton}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../assets/drawer/payment/Paypal.png')} style={styles.paypalLogo} />
                        <Text style={styles.gpayText}>Paypal</Text>
                    </View>
                </Pressable>
            </View> */}
            <View style={{ backgroundColor: '#282828', width: 333, height: 490, marginTop: '3%', borderRadius: 10, alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/drawer/payment/masterCard.png')} style={styles.masterCardLogo} />
                    <Text style={styles.gpayText}>Credit/Debit Card</Text>
                </View>
                {/* <Text style={styles.text1}>Card Number</Text>
                <TextInput
                    style={styles.textInput1}
                    placeholder='for Indulge Wallet'
                    placeholderTextColor={'#7A7A7A'}
                /> */}
                {/* <Text style={styles.text1}>Expiry Date</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={styles.textInput1}
                            placeholder='Select Expiry Date'
                            placeholderTextColor={'#7A7A7A'}
                            editable={false}
                            value={expiryDate}
                            selectionColor="#FFFFFF"
                        />
                    </View>
                </Pressable >
                <Modal
                    visible={showDatePicker}
                    transparent={true}
                    animationType='slide'
                    onRequestClose={closeDatePicker}
                >
                    <View style={styles.datePickerModal}>
                        <View style={styles.datePickerContainer}>
                            <DateTimePicker
                                isVisible={showDatePicker}
                                mode='date'
                                onConfirm={handleDateChange}
                                onCancel={closeDatePicker}
                            />
                        </View>
                    </View>
                </Modal> */}
                {/* <Text style={styles.text1}>CVV</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={styles.textInput1}
                        placeholder='01234567890'
                        placeholderTextColor={'#7A7A7A'}
                    />
                </View> */}
                <Text style={styles.text1}>Amount</Text>
                <TextInput
                    style={styles.textInput1}
                    placeholder='₹'
                    placeholderTextColor={'#7A7A7A'}
                    value={enteredAmount}
                    onChangeText={(text) => setEnteredAmount(text)}
                />
                <View style={styles.radioGroup}>
                    {/* <View style={styles.radioButton}>
                        <RadioButton
                            value="option1"
                            status={selectedValue === 'option1' ?
                                'checked' : 'unchecked'}
                            onPress={() => setSelectedValue('option1')}
                            color="#C4963D"
                        />
                        <Text style={styles.radioLabel}>
                            NEFT
                        </Text>
                    </View> */}
                    {/* <View style={styles.radioButton}>
                        <RadioButton
                            value="option2"
                            status={selectedValue === 'option2' ?
                                'checked' : 'unchecked'}
                            onPress={() => setSelectedValue('option2')}
                            color="#C4963D"
                        />
                        <Text style={styles.radioLabel}>
                            IMPS
                        </Text>
                    </View> */}
                    {/* <View style={styles.radioButton}>
                        <RadioButton
                            value="option3"
                            status={selectedValue === 'option3' ?
                                'checked' : 'unchecked'}
                            onPress={() => setSelectedValue('option3')}
                            color="#C4963D"
                        />
                        <Text style={styles.radioLabel}>
                            RTGS
                        </Text>
                    </View> */}
                </View>
                <Pressable style={styles.proceedButtonContainer} onPress={handleProceed}>
                    <Text style={styles.loginButtonText}>Proceed</Text>
                </Pressable>
            </View>
        </View >
    )
}
export default TopupScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    topupBalanceText: {
        color: '#FFFFFF',
        marginLeft: '10%',
        fontSize: 15,
        fontFamily: 'YourFont-Regular',
    },
    text1: {
        color: '#D9D9D9',
        fontFamily: 'YourFont-Regular',
        fontSize: 13,
        fontWeight: '400',

    },
    text2: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'YourFont-Regular',
    },
    text3: {
        color: '#7C7C7C',
        padding: 5,
        // marginTop: '5%',
        fontFamily: 'YourFont-Regular',
        fontSize: 12,
        marginLeft: '5%'
    },
    gpayButton: {
        backgroundColor: '#282828',
        width: 333,
        height: 50,
        borderRadius: 10
    },
    gpayLogo: {
        width: 40,
        height: 15,
        marginTop: '5%',
        marginLeft: '5%'
    },
    gpayText: {
        color: '#FFFFFF',
        fontFamily: 'YourFont-Regular',
        fontSize: 13,
        marginTop: '5%',
        marginLeft: '3%'
    },
    paypalLogo: {
        width: 16,
        height: 17.28,
        marginTop: '5%',
        marginLeft: '5%'
    },
    masterCardLogo: {
        marginTop: '5%',
        marginLeft: '5%'
    },
    text1: {
        color: '#FFFFFF',
        fontFamily: 'YourFont-Regular',
        marginTop: '5%',
        marginLeft: '5%'
    },
    textInput1: {
        backgroundColor: '#3D3C3C',
        width: 294,
        height: 40,
        borderRadius: 20,
        marginLeft: '4%',
        marginTop: '2%',
        paddingLeft: 15,
        fontFamily: 'YourFont-Regular',
        fontSize: 12,
        color: "#FFFFFF",

    },
    radioGroup: {
        flexDirection: 'row',
        marginRight: '30%',
        marginTop: '3%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'YourFont-Regular',
    },
    loginButton: {
        backgroundColor: '#C4963D',
        marginLeft: '5%',
        width: 144,
        height: 42,
        borderRadius: 200
    },
    proceedButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '7%',
        backgroundColor: '#C4963D',
        marginHorizontal: '20%',
        padding: 10,
        borderRadius: 20
    },
    loginButtonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#010101',
        fontFamily: 'YourFont-Regular'

    },
    datePickerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    datePickerContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
    },
})