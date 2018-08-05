import { StyleSheet } from "react-native"
import { Metrics, ApplicationStyles, Colors, Fonts } from "App/Themes"
import { getResponsiveCSSFrom8 } from "../../Lib/Utils"

export default StyleSheet.create({
  rowContainer: {
    backgroundColor: Colors.white,
    borderRadius: 2,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 6,
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    flexDirection: 'row',
    shadowRadius: 1,
    shadowOpacity: 1
  },
  imageStyle: {
    width: getResponsiveCSSFrom8(40).width,
    height: getResponsiveCSSFrom8(40).width,
    borderRadius: getResponsiveCSSFrom8(20).width
  },
  userFields: {
    display: 'flex',
    marginLeft: 10,
    flexDirection: 'column'
  },
  providerName: {
    marginLeft: 2,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  checkBoxOuter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
})
