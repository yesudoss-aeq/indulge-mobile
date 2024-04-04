import { StyleSheet } from 'react-native'
import { colors } from '../../../utils/constant/Colors'


const FavoriteStyle = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.BLACK_BACKGROUND_COLOR },
    textStyle: { fontSize: 20, fontWeight: 'bold', color: colors.YELLO_THEME_COLOR, fontFamily: "YourFont-Regular" }

})

export default FavoriteStyle