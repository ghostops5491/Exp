import { StyleSheet } from 'react-native'
import { Fonts, ApplicationStyles, Colors } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  buttonText: {
    ...ApplicationStyles.buttonText,
    color: Colors.midBlue,
    fontSize: 11
  },
  selectedButtonText: {
    ...ApplicationStyles.buttonText,
    fontSize: 11
  },
  titleText: {
    ...Fonts.style.header1,
   marginTop: getResponsiveCSSFrom8(16).height,
    textAlign: 'center',
  }
})
