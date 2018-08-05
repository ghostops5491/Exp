import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  titleText: {
    ...Fonts.style.bodyText,
    textAlign: 'left',
   marginTop: getResponsiveCSSFrom8(22).height,
  },
  description: {
   marginTop: getResponsiveCSSFrom8(29).height,
   marginLeft: getResponsiveCSSFrom8(13).width,
   marginRight: getResponsiveCSSFrom8(13).width,
  },
  descriptionText: {
    ...Fonts.style.bodyText,
    textAlign: 'right',
   marginTop: getResponsiveCSSFrom8(13).height,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.00)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
   height: getResponsiveCSSFrom8(42).height,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: "300",
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
  },
  button: {
    width: '100%',
   height: getResponsiveCSSFrom8(46).height,
   marginTop: getResponsiveCSSFrom8(20).height,
  },
  item: {
   marginLeft: getResponsiveCSSFrom8(0).width,
   marginBottom: getResponsiveCSSFrom8(8).height,
    width: '100%',
  },
  billingBorder: {
    borderColor: Colors.grayFive,
   marginLeft: getResponsiveCSSFrom8(-10).width,
   marginRight: getResponsiveCSSFrom8(-10).width,
   borderLeftWidth: getResponsiveCSSFrom8(0.5).width,
   borderRightWidth: getResponsiveCSSFrom8(0.5).width,
  },
  jobAddressTitle: {
    ...Fonts.style.header1,
   marginBottom: getResponsiveCSSFrom8(6).height,
   marginTop: getResponsiveCSSFrom8(15).height,
   fontSize: getResponsiveCSSFrom8(12).width,
   paddingLeft: getResponsiveCSSFrom8(10).width,
  },
  addressRow: {
    flexDirection: 'row',
    display: 'flex',
  },
  addressCity: {
   marginLeft: getResponsiveCSSFrom8(0).width,
    flex: 2
  },
  addressZip: {
   marginLeft: getResponsiveCSSFrom8(6).width,
    flex: 1
  },
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
  logo: {
    flex: 1,
   width: getResponsiveCSSFrom8(null).width,
   height: getResponsiveCSSFrom8(20).height,
    resizeMode: 'contain',
  },
  subheadingTitleText: {
    ...Fonts.style.header2,
    textAlign: 'left',
   marginTop: getResponsiveCSSFrom8(20).height,
   fontSize: getResponsiveCSSFrom8(12).width,
   marginLeft: getResponsiveCSSFrom8(10).width,
  },
  estimate: {
    color: Colors.turtleGreen,
   marginTop: getResponsiveCSSFrom8(30).height,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(40).width,
   marginLeft: getResponsiveCSSFrom8(33).width,
   marginRight: getResponsiveCSSFrom8(33).width,
  },
  finalPrice: {
    ...Fonts.style.header1,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(12).width,
   marginTop: getResponsiveCSSFrom8(5).height,
  },
  starContainer: {
    flex: 1,
    alignItems: 'center',
  },
  star: {
    flex: 5,
   width: getResponsiveCSSFrom8(20).width,
   height: getResponsiveCSSFrom8(40).height,
    resizeMode: 'contain',
    flexWrap: 'wrap',
  },
  underLineText: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(10).width,
    textAlign: 'center',
  },
  totalAmountContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
  },
  totalAmountOuterContainer: {
    borderColor: Colors.graySix,
   borderWidth: getResponsiveCSSFrom8(1).width,
   marginTop: getResponsiveCSSFrom8(5).height,
   paddingBottom: getResponsiveCSSFrom8(10).height,
  },
  totalAmountInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalAmount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
   marginRight: getResponsiveCSSFrom8(10).width,
  },
  flexFlow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  disputeButton: {
    backgroundColor: 'transparent'
  },
  disputeButtonText: {
    width: '100%',
    fontSize: 13,
    color: '#405ba6'
  },
  photoLabel: {
    color: '#0b0d85',
    textAlign: 'center',
    marginTop: getResponsiveCSSFrom8(15).height
  }
})
