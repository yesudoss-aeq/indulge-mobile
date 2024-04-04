import { StyleSheet } from 'react-native'
import { colors } from '../../utils/constant/Colors'


const ConciergeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
  },
  conciergeContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  conciergeText: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.WHITE_COLOR_30
  },
  imageStyle: {
    width: '100%',
    height: 271,
    borderRadius: 16,
    marginTop: 30
  },
  conciergeText1: {
    fontSize: 20,
    fontWeight: "400",
    color: colors.YELLO_THEME_COLOR_TEXT,
    marginVertical: 10,
  },
  conciergeText2View: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  conciergeText21: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.WHITE_COLOR_80,
  },
  conciergeText2: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.WHITE_COLOR_80,
    marginTop: 10,
    marginStart: 10
  },
  conciergeText3: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.WHITE_COLOR_30,
    marginTop: 10
  },
  conciergeText31: {
    fontSize: 26,
    fontWeight: "400",
    color: colors.YELLO_THEME_COLOR_TEXT,
  },
  conciergeText32: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.WHITE_COLOR_80,
    marginTop: 20

  },
  conciergeText4: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.WHITE_COLOR_78,
    marginTop: 20
  },
  conciergeText50: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: colors.YELLO_THEME_COLOR_TEXT,
    marginTop: 20
  },
  conciergeText501: {
    flex: 1,
    fontSize: 20,
    fontWeight: "400",
    color: colors.WHITE_COLOR,
    marginVertical: 20
  },
  conciergeText50View: {
    flexDirection: 'row',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: "#202020"
  },
  conciergeText5: {
    flex: 1,
    fontSize: 20,
    fontWeight: "400",
    color: colors.WHITE_COLOR_60,
    marginTop: 20
  },
  conciergeText5View: {
    flexDirection: 'row',
    // marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightArrowIcon: {
    marginStart: 10
  },
  conciergeButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLO_THEME_COLOR,
    borderRadius: 12,
    marginVertical: 10,
    padding: 15,
    marginTop: -75,

  },
  conciergeButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.WHITE_COLOR,
    // marginVertical: 20
  },
  conciergeText6View: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  conciergeText61View: {

  },
  conciergeText6: {
    fontSize: 24,
    fontWeight: "400",
    color: colors.WHITE_COLOR
  },
  conciergeText61: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.GREY_FONT_FONT_COLOR
  },
  backgroundLogo: {
    marginTop: -25,
    width: 180,
    height: 180,
  },
  webView: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    marginHorizontal: 20,
  },
  logoProfile: {
    width: 36,
    height: 36,
    resizeMode: 'contain'
  },
  logoClose: {
    width: 42,
    height: 42,
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  addButton: {
    marginStart: 20
  }
})

export default ConciergeStyle