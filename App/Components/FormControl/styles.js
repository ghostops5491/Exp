import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  headerStyle: {
   marginTop: getResponsiveCSSFrom8(16).height,
  },
  header: {
    ...Fonts.style.header2,
   marginLeft: getResponsiveCSSFrom8(10).width,
   fontSize: getResponsiveCSSFrom8(12).width,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.00)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.graySix,
    height: getResponsiveCSSFrom8(42).height,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: '400',
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
   marginTop: getResponsiveCSSFrom8(5).height,
  },
  errorInput: {
    borderColor: Colors.paleRed,
  },
  inputOpaque: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  item: {
    width: '100%',
  },
  errorSignleLine:{
    width: '100%',
    color: '#ef6940',
   marginTop: getResponsiveCSSFrom8(5).height,
   fontSize: getResponsiveCSSFrom8(16).width,
  },
})
