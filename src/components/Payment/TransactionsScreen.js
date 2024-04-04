import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
// import * as Font from 'expo-font';
// import fontName from '../../../assets/drawer/payment/PFBeauSansPro-Reg_0.ttf'
// import fontBold from '../../../assets/drawer/payment/PFBeauSansPro-Bold_0.ttf'
import { useNavigation } from '@react-navigation/native';

const TransactionsScreen = () => {
    const [isFontLoaded, setFontLoaded] = useState(false);

    const navigation =useNavigation();

    
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

    const handleWalletSummeryScreen = () => {
        navigation.navigate('WalletSummery');
    }
    return (
        <View style={styles.container} >
            <View style={{ alignItems: 'flex-end' }}>
                <Image style={styles.notificationIcon} source={require("../../../assets/drawer/payment/Notification-icon.png")} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                <Pressable onPress={handleWalletSummeryScreen}>
                    <Image source={require('../../../assets/drawer/payment/Back1.png')} style={{ marginLeft: '15%' }} />
                </Pressable>
                <Text style={styles.transactionsText}>Transactions</Text>
                <Image source={require('../../../assets/drawer/payment/searchIcon.png')} style={styles.searchIcon} />
            </View>
            <Text style={styles.date}>May 2022</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.amount}>Rs. 15,550</Text>
                <Pressable style={{ backgroundColor: '#1C1C1C', width: 126, height: 18, borderRadius: 20, marginTop: '2%', marginLeft: '25%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../assets/drawer/payment/downloadIcon.png')} style={styles.downloadIcon} />
                        <Text style={styles.downloadStatement}>Download Statement</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/drawer/payment/image1.png')} style={{ width: 44.56, height: 42, borderRadius: 5, marginTop: '3%', marginLeft: '3%' }} />
                    <Text style={{ marginTop: '2%', marginLeft: '4%' }}>
                        <Text style={styles.text1}>Emerald Pendant Set</Text>
                        {"\n"}
                        <Text style={styles.text2}>Luxury Goods</Text>
                        {"\n"}
                        <Text style={styles.text4}>20 May 2022</Text>
                    </Text>
                    <View style={{ marginTop: '3%', marginLeft: '20%' }}>
                        <Text style={styles.text3}>Rs. 5,025</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.invoiceText}>Invoice</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.card1}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/drawer/payment/ballon.png')} style={{ width: 44.56, height: 42, borderRadius: 5, marginTop: '3%', marginLeft: '3%' }} />
                    <Text style={{ marginTop: '2%', marginLeft: '4%' }}>
                        <Text style={styles.text1}>Cappadocia Hot Air Baloon</Text>
                        {"\n"}
                        <Text style={styles.text2}>Experience</Text>
                        {"\n"}
                        <Text style={styles.text4}>14 May 2022</Text>
                    </Text>
                    <View style={{ marginTop: '3%', marginLeft: '10%' }}>
                        <Text style={styles.text3}>Rs. 9,300</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.invoiceText}>Invoice</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.card1}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/drawer/payment/glass.png')} style={{ width: 44.56, height: 42, borderRadius: 5, marginTop: '3%', marginLeft: '3%' }} />
                    <Text style={{ marginTop: '2%', marginLeft: '4%' }}>
                        <Text style={styles.text1}>Tucson Restaurant</Text>
                        {"\n"}
                        <Text style={styles.text2}>Dining</Text>
                        {"\n"}
                        <Text style={styles.text4}>01 May 2022</Text>
                    </Text>
                    <View style={{ marginTop: '3%', marginLeft: '26%' }}>
                        <Text style={styles.text3}>Rs. 800</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.invoiceText}>Invoice</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.date1}>April 2022</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.amount}>Rs. 45,500</Text>
                <Pressable style={{ backgroundColor: '#1C1C1C', width: 126, height: 18, borderRadius: 20, marginTop: '2%', marginLeft: '25%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../assets/drawer/payment/downloadIcon.png')} style={styles.downloadIcon} />
                        <Text style={styles.downloadStatement}>Download Statement</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.card2}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/drawer/payment/birthdayCake.png')} style={{ width: 44.56, height: 42, borderRadius: 5, marginTop: '3%', marginLeft: '3%' }} />
                    <Text style={{ marginTop: '2%', marginLeft: '4%' }}>
                        <Text style={styles.text1}>Birthday Cake</Text>
                        {"\n"}
                        <Text style={styles.text2}>Special Request</Text>
                        {"\n"}
                        <Text style={styles.text4}>15 April 2022</Text>
                    </Text>
                    <View style={{ marginTop: '3%', marginLeft: '30%' }}>
                        <Text style={styles.text3}>Rs. 8,000</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.invoiceText}>Invoice</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.card1}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/drawer/payment/birthdayCake.png')} style={{ width: 44.56, height: 42, borderRadius: 5, marginTop: '3%', marginLeft: '3%' }} />
                    <Text style={{ marginTop: '2%', marginLeft: '4%' }}>
                        <Text style={styles.text1}>Dinner with Family</Text>
                        {"\n"}
                        <Text style={styles.text2}>Dining</Text>
                        {"\n"}
                        <Text style={styles.text4}>15 April 2022</Text>
                    </Text>
                    <View style={{ marginTop: '3%', marginLeft: '21%' }}>
                        <Text style={styles.text3}>Rs. 38,000</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.invoiceText}>Invoice</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )

}
export default TransactionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    notificationIcon: {
        tintColor: '#FFFFFF',
        marginTop: '8%',
        marginRight: '5%',
        width: 40,
        height: 40
    },
    transactionsText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'YourFont-Regular',
        textAlignVertical: 'center',
        marginLeft: '10%'
    },
    searchIcon: {
        marginLeft: '25%',
        marginTop: '2%'
    },
    date: {
        color: '#B6B6B6',
        fontFamily: 'YourFont-Regular',
        fontSize: 12,
        marginLeft: '5%',
        marginTop: '4%'
    },
    amount: {
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: '5%'
    },
    downloadIcon: {
        marginLeft: '5%',
        marginTop: '2%'
    },
    downloadStatement: {
        color: '#797979',
        fontSize: 9,
        marginTop: '3%',
        fontFamily: 'YourFont-Regular',
        marginLeft: '4%'
    },
    card: {
        borderRadius: 20,
        borderColor: "#282828",
        width: 333,
        height: 68.29,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "#282828",
        elevation: 5,
        backgroundColor: "#282828",
        marginTop: '12%',
    },
    text1: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'YourFont-Regular',
        fontWeight: '500'
    },
    text2: {
        color: '#C4963D',
        fontSize: 10,
        fontFamily: 'YourFont-Regular',
        fontWeight: '500',
        marginStart: '2%'
    },
    invoiceText: {
        color: '#C4963D',
        fontSize: 12,
        fontFamily: 'YourFont-Regular',
        alignItems: 'flex-end'
    },
    text3: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'YourFont-Regular',
    },
    text4: {
        color: '#A8A8A8',
        fontFamily: 'YourFont-Regular',
        fontSize: 12,
        lineHeight: 20
    },
    card1: {
        borderRadius: 20,
        borderColor: "#282828",
        width: 333,
        height: 68.29,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "#282828",
        elevation: 5,
        backgroundColor: "#282828",
        marginTop: '2%',
    },
    date1: {
        color: '#B6B6B6',
        fontFamily: 'YourFont-Regular',
        fontSize: 12,
        marginLeft: '5%',
        marginTop: '7%'
    },
    card2: {
        borderRadius: 20,
        borderColor: "#282828",
        width: 333,
        height: 68.29,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "#282828",
        elevation: 5,
        backgroundColor: "#282828",
        marginTop: '4%',
    }

})