import { useNavigation } from '@react-navigation/native';
import React ,{useState}from 'react';
import { Pressable, View,Image } from 'react-native';
import {WebView} from 'react-native-webview';


const CheckOutScreen =()=>{
    return(
       <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://indulge-global.myshopify.com/72557068561/checkouts/bfc7afd3a59058de7a97aabe74ae03a6?key=c23ca6a4a91e7af5edd00e38546f92a8' }}
      />
 
       </View>
    )
}
export default CheckOutScreen;