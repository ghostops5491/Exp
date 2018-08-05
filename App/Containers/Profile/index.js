import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, last, isEmpty } from 'lodash'
import { map } from 'App/Lib/lodash'
import {
  Image,
  View,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform
} from 'react-native'
import { Content, Button, Text, Item, Input, Form } from 'native-base'
import { Images, Colors, Fonts } from 'App/Themes'
import styles from './styles'
import { NavigationActions } from 'react-navigation'
import {
  ProfileSection,
  FormControl,
  TakePhotoScreen,
  RenderIcon
} from 'App/Components'
import Actions from 'App/Redux/Actions'
import AuthActions from 'App/Redux/AuthRedux'
import AddAddressModal from './AddAddressModal'
import ServiceAddressRow from './ServiceAddressRow'
import { saveUserToLocalStorage } from 'App/Lib/Auth'
import { requestCameraPermission } from '../../Lib/Utils'
import TermsConditionsModal from 'App/Components/Modals/TermsConditionsModal'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.signout = this.signout.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    this.toggleEditProfile = this.toggleEditProfile.bind(this)
    this.captureImageUri = this.captureImageUri.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
    this.toggleAddAddressModal = this.toggleAddAddressModal.bind(this)

    this.state = {
      title: '',
      editable: !props.profileComplete ? true : false,
      updateSuccessMessage: null,
      photo_uri: null,
      showTakePhotoScreen: false,
      addAddressModalVisible: false,
      termsConditionsModalVisible: false
    }
  }

  toggleAddAddressModal() {
   this.setState({ addAddressModalVisible: !this.state.addAddressModalVisible })
  }

  toggleTermsConditionsModal = () => {
    this.setState({
      termsConditionsModalVisible: !this.state.termsConditionsModalVisible
    })
  }

  openCamera() {
    if (Platform.OS === 'android') {
      requestCameraPermission()
        .then(granted => {
          console.log('----> CAMERA PERMISSIONS GRANTED ', granted)
          if (granted && this.state.editable) {
            this.setState({ showTakePhotoScreen: true })
          }
        })
        .catch(err => {
          console.log('---> CAMERA PERMISSIONS ERROR : ', err)
          return
        })
    } else if (this.state.editable) {
      this.setState({
        showTakePhotoScreen: true
      })
    }
  }

  captureImageUri(uri) {
    this.setState({ photo_uri: uri })
    this.props.changeProfilePhoto(uri)
    this.props
      .uploadProfilePhoto(uri)
      .then()
      .catch(console.log)
  }

  onRequestClose() {
    this.setState({ showTakePhotoScreen: false })
  }

  toggleEditProfile() {
    this.setState({ editable: !this.state.editable })
  }

  updateUser() {
    const {
      user: {
        last_name,
        first_name,
        phone_number,
        profile_photo: { medium }
      }
    } = this.props
    if (this.validateInputs()) {
      this.props.clearError()
      this.props.updateUser({ last_name, first_name, phone_number })
      .then( () =>{
          this.setState({ editable: false, updateSuccessMessage: 'Profile Updated Successfully' })
          setTimeout(() => {
            this.setState({updateSuccessMessage: null})}, 5000)
      })
      .catch(() => this._scrollView.scrollTo({x: 0, y: 0, animated: true}))
    }
  }

  validateInputs() {
    return this.validName() && this.validPhone()
  }

  validName() {
    if (isEmpty(get(this.props, 'user.first_name'))) {
      this.props.addProfileFirstNameError('Enter your first name')
      return false
    }
    if (isEmpty(get(this.props, 'user.last_name'))) {
      this.props.addProfileLastNameError('Enter your last name')
      return false
    }
    return true
  }

  deleteServiceAddress(id) {
    this.props
      .deleteAddress(id)
      .then(() => {
        saveUserToLocalStorage(this.props.user)
      })
      .catch(console.log)
  }

  validPhone() {
    const phone_number = get(this.props, 'user.phone_number')
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (isEmpty(phone_number)) {
      this.props.addProfilePhoneError('Enter your phone number')
      return false
    } else if (!phoneRegex.test(phone_number)) {
      this.props.addProfilePhoneError('Phone number is not valid')
      return false
    }
    return true
  }

  phoneFieldEmpty = () => {
    return !(this.props.user && this.props.user.phone_number && (this.props.user.phone_number.length >= 10));
  }

  signout() {
    this.props.signout().then(() => {
      const resetAction = NavigationActions.reset({
        index: 0, // it means change state to C which can goBack to previousView A
        actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })]
      })
      this.props.navigation.dispatch(resetAction)
    })
  }

  renderAvatar = () => {
    const user = this.props.user
    const profile_photo = user && user.profile_photo.medium
    const editable = this.state.editable
    return (
      <View style={{ alignSelf: 'center', position: 'absolute', top: 10 }}>
        {!editable && (
          <Image
            style={[styles.avatar, styles.avatarContainer]}
            source={
              profile_photo
                ? { uri: profile_photo + '?' + new Date() }
                : Images.avatar
            }
            loadingIndicatorSource={Images.loader}
          />
        )}
        {editable && (
          <TouchableHighlight
            onPress={this.openCamera.bind(this)}
            style={styles.avatarContainer}
          >
            <View>
              <Image
                style={styles.avatar}
                source={
                  profile_photo
                    ? { uri: profile_photo + '?' + new Date() }
                    : Images.avatar
                }
                loadingIndicatorSource={Images.loader}
              />
              <View style={styles.editProfile}>
                <Text style={styles.editProfileText}>Edit Photo</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      </View>
    )
  }

  render() {
    const { user, uploadingProfilePhoto } = this.props
    if (!user.token) return <View />
    const profile_photo = user && user.profile_photo.medium
    const { editable, photo_uri, updateSuccessMessage } = this.state


    return (
      <ScrollView ref={sv => (this._scrollView = sv)}>
        <Content>
          {updateSuccessMessage && (
            <View>
              <Text style={styles.successMessage}>{updateSuccessMessage}</Text>
            </View>
          )}

          <KeyboardAvoidingView>
            <ProfileSection>
              <View style={styles.container}>
                <FormControl
                  editable={editable}
                  labelText="FIRST NAME"
                  data={user && user.first_name}
                  changeInput={this.props.changeFirstName}
                  errors={this.props.errors.first_name}
                />
                <FormControl
                  editable={editable}
                  labelText="LAST NAME"
                  data={user && user.last_name}
                  changeInput={this.props.changeLastName}
                  errors={this.props.errors.last_name}
                />
                <FormControl
                  editable={false}
                  labelText="EMAIL"
                  data={user && user.email}
                />
                <FormControl
                  editable={editable}
                  labelText="PHONE"
                  placeholder="valid format: 123 123 1234"
                  data={user && user.phone_number}
                  changeInput={this.props.changePhone}
                  errors={this.props.errors.phone}
                />
                {map((address, index) => (
                  <ServiceAddressRow
                    key={index}
                    address={address}
                    index={index}
                    deleteAddress={this.deleteServiceAddress.bind(this)}
                    editable={editable}
                  />
                ), user.addresses)}
                <View style={styles.addProvider}>
                  <Button
                    transparent
                    style={styles.addButton}
                    onPress={() => {
                      this.toggleAddAddressModal()
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      {' '}
                      ADD {user.addresses.length > 0 ? 'ANOTHER' : 'A'} SERVICE
                      ADDRESS +{' '}
                    </Text>
                  </Button>
                </View>
                <AddAddressModal
                  visible={this.state.addAddressModalVisible}
                  toggle={this.toggleAddAddressModal}
                />
                <View style={styles.actionButtons}>
                  <View style={styles.activityIndicator}>
                    {this.props.updatingUser && (
                      <ActivityIndicator
                        size="large"
                        color={Colors.turtleGreen}
                      />
                    )}
                  </View>
                  {!editable ? (
                    <View>
                      <Button
                        primary
                        style={styles.button}
                        onPress={this.toggleEditProfile}
                      >
                        <Text style={styles.buttonText}>EDIT PROFILE</Text>
                      </Button>
                    </View>
                  ) : (
                    <View>
                      <Button
                        primary={!this.phoneFieldEmpty()}
                        style={[styles.button, this.phoneFieldEmpty() ? styles.disabled : '']}
                        onPress={() => {
                          if (!this.phoneFieldEmpty()) {
                            this.updateUser()
                          }
                        }}
                      >
                        <Text style={styles.buttonText}>
                          DONE EDITING PROFILE
                        </Text>
                      </Button>
                    </View>
                  )}
                  <View>
                    <Button
                      primary
                      style={styles.button}
                      onPress={() => this.signout()}
                    >
                      <Text style={styles.buttonText}>SIGN OUT </Text>
                    </Button>
                  </View>
                  <Text
                    style={styles.termsConditionsModal}
                    onPress={this.toggleTermsConditionsModal}
                  >
                    View Terms and Conditions
                  </Text>
                </View>
              </View>
            </ProfileSection>
            {this.renderAvatar()}
          </KeyboardAvoidingView>
        </Content>
        <TakePhotoScreen
          visible={this.state.showTakePhotoScreen}
          textToDisplay="TAKE YOUR PHOTO"
          onRequestClose={this.onRequestClose}
          captureImageUri={this.captureImageUri}
          cameraSide="front"
        />
        <TermsConditionsModal
          visible={this.state.termsConditionsModalVisible}
          toggle={this.toggleTermsConditionsModal}
          showAcceptDeclineButtons={false}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  user: state => get(state, 'auth.currentUser'),
  profileComplete: state => get(state, 'auth.profileComplete'),
  paymentMethodExists: state => get(state, 'payments.paymentMethodExists'),
  updatingUser: state => get(state, 'auth.updatingUser'),
  errors: state => get(state, 'auth.profile.errors'),
  uploadingProfilePhoto: state => get(state, 'auth.uploadingProfilePhoto')
})

const mapDispatchToProps = dispatch => ({
  uploadProfilePhoto: payload =>
    new Promise((resolve, reject) =>
      dispatch(Actions.uploadProfilePhotoRequest(payload, resolve, reject))
    ),
  signout: () => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.signoutRequest(resolve, reject))
    )
  },
  updateUser: payload => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.updateUserRequest(payload, resolve, reject))
    )
  },
  deleteAddress: payload => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.deleteAddressRequest(payload, resolve, reject))
    )
  },
  changeFirstName: name => dispatch(Actions.changeFirstName(name)),
  changeLastName: name => dispatch(Actions.changeLastName(name)),
  clearError: name => dispatch(Actions.clearError(name)),
  changePhone: phone_number => dispatch(Actions.changePhone(phone_number)),
  saveUser: user => dispatch(Actions.saveUser(user)),
  changeProfilePhoto: photo_uri =>
    dispatch(Actions.changeProfilePhoto(photo_uri)),
  addProfileFirstNameError: error =>
    dispatch(Actions.addProfileFirstNameError(error)),
  addProfileLastNameError: error =>
    dispatch(Actions.addProfileLastNameError(error)),
  addProfilePhoneError: error => dispatch(Actions.addProfilePhoneError(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
