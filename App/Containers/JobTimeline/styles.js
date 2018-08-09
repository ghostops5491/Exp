import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';

export default StyleSheet.create({
  screenBody: {
   padding: getResponsiveCSSFrom8(15).width,
    flexDirection: 'column',
   minHeight: getResponsiveCSSFrom8(Metrics.screenHeight - 160).height,
  },
  cancelButton: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
   marginBottom: getResponsiveCSSFrom8(8).height,
   marginTop: getResponsiveCSSFrom8(40).height,
  },
  cancellationMessage: {
    color: Colors.dustyOrange,
   fontSize: getResponsiveCSSFrom8(10).width,
    textAlign: 'center',
  },
  shareButton:  {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  underLineText: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(12).width,
    color: Colors.midBlue,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(5).height,
    alignSelf : 'center'
  },
  shareText: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
    fontSize: getResponsiveCSSFrom8(10).width,
   marginBottom: getResponsiveCSSFrom8(-5).height,
  },
  flexFlow: {
    display: 'flex',
    flexDirection: 'row',
    // flex: 0.2,
    // justifyContent: 'space-around',
   marginTop: getResponsiveCSSFrom8(5).height,
   marginBottom: getResponsiveCSSFrom8(5).height,
  },
  shareIcon: {
    textAlign: 'center',
  },
  buttonText: {
    ...ApplicationStyles.buttonText
  },
  modal: {
    backgroundColor: 'white',
   borderRadius: getResponsiveCSSFrom8(2).width,
   marginTop: getResponsiveCSSFrom8(150).height,
   marginLeft: getResponsiveCSSFrom8(20).width,
   marginRight: getResponsiveCSSFrom8(20).width,
  },
  modalContainer: {
    flex: 1,
    backgroundColor:'rgba(1,1,1,0.9)',
  },
  modalInnerContainer: {
   margin: getResponsiveCSSFrom8(10).width,
  },
  modalTitle: {
    ...Fonts.style.header1,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(20).height,
   marginBottom: getResponsiveCSSFrom8(20).height,
  },
  modalText: {
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(20).height,
   marginBottom: getResponsiveCSSFrom8(20).height,
  },
})
