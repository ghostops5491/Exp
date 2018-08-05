import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
   height: 70,
   flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-end'
 },
 topText: {
   color: Colors.darkSlateBlue,
   width: '100%',
  paddingHorizontal: getResponsiveCSSFrom8(40).width,
   textAlign: 'center',
  lineHeight: getResponsiveCSSFrom8(32).height,
 },
 closeButton: {
   position: 'absolute',
  top: getResponsiveCSSFrom8(0).height,
  bottom: getResponsiveCSSFrom8(0).height,
  right: getResponsiveCSSFrom8(15).width,
   justifyContent: 'flex-end',
   marginBottom: getResponsiveCSSFrom8(5).height
 },
 closeButtonImage: {
  width: getResponsiveCSSFrom8(20).width,
  height: getResponsiveCSSFrom8(20).height,
  borderRadius: getResponsiveCSSFrom8(10).width
 },
 camera: {
  height: Dimensions.get('window').height - getResponsiveCSSFrom8(120).height,
   width: '100%'
 },
 buttonsView: {
   flex: 1,
   flexDirection: 'row',
  padding: getResponsiveCSSFrom8(20).width,
 },
 cameraButton: {
   flex: 1,
  height: getResponsiveCSSFrom8(60).height,
   marginRight: '2.5%',
   backgroundColor: Colors.midBlue,
  borderRadius: getResponsiveCSSFrom8(8).width,
 },
 imagePreview: {
  height: Dimensions.get('window').height - getResponsiveCSSFrom8(120).height,
   width: '100%'
 },
 buttonText: {
 paddingVertical: getResponsiveCSSFrom8(18).height,
  textAlign: 'center',
  width: '100%',
  backgroundColor: 'transparent',
 fontSize: getResponsiveCSSFrom8(18).width,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#fff',
    padding: getResponsiveCSSFrom8(15).width
  },
  button: {
    backgroundColor: Colors.midBlue,
    color: 'white',
    width: '47.5%',
   height: getResponsiveCSSFrom8(45).height,
    marginRight: '2.5%',
    textAlign: 'center',
  },
  buttonConfirmInactive: {
    backgroundColor: '#819dcc',
    color: 'white',
    width: '47.5%',
   height: getResponsiveCSSFrom8(45).height,
    marginLeft: '2.5%',
    textAlign: 'center',
  },
  buttonConfirmActive: {
    backgroundColor: Colors.midBlue,
    color: 'white',
    width: '47.5%',
   height: getResponsiveCSSFrom8(45).height,
    marginLeft: '2.5%',
    textAlign: 'center',
  },
})
