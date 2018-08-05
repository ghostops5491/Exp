import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
   marginTop: getResponsiveCSSFrom8(25).height,
  },
  cards: {
    ...Fonts.style.bodyText,
  },
})
