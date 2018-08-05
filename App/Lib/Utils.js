import { Dimensions, PermissionsAndroid } from 'react-native'
const dims = Dimensions.get('window')
const { height, width } = dims

/**
 *
 * @param {int} pixel : defines the pixel size formatted for iPhone 8s
 *
 * @returns {object} : returns a new pixel size object processed for
 *                     responsiveness on active device
 */
export const getResponsiveCSSFrom8 = pixel => {
  if (pixel === undefined || pixel === null) return { width: null, height: null };
  pixel = +pixel
  return {
    height: pixel / 667 * height,
    width: pixel / 375 * width
  }
}

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ])
    const rejectedPermissions = []
    for (let permission in granted) {
      if (!granted[permission]) {
        rejectedPermissions.push(permission)
      }
    }
    if (rejectedPermissions.length)
      throw { err: true, rejectedPermissions, JOI_Error: true }
    else return true
  } catch (err) {
    throw err
  }
}
