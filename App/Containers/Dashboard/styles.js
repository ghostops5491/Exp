import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

export default StyleSheet.create({
  // TODO move container to some common place
  container: {
    ...ApplicationStyles.screen.container,
  },
  buttonText: {
    ...ApplicationStyles.buttonText
  },
  text: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
  },
  flowDirection: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between'
  },
  jobTitle: {
    ...Fonts.style.bodyText,
    marginBottom: getResponsiveCSSFrom8(4).height,
    flex : 0.8
  },
  jobTimer: {
    ...Fonts.style.label2,
    fontSize: getResponsiveCSSFrom8(14).height,
    flex : 0.2,
    textAlign : 'center'
  },
  jobAddress: {
    ...Fonts.style.label2,
   fontSize: getResponsiveCSSFrom8(12).width,
  },
  buttonDescription: {
   marginTop: getResponsiveCSSFrom8(11).height,
  }
})
