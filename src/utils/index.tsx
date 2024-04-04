import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Dimensions } from "react-native";
export let PHONE_NUMBER = '';

export async function isLoggedIn() {
    let logIn = false
    try {
        const data = await AsyncStorage.getItem('token');
        console.log(data, "data")
        // if (data) {
        const storedTokens = JSON.parse(data);
        const tokensExist = storedTokens && storedTokens.length > 0;
        console.log(tokensExist, "tokenexist")

        logIn = tokensExist !== null ? true : false;
        // } else {
        //     logIn = false;
        // }
        return logIn;
    } catch (error) {
        console.error('Error retrieving data:', error);
        logIn = false;
        return logIn;
    }
    // return logIn;
}

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('screen').height;
const flowerStatuses = [
    "Orchids",
    "Roses",
    "Hydrangeas",
    "Peonies",
    "Dahlias",
    "Daffodils",
    "Other",
];
const statusOptions = [
    "Single",
    "Dating",
    "Married",
    "Choose not to say"
];
const travelStatuses = ["Every Week", "Holiday Season", "Every Month", "Other"];
const stayStatuses = ["Modern Hotels", "Heritage Hotels", "Boutique Hotels"];
const preferStatuses = ["Window Seat", "Aisle Seat", "Center Seat"];
const foodStatuses = ["Vegetarian", "Non-Vegetarian"];
const dietStatuses = [
    "Not on a diet",
    "Keto",
    "Intermittent Fasting",
    "Vegan",
    "Paleo",
    "Dash",
    "Raw Food Diet",
];
const coffeeStatuses = [
    "Arabica",
    "Robusta",
    "Latte",
    "Cappuccino",
    "Americano",
    "Espresso",
    "Doppio",
    "Filter",
    "Other",
];
const languageStatuses = [
    "French",
    "Chinese",
    "Japanese",
    "Indian",
    "Italian",
    "Greek",
    "Spanish",
    "Mediterranean",
    "Lebanese",
    "Moroccan",
    "Thai",
    "Turkish",
    "English",
    "Other",
];
const tasteData = [
    { "index": 1, "answer": "", "question": "You are a" },
    { "index": 2, "answer": "", "question": "You were born on" },
    { "index": 3, "answer": "", "question": "Your marital status", "optionsArray": statusOptions },
    { "index": 4, "answer": "", "question": "Are you a pet parent? What is their name?" },
    { "index": 5, "answer": "", "question": "What is your favourite sport?" },
    { "index": 6, "answer": "", "question": "The BEST brand according to you is.....?" },
    { "index": 7, "answer": "", "question": "The Designer you ADORE..." },
    { "index": 8, "answer": "", "question": "One Book that you recommend everyone" },
    { "index": 9, "answer": "", "question": "The country you want to escape to?" },
    { "index": 10, "answer": "", "question": "The car you love...?" },
    { "index": 11, "answer": "", "question": "The actor/actress you are head over heels for" },
    { "index": 12, "answer": "", "question": "The favourite artist?" },
    { "index": 13, "answer": "", "question": "The favourite watch" },
    { "index": 14, "answer": "", "question": "Is there any specific kind of food that you are allergic to?" },
    { "index": 15, "answer": "", "question": "Your go-to drink?" },
    { "index": 16, "answer": "", "question": "Your favourite food is?" },
    { "index": 17, "answer": "", "question": "A restaurant cannot stop recommending?" },
    { "index": 18, "answer": "", "question": "The dessert of your dreams" },
    { "index": 19, "answer": "", "question": "Which is the car you travel most frequently in?" },
    { "index": 20, "answer": "", "question": "What is your blood group?" },
    { "index": 21, "answer": "", "question": "Are you diabetic?" },
    { "index": 22, "answer": "", "question": "What do you usually need assistance with?" },
    { "index": 23, "answer": "", "question": "What city do you reside in?" },
    { "index": 24, "answer": "", "question": "Is there anything regarding your lifestyle that you would like to specify?" },
    { "index": 25, "answer": "", "question": "We never got your name" },
    { "index": 26, "answer": "", "question": "Also your company and designation please" },
    { "index": 27, "answer": "", "question": "How do you find you on Instagram?" },
    { "index": 28, "answer": "", "question": "Your LinkedIn profile" },
    { "index": 29, "answer": "", "question": " Where do we send you the mail" },
    { "index": 30, "answer": "", "question": "You prefer", "optionsArray": preferStatuses },
    { "index": 31, "answer": "", "question": "You are a..", "optionsArray": foodStatuses },
    { "index": 32, "answer": "", "question": "You like your stays in", "optionsArray": stayStatuses },
    { "index": 33, "answer": "", "question": "Your ideal coffee is", "optionsArray": coffeeStatuses },
    { "index": 34, "answer": "", "question": "How often do you travel", "optionsArray": travelStatuses },
    { "index": 35, "answer": "", "question": "Are you currently on any form of diet?", "optionsArray": dietStatuses },
    { "index": 36, "answer": "", "question": "The cuisine that makes your mouth water", "optionsArray": languageStatuses },
    { "index": 37, "answer": "", "question": "Which is the flower you adore?", "optionsArray": flowerStatuses },



]
export { flowerStatuses, statusOptions, travelStatuses, stayStatuses, preferStatuses, foodStatuses, dietStatuses, coffeeStatuses, languageStatuses, tasteData }