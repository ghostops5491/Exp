import { StyleSheet } from 'react-native'
import { Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';
export default StyleSheet.create({
  logoOuterContainer: {
  },
  logoContainer: {
   padding: getResponsiveCSSFrom8(88).width,
    flex: 1,
    alignItems: 'stretch',
  },
  logo: {
    flex : 1,
    backgroundColor : 'white',
   width: getResponsiveCSSFrom8(null).width,
    resizeMode: 'contain'
  },
  bodyText: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
  },
})
