import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  container: {
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
  },
  item: {
    width: '100%',
  },
  successMessage: {
    ...Fonts.style.activeMenuItem,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(18).width,
   marginVertical: getResponsiveCSSFrom8(10).height,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
   height: getResponsiveCSSFrom8(42).height,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: '400',
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
   marginTop: getResponsiveCSSFrom8(6).height,
  },
  mainProvidersTitle: {
    ...Fonts.style.bodyText,
   marginTop: getResponsiveCSSFrom8(15).height,
  },
  headerStyle: {
   marginTop: getResponsiveCSSFrom8(26).height,
  },
  header: {
    ...Fonts.style.header2,
   marginLeft: getResponsiveCSSFrom8(15).width,
  },
  addProvider: {
   marginLeft: getResponsiveCSSFrom8(-5).width,
   marginTop: getResponsiveCSSFrom8(20).height,
   marginBottom: getResponsiveCSSFrom8(15).height,
  },
  button: {
   marginTop: getResponsiveCSSFrom8(10).height,
  },
  addButton: {
   height: getResponsiveCSSFrom8(14).height,
   marginBottom: getResponsiveCSSFrom8(10).height,
  },
  buttonText: {
    ...ApplicationStyles.buttonText
  },
})
