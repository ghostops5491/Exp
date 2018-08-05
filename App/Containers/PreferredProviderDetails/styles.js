import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, ApplicationStyles } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

export default StyleSheet.create({
  background: {
    backgroundColor: Colors.grayThree
  },
  screenBody: {
   paddingHorizontal: getResponsiveCSSFrom8(10).width,
  },
 padding: {
   paddingVertical: getResponsiveCSSFrom8(10).height,
  },
  avatar: {
    width: getResponsiveCSSFrom8(120).width,
    height: getResponsiveCSSFrom8(120).width,
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(60).width,
    borderColor: Colors.grayThree,
    overflow: 'hidden',
    alignSelf: 'center',
    position: 'absolute',
    ...Platform.select({
      ios: { zIndex: 1000 },
      android: { elevation: 1000 }
    })
  },
  descrption: {
    ...Fonts.style.bodyText
  },
  hourlyRate: {
    ...Fonts.style.nameFont,
    textAlign: 'center'
  },
  estimate: {
    color: Colors.turtleGreen,
   marginTop: getResponsiveCSSFrom8(16).height,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(40).width,
  },
  button: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
  },
  buttonText: {
    ...ApplicationStyles.buttonText
  },
  providerContainerStyles: {
    marginTop: getResponsiveCSSFrom8(20).height
  },
  providerDetailsInnerContainer: {
    flex: 1
  },
  providerDetailsContainer: {},
  providerNameStyles: {
    ...Fonts.style.nameFont
  },
  providerDetailRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginVertical: getResponsiveCSSFrom8(10).height
  },
  providerDetailLabelContainer: {
    flex: 1,
    marginLeft: getResponsiveCSSFrom8(30).width
  },
  providerDetailInfoContainer: {
    flex: 1
  },
  providerDetailInfo: {
    color: Colors.darkSlateBlue,
    fontWeight: Fonts.weight.bold
  },
  providerDetailLabel: {
    color: Colors.grayFour,
    fontWeight: Fonts.weight.bold
  },
  licensesContainer: {
    alignItems: 'center',
    marginVertical: getResponsiveCSSFrom8(20).height,
    flex: 1
  },
  licensesHeader: {
    color: Colors.darkSlateBlue,
    fontWeight: Fonts.weight.bold,
    marginBottom: getResponsiveCSSFrom8(20).height
  },
  noDocumentsText: {
    color: Colors.grayFour,
    fontWeight: Fonts.weight.semibold
  }
})
