import { StyleSheet } from 'react-native'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
   width: getResponsiveCSSFrom8(null).width,
  }
})
