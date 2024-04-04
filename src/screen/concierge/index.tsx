import { Linking, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ConciergeStyle from './style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import VideoPlayModal from '../../components/VideoPlayModal';

const ConciergeScreen = () => {
  // const [userData, setUserData] = useState(null);
  const [userData, setUserData] = useState<{ whatsAppLink: string } | null>(null);
  const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
  const [videoModal, setVideoModal] = useState<boolean>(false);
  const [videoLink, setVideoLink] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.indulge.blokxlab.com/get-whatsapp-group', {
          params: {
            mobile_no: storedPhoneNumber,
          },
        });
        setUserData(response.data);
        console.log(response.data, "respone::::")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // if (storedPhoneNumber) {
    fetchData();
    // }
  }, []);


  const handleLinkPress = () => {
    Linking.openURL("https://buy.stripe.com/8wM03K5rT845fsI3dn")
    // if (userData && userData.whatsAppLink) {
    //   Linking.openURL(userData.whatsAppLink);
    // } else {
    //   console.error('No WhatsApp link available');
    // }
  };

  const openVideoModel = (videoName) => {
    setVideoLink(videoName)
    setVideoModal(true)
  }
  return (
    <SafeAreaView style={ConciergeStyle.container}>
      <View style={ConciergeStyle.headerContainer}>
        <Image
          source={require('../../../assets/screen/Profile_Badge.png')}
          style={ConciergeStyle.logo}
        />
        <View style={ConciergeStyle.textContainer}>
          <Text style={ConciergeStyle.currentYear}>year</Text>
          {/* <Text style={ConciergeStyle.currentDate}>{dayOfMonth} {monthFullName}</Text> */}
        </View>

        {/* Add button */}
        <TouchableOpacity style={ConciergeStyle.addButton} //onPress={onAddEventsPress}
        >
          <Image
            source={require('../../../assets/screen/Filter_Icon.png')}
          // style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity style={ConciergeStyle.addButton} //onPress={onAddEventsPress}
        >
          <Image
            source={require('../../../assets/screen/Bell_Icon.png')}
          // style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={ConciergeStyle.conciergeContainer}>
          <Text style={ConciergeStyle.conciergeText}>Concierge</Text>
          <Image
            source={require('../../../assets/screen/Concierge_First_Image.png')}
            style={ConciergeStyle.imageStyle}
          />
          <Text style={ConciergeStyle.conciergeText1}>What does activating your concierge entitle you to :</Text>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>
              .
            </Text>
            <Text style={ConciergeStyle.conciergeText2}>
              A dedicated whatsapp group with 7 individuals taking care of you.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>
              .
            </Text>
            <Text style={ConciergeStyle.conciergeText2}>
              These 7 Individuals are well versed in  travel, retail and can take care of all your requests.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>
              .
            </Text>
            <Text style={ConciergeStyle.conciergeText2}>
              Available 24/7, 365 days a year at your service for all requests inclusive.
            </Text>
          </View>
          <TouchableOpacity onPress={() => openVideoModel("VIDEO1.mp4")}>
            <Image
              source={require('../../../assets/screen/Concierge_Second_Image.png')}
              style={ConciergeStyle.imageStyle}
            />
          </TouchableOpacity>
          <Text style={ConciergeStyle.conciergeText3}>Access Your </Text>
          <Text style={ConciergeStyle.conciergeText31}>Private Concierge</Text>
          <Text style={ConciergeStyle.conciergeText32}>Things to know :</Text>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>
              .
            </Text>
            <Text style={ConciergeStyle.conciergeText2}>
              INDULGE is an annual membership program.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>
              .
            </Text>
            <Text style={ConciergeStyle.conciergeText2}>
              We have zero service charge for any of your requests.
            </Text>
          </View>
          <TouchableOpacity onPress={() => openVideoModel("VIDEO2.mp4")}>
            <Image
              source={require('../../../assets/screen/Concierge_Third_Image.png')}
              style={ConciergeStyle.imageStyle}
            />
          </TouchableOpacity>
          <Text style={ConciergeStyle.conciergeText4}>Faq’s</Text>
          <View style={ConciergeStyle.conciergeText5View}>
            <Text style={ConciergeStyle.conciergeText50}>
              What is the scope of requests I can make?
            </Text>
            <Image
              source={require('../../../assets/screen/Down_Arrow_YELLOW.png')}
              style={ConciergeStyle.rightArrowIcon}
            />
          </View>
          <View style={ConciergeStyle.conciergeText50View}>
            <Text style={ConciergeStyle.conciergeText501}>INDULGE is NOT a discount platform. We are enablers optimised for speed and access. The costs are 100% transparent and the team does not upsell so you always get the source rate.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText5View}>
            <Text style={ConciergeStyle.conciergeText5}>
              What is the scope of requests I can make?
            </Text>
            <Image
              source={require('../../../assets/screen/Right_Arrow_YELLOW.png')}
              style={ConciergeStyle.rightArrowIcon}
            />
          </View>
          <View style={ConciergeStyle.conciergeText5View}>
            <Text style={ConciergeStyle.conciergeText5}>
              How many people can use a membership?
            </Text>
            <Image
              source={require('../../../assets/screen/Right_Arrow_YELLOW.png')}
              style={ConciergeStyle.rightArrowIcon}
            />
          </View>
          <View style={ConciergeStyle.conciergeText5View}>
            <Text style={ConciergeStyle.conciergeText5}>
              How do I make payments for my requests?
            </Text>
            <Image
              source={require('../../../assets/screen/Right_Arrow_YELLOW.png')}
              style={ConciergeStyle.rightArrowIcon}
            />
          </View>
          <View style={ConciergeStyle.conciergeText5View}>
            <Text style={ConciergeStyle.conciergeText5}>
              I have an EA. Why should I take INDULGE membership?
            </Text>
            <Image
              source={require('../../../assets/screen/Right_Arrow_YELLOW.png')}
              style={ConciergeStyle.rightArrowIcon}
            />
          </View>
          <View style={ConciergeStyle.conciergeText5View}>
            <Text style={ConciergeStyle.conciergeText5}>
              What happens after the 48 hour window of the membership invite closes?
            </Text>
            <Image
              source={require('../../../assets/screen/Right_Arrow_YELLOW.png')}
              style={ConciergeStyle.rightArrowIcon}
            />
          </View>
          <View style={ConciergeStyle.conciergeText5View}>
            <Text style={ConciergeStyle.conciergeText5}>
              Suggest a few things I can ask the team to do
            </Text>
            <Image
              source={require('../../../assets/screen/Right_Arrow_YELLOW.png')}
              style={ConciergeStyle.rightArrowIcon}
            />
          </View>
          <View style={ConciergeStyle.conciergeText6View}>
            <View style={ConciergeStyle.conciergeText61View}>
              <Text style={ConciergeStyle.conciergeText6}>
                ₹4 lakhs
              </Text>
              <Text style={ConciergeStyle.conciergeText61}>
                + 18% tax
              </Text>
            </View>
            <Image
              source={require('../../../assets/screen/Indulge_LOGO_ONLY.png')}
              style={ConciergeStyle.backgroundLogo}
            />
          </View>
          <TouchableOpacity
            onPress={handleLinkPress}
          >
            <LinearGradient
              colors={['#D39F3A', '#BD812D']}
              style={ConciergeStyle.conciergeButtonView}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={ConciergeStyle.conciergeButtonText} >
                Activate Now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <VideoPlayModal
            videoModal={videoModal}
            setVideoModal={setVideoModal}
            videoLink={videoLink}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default ConciergeScreen
