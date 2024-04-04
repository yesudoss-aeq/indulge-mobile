import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, View, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


const TypeformScreen = () => {
  const navigation = useNavigation();
  const [submitClicked, setSubmitClicked] = useState(false)

  const handleHomeScreen = () => {
    navigation.navigate('Filter');
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/IndulgeLogoWhite.png')} style={styles.logoImage} />
      </View>
      <View style={styles.skipButtonContainer}>
        <Pressable onPress={handleHomeScreen}>
          <Image source={require('../assets/SkipButtonImage.png')} style={styles.skipImage} />
        </Pressable>
      </View>
      <WebView
        source={{ uri: 'https://form.typeform.com/to/CzE6p3UC' }}
        style={styles.webViewContainer}
        onMessage={(event) => {
          if (event.nativeEvent.data === 'submitClicked') {
            setSubmitClicked(true)
          }
        }}
      />
      {submitClicked && handleHomeScreen()}
    </View>
  )
}
export default TypeformScreen;

const styles = StyleSheet.create({
  skipImage: {
    width: 90,
    height: 41,
    marginRight:'5%'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000'
  },
  imageContainer: {
    justifrContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    width: 110,
    height: 90,
    marginTop: '8%'
  },
  skipButtonContainer: {
    marginLeft: '75%',
    marginTop: '4%'
  },
  webViewContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: '10%',
    marginBottom: '30%',
  }
})