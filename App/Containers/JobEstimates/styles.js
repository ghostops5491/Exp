import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';

export default StyleSheet.create({
  buttonText: {
    ...ApplicationStyles.buttonText
  },
  titleText: {
    ...Fonts.style.header1,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(32).height,
  },
  scheduleJobText: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(28).height,
  },
  item: {
   paddingTop: getResponsiveCSSFrom8(10).height,
    width: '100%',
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
   height: getResponsiveCSSFrom8(42).height,
    width: '100%',
  },
  estimate: {
    fontFamily: 'Roboto-Bold',
    color: Colors.turtleGreen,
   marginTop: getResponsiveCSSFrom8(63).height,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(40).width,
  },
  estimateIndicator: {
    color: Colors.grayFour,
   marginTop: getResponsiveCSSFrom8(83).height,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(22).width,
  },
  estimatedRange: {
    fontFamily: 'Roboto-Regular',
    color: Colors.grayFour,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(18).width,
  },
  serviceFee: {
    fontFamily: 'Roboto-Bold',
    color: Colors.turtleGreen,
   marginTop: getResponsiveCSSFrom8(16).height,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(40).width,
  },
  serviceFeeText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.grayFive,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(18).width,
  },
  hintMessage: {
    fontFamily: 'Roboto-Regular',
    color: Colors.grayFive,
   fontSize: getResponsiveCSSFrom8(12).width,
    textAlign: 'center',
   lineHeight: getResponsiveCSSFrom8(16).height,
  },
  errorMessage: {
   fontSize: getResponsiveCSSFrom8(14).width,
    color: Colors.dustyOrange,
    textAlign: 'center',
    lineHeight: getResponsiveCSSFrom8(16).height,
    marginBottom: getResponsiveCSSFrom8(10).height,
  },
  submitServiceRequestButton: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
   marginTop: getResponsiveCSSFrom8(12).height,
  },
  screenBody: {
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
   height: getResponsiveCSSFrom8(Metrics.screenHeight - Metrics.headerNavHeight).height,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressContainer: {
   height: getResponsiveCSSFrom8(20).height,
  },
  problemCategoryDropdownTextStyle: {
    fontFamily: 'Roboto-Regular',
   fontSize: getResponsiveCSSFrom8(16).width,
   padding: getResponsiveCSSFrom8(14).width,
    color: Colors.darkSlateBlue,
  },
  problemCategoryDropdownDropdownStyle: {
   marginTop: getResponsiveCSSFrom8(7).height,
    width: '88.50%',
    color: Colors.darkSlateBlue,
   height: getResponsiveCSSFrom8(100).height,
  },
  activityIndicator: {
   height: getResponsiveCSSFrom8(40).height,
  },
  dropdown_2_row: {
    flexDirection: 'row',
    height: getResponsiveCSSFrom8(40).height,
    alignItems: 'center',
  },
  dropdown_2_row_text: {
   marginHorizontal: getResponsiveCSSFrom8(4).width,
    fontFamily: 'Roboto-Regular',
   fontSize: getResponsiveCSSFrom8(16).width,
    color: 'navy',
    textAlignVertical: 'center',
   paddingLeft: getResponsiveCSSFrom8(14).width,
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
