import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  timeBubbleActive: {
   padding: getResponsiveCSSFrom8(5).width,
   height: getResponsiveCSSFrom8(50).width,
   width: getResponsiveCSSFrom8(50).width,
   borderRadius: getResponsiveCSSFrom8(25).width,
   borderWidth: getResponsiveCSSFrom8(1.5).width,
    borderColor: Colors.grayFive,
    justifyContent: 'center'
  },
  timeBubbleInactive: {
   padding: getResponsiveCSSFrom8(5).width,
   height: getResponsiveCSSFrom8(50).width,
   width: getResponsiveCSSFrom8(50).width,
   borderRadius: getResponsiveCSSFrom8(25).width,
   borderWidth: getResponsiveCSSFrom8(1.5).width,
    borderColor: Colors.grayTwo,
    justifyContent: 'center',
  },
  time: {
    fontFamily: 'Montserrat-Regular',
   fontSize: getResponsiveCSSFrom8(10).width,
    color: Colors.grayFour,
    color: Colors.darkSlateBlue,
   padding: getResponsiveCSSFrom8(3).width,
    textAlign: 'center'
  },
  timeLine: {
    height: getResponsiveCSSFrom8(26).height,
    borderColor: Colors.graySix,
   marginLeft: getResponsiveCSSFrom8(24).width,
   borderLeftWidth: getResponsiveCSSFrom8(2).width,
  },
  arrowLeft: {
   width: getResponsiveCSSFrom8(10).width,
   height: getResponsiveCSSFrom8(10).height,
   borderTopWidth: getResponsiveCSSFrom8(1).width,
  },
  stateBoxActive: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
   minHeight: getResponsiveCSSFrom8(50).height,
    width: '100%',
   padding: getResponsiveCSSFrom8(5).width,
  },
  stateBoxInactive: {
   minHeight: getResponsiveCSSFrom8(50).height,
    width: '100%',
   marginBottom: getResponsiveCSSFrom8(14).height,
   padding: getResponsiveCSSFrom8(13).width,
  },
  showMore: {
    position: 'absolute',
   right: getResponsiveCSSFrom8(10).width,
  },
  quoteDropdown: {
    ...Fonts.style.bodyText,
   padding: getResponsiveCSSFrom8(15).width,
  },
  quoteDropdownRow: {
    flexDirection: 'row',
  },
  quoteDropdownLabel: {
    textAlign: 'left',
  },
  quoteDropdownValue: {
    fontWeight: '600',
    color: Colors.midBlue,
    textAlign: 'right',
  },
  itemActive: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(14).width,
   marginTop: getResponsiveCSSFrom8(7).height,
   marginLeft: getResponsiveCSSFrom8(10).width,
  },
  itemInactive: {
    ...Fonts.style.label2,
   fontSize: getResponsiveCSSFrom8(14).width,
    fontWeight: '400',
  },
  viewQuote: {
    position: 'absolute',
    right: 10,
    top: 15,
    ...Fonts.style.label2,
    color: Colors.paleRed,
    fontSize: 14,
    fontWeight: '400',
  }
})
