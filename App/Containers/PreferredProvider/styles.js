import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  screenBody: {
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(32).height,
   fontSize: getResponsiveCSSFrom8(20).width,
  },
  scheduleJobText: {
    ...Fonts.style.bodyText,
    textAlign: 'left',
   marginTop: getResponsiveCSSFrom8(28).height,
  },
  hourlyRate: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(18).width,
  },
  estimate: {
    color: Colors.turtleGreen,
   marginTop: getResponsiveCSSFrom8(16).height,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(40).width,
   marginLeft: getResponsiveCSSFrom8(33).width,
   marginRight: getResponsiveCSSFrom8(33).width,
  },
  estimatedRange: {
    color: Colors.grayFour,
   marginTop: getResponsiveCSSFrom8(7).height,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(22).width,
   marginLeft: getResponsiveCSSFrom8(33).width,
   marginRight: getResponsiveCSSFrom8(33).width,
  },
  alertMessage: {
    color: Colors.dustyOrange,
   fontSize: getResponsiveCSSFrom8(12).width,
   marginTop: getResponsiveCSSFrom8(21).height,
  },
  viewJobTimelineButton: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
   marginTop: getResponsiveCSSFrom8(12).height,
   marginBottom: getResponsiveCSSFrom8(20).height,
  },
  cancelRequestButton: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
   marginBottom: getResponsiveCSSFrom8(8).height,
  },
  cancellationMessage: {
    color: Colors.dustyOrange,
   fontSize: getResponsiveCSSFrom8(10).width,
  },
  buttonText: {
    ...ApplicationStyles.buttonText
  }
})
