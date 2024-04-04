import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TermAndConditionsStyle from './style'
import { WebView } from 'react-native-webview';



const TermAndConditionsScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://collectibles.global/pages/terms-of-use' }}
            />

        </View>
    )
}
export default TermAndConditionsScreen;