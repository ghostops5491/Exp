import { StyleSheet } from 'react-native'
import { Colors } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  logoOuterContainer: {
    width: '100%',
    flex: 1,
   padding: getResponsiveCSSFrom8(10).width,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'stretch',
    width: '100%',
  },
})
