import { StyleSheet } from 'react-native'
import { Colors, Metrics } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

export default StyleSheet.create({
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  photo: {
    width: getResponsiveCSSFrom8(50).width,
    height: getResponsiveCSSFrom8(50).width,
    margin: getResponsiveCSSFrom8(25).width
  },
  imageViewer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    position: 'absolute',
    right: getResponsiveCSSFrom8(20).width,
    top: getResponsiveCSSFrom8(20).height,
    height: getResponsiveCSSFrom8(30).height,
    width: getResponsiveCSSFrom8(30).width,
    borderRadius: 15
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }
})
