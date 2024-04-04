import { Image, ImageBackground, StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import IndulgeAiStyle from './style'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../../Loader';

const IndulgeAiScreen = () => {
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const [storedToken, setStoredToken] = useState('');
    const [chatGptResponse, setChatGptResponse] = useState([]);
    const [showPrompts, setShowPrompts] = useState([true, true, true, true]);
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [prompts, setPrompts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const response = await axios.get('https://www.indulge.blokxlab.com/get-prompts');
                setPrompts(response.data);
                console.log(response.data, "prompt response")
            } catch (error) {
                console.error('Error fetching prompts:', error);
            }
        };

        fetchPrompts();
    }, []);

    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken !== null) {
                    setStoredToken(storedToken)
                }
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };
        getPhoneNumber();
    }, []);


    const sendChatGptRequest = async (prompt) => {
        try {
            setLoading(true);
            const apiUrl = "https://www.indulge.blokxlab.com/search";
            const data = {
                prompt: prompt,
                mobile_no: storedPhoneNumber,
            };

            console.log("data:::", data, storedToken)

            const response = await axios.post(apiUrl, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storedToken}`,
                },
            });
            console.log("response:::", response)
            if (response.status === 200) {
                setChatGptResponse(response.data.result.choices);
                // setSearchInput('');
            } else {
                console.error(
                    "ChatGPT API request failed with status:",
                    response.status
                );
            }
            console.log(response.data, "search data");
        } catch (error) {
            console.log("ERROR:::", error);

            if (axios.isAxiosError(error)) {
                console.error("Error with request:", error.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePromptClick = async (index: number, promptText: string) => {
        setSearchInput(promptText);
        const updatedPrompts = showPrompts.map((value, i) => i === index ? false : value);
        setShowPrompts(updatedPrompts);
        await sendChatGptRequest(promptText);
        setShowPrompts([true, true, true, true]);
    };

    return (
        <ImageBackground
            source={require('../../../assets/screen/ChatgptBackgroundScreen.png')}
            style={IndulgeAiStyle.backgroundImage}>
            <View style={IndulgeAiStyle.announcementContainer}>
                <Text style={IndulgeAiStyle.announcementText}>Announcing</Text>
                <Text style={IndulgeAiStyle.indulgeGptText}>INDULGE GPT</Text>
                <Text style={IndulgeAiStyle.indulgeText}>Utilize our automated engine to effortlessly{"\n"}craft itineraries, receive recommendations,{"\n"}and explore global product and service insights</Text>
            </View>
            <View style={IndulgeAiStyle.searchContainer}>
                <Image
                    source={require('../../../assets/screen/Search.png')}
                    style={IndulgeAiStyle.seachImage} />
                <TextInput
                    style={IndulgeAiStyle.search}
                    value={searchInput}
                    onChangeText={(text) => {
                        setSearchInput(text);
                    }}
                />
                <Pressable onPress={() => {
                    sendChatGptRequest(searchInput);
                }}>
                    <Image
                        source={require('../../../assets/screen/SendIcon.png')}
                        style={IndulgeAiStyle.sendIcon}
                    />
                </Pressable>
            </View>
            <View style={IndulgeAiStyle.promptsContainer}>
                <View style={IndulgeAiStyle.promptRow}>
                    {showPrompts[0] && (
                        <Text
                            style={IndulgeAiStyle.chatgptText}
                            onPress={() =>
                                handlePromptClick(
                                    0, prompts.prompt1
                                )
                            }
                        >
                            {prompts.prompt1}
                        </Text>
                    )}
                    {showPrompts[1] && (
                        <Text
                            style={IndulgeAiStyle.chatgptText1}
                            onPress={() =>
                                handlePromptClick(1, prompts.prompt2)
                            }
                        >
                            {prompts.prompt2}
                        </Text>
                    )}
                </View>
                <View style={IndulgeAiStyle.promptRow}>
                    {showPrompts[2] && (
                        <Text
                            style={IndulgeAiStyle.chatgptText2}
                            onPress={() =>
                                handlePromptClick(2, prompts.prompt3)
                            }
                        >
                            {prompts.prompt3}
                        </Text>
                    )}
                    {showPrompts[3] && (
                        <Text
                            style={IndulgeAiStyle.chatgptText3}
                            onPress={() =>
                                handlePromptClick(
                                    3,
                                    prompts.prompt4
                                )
                            }
                        >
                            {prompts.prompt4}
                        </Text>
                    )}
                </View>
            </View>
            <View style={IndulgeAiStyle.chatgptResponse}>
                {isLoading ? (<Loader />) : (
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <Text style={IndulgeAiStyle.chatgptResponseText}>
                                {chatGptResponse[0]?.message?.content}
                            </Text>
                        </ScrollView>
                    </View>
                )}

            </View>
            <View style={IndulgeAiStyle.concerienceContainer}>
                <Text style={IndulgeAiStyle.conciergeText}>Our Concierge service is on standby to deliver{"\n"}your chosen tastes.</Text>
            </View>

        </ImageBackground>
    )
}

export default IndulgeAiScreen

