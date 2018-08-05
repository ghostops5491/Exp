import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({

  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    // fontFamily: 'Montserrat-Light',
  },

  paddedContainer: {
   paddingHorizontal: getResponsiveCSSFrom8(20).width,
    flex: 1,
    flexDirection: 'column',
  },

  contractorInfo: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageAvatar: {
   borderRadius: getResponsiveCSSFrom8(50).width,
   height: getResponsiveCSSFrom8(100).width,
   width: getResponsiveCSSFrom8(100).width,
  },
  description: {
   paddingHorizontal: getResponsiveCSSFrom8(20).width,
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  jobCategoryView: {
   marginHorizontal: getResponsiveCSSFrom8(-20).width,
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: Colors.dustyOrange,
  },
  jobCategoryText: {
    fontFamily: 'Montserrat-Medium',
    color: Colors.white,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(18).width,
  },

  headingView: {
    flex: 0.7,
   paddingTop: getResponsiveCSSFrom8(10).height,
  },

  headingText: {
    color: Colors.grayFour,
    alignItems: 'center',
    textAlign: 'center',
  },

  boldBlueText: {
   paddingTop: getResponsiveCSSFrom8(10).height,
    flex: 0,
   fontSize: getResponsiveCSSFrom8(22).width,
    fontFamily: 'Montserrat-Medium',
    color: Colors.darkSlateBlue,
  },

  normalBlueText: {
   paddingTop: getResponsiveCSSFrom8(10).height,
   paddingBottom: getResponsiveCSSFrom8(10).height,
    flex: 0,
   fontSize: getResponsiveCSSFrom8(16).width,
    color: Colors.darkSlateBlue,
  },

  buttonsContainer: {
    flex: 2,
   marginTop: getResponsiveCSSFrom8(30).height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // fontFamily: 'Montserrat-Medium',
  },

  materialsTable: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  materialRow: {
    flexDirection: 'row',
    flex: 0.3
  },
  materialName: {
    color: Colors.darkSlateBlue,
    flex: 3,
   fontSize: getResponsiveCSSFrom8(18).width,
  },
  materialCost: {
    color: Colors.darkSlateBlue,
    flex: 1,
    textAlign: 'right'
  },

  ruler: {
    borderTopColor: Colors.graySix,
   borderTopWidth: getResponsiveCSSFrom8(1).width,
   marginTop: getResponsiveCSSFrom8(10).height,
   height: getResponsiveCSSFrom8(10).height,
  },

  acceptButton: {
   height: getResponsiveCSSFrom8(50).height,
    borderColor: Colors.turtleGreen,
    backgroundColor: 'white',
    width: '45%',
  },

  rejectButton: {
   height: getResponsiveCSSFrom8(50).height,
    borderColor: Colors.paleRed,
    backgroundColor: 'white',
    width: '45%',
  },

  buttonsText: {
    fontFamily: 'Montserrat-SemiBold',
    width: '100%'
  },

  missingJob: {
    textAlign: 'center',
    marginTop: 20
  }
})
