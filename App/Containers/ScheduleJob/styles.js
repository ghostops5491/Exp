import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

export default StyleSheet.create({
  screenBody: {
   padding: getResponsiveCSSFrom8(15).width,
  },
  buttonText: {
    ...ApplicationStyles.buttonText
  },
  unSelectedButtonText: {
    ...ApplicationStyles.buttonText,
    color: Colors.midBlue
  },
  titleText: {
    ...Fonts.style.header1,
    textAlign: 'center',
    marginTop: getResponsiveCSSFrom8(32).height
  },
  jobScheduleButtons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: getResponsiveCSSFrom8(26).height,
    justifyContent: 'space-between'
  },
  button: {
    width: getResponsiveCSSFrom8(150).width,
    height: getResponsiveCSSFrom8(46).height
  },
  item: {
   marginLeft: getResponsiveCSSFrom8(0).width,
    marginBottom: getResponsiveCSSFrom8(8).height,
    width: '100%'
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
    height: getResponsiveCSSFrom8(42).height,
    fontSize: getResponsiveCSSFrom8(16).height,
    fontWeight: '300',
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
    opacity: 0.6,
   paddingRight: getResponsiveCSSFrom8(10).width,
    width: '100%'
  },
  jobAddressTitle: {
    ...Fonts.style.header2,
    marginBottom: getResponsiveCSSFrom8(6).height,
    marginTop: getResponsiveCSSFrom8(15).height
  },
  addressRow: {
    flexDirection: 'row',
    display: 'flex'
  },
  addressCity: {
   marginLeft: getResponsiveCSSFrom8(0).width,
    flex: 2
  },
  addressZip: {
   marginLeft: getResponsiveCSSFrom8(6).width,
    flex: 1
  },
  addressContainer: {
    height: getResponsiveCSSFrom8(20).height
  },
  problemCategoryDropdownTextStyle: {
    backgroundColor: 'transparent',
    fontSize: getResponsiveCSSFrom8(16).height,
   width: getResponsiveCSSFrom8(311).width,
    color: Colors.darkSlateBlue
  },
  problemCategoryDropdownDropdownStyle: {
    width: '88.86%',
   marginLeft: getResponsiveCSSFrom8(-11).width,
    marginTop: (Platform.OS === 'android') ? getResponsiveCSSFrom8(-10).height : getResponsiveCSSFrom8(10).height //android
  },
  dropdownRow: {
    flexDirection: 'row',
    height: getResponsiveCSSFrom8(40).height,
    alignItems: 'center'
  },
  dropdownRowText: {
   marginHorizontal: getResponsiveCSSFrom8(11).width,
    fontSize: getResponsiveCSSFrom8(16).height,
    color: 'navy',
    textAlignVertical: 'center'
  },
  hasError: {
    ...ApplicationStyles.hasError
  },
  errorText: {
    ...ApplicationStyles.errorText
  },
  nextButton: {
    width: '100%',
    height: getResponsiveCSSFrom8(46).height,
    marginTop: getResponsiveCSSFrom8(50).height
  },
  dateIcon: {
    position: 'absolute',
   right: getResponsiveCSSFrom8(10).width,
   top: getResponsiveCSSFrom8(14).height,
   width: getResponsiveCSSFrom8(13).width,
   height: getResponsiveCSSFrom8(13).height,
   marginLeft: getResponsiveCSSFrom8(0).width,
  },
  dateText: {
    ...Fonts.style.bodyText,
    alignSelf: 'flex-start',
   paddingLeft: getResponsiveCSSFrom8(10).width,
  }
})
