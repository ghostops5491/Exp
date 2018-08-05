import { AsyncStorage } from 'react-native'
import { isEmpty, get } from 'lodash'

const currentUser = async () => {
  const user = await AsyncStorage.getItem('currentUser')
  return (isEmpty(user) ? {} : JSON.parse(user))
}

const selectToken = async () => {
  const user = await currentUser()
  return user.token
}

const saveUserToLocalStorage = async (user) => {
    return await user ? AsyncStorage.setItem('currentUser', JSON.stringify(user)) : {};
}

const removeUserFromLocalStorage = async (user) => {
  return await AsyncStorage.setItem('currentUser', '{}');
}

export default currentUser
export {
  selectToken,
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
};
