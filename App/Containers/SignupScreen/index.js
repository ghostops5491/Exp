import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { Button, Text, Form, Item, Input, Icon } from 'native-base'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import TermsConditionsModal from 'App/Components/Modals/TermsConditionsModal'
import { AuthScreenLayout, RenderIcon } from 'App/Components'
import { get, isEmpty } from 'lodash'
import Actions from 'App/Redux/Actions'
import { Colors } from 'App/Themes'
import styles from './styles'

class SignupScreen extends Component {
  static propTypes = {
    clearError: PropTypes.func.isRequired,
    addError: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      termsConditionsModalVisible: false,
      hidePassword1: true,
      hidePassword2: true
    }
  }

  componentWillMount() {
    this.props.clearForm()
  }

  signup() {
    if (this.validateInputs()) {
      this.props.clearError()
      this.toggleTermsConditionsModal()
    }
  }

  toggleTermsConditionsModal() {
    this.setState({
      termsConditionsModalVisible: !this.state.termsConditionsModalVisible
    })
  }

  acceptTerms = () => {
    const { email, password, passwordConfirmation, registerPushToken, deviceToken } = this.props

    this.toggleTermsConditionsModal()
    this.props .signup({ email, password, passwordConfirmation })
    .then(() => {
      this.props.clearForm()
      this.props.navigation.navigate('ProfileTabs')
      registerPushToken(deviceToken)
    })
    .catch(console.log)
  }

  declineTerms = () => {
    this.toggleTermsConditionsModal()
    this.props.navigation.navigate('LoginScreen')
  }

  validateInputs() {
    return this.validEmail() && this.validPassword() && this.validPasswordConfirmation()
  }

  validEmail = () => {
    const { email, addError } = this.props
    const emailRegex =/^(([^$-\/:-?{-~!"^`\[\]@\\#]+([.\-_+][^$-\/:-?{-~!"^`\[\]@\\]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (isEmpty(email)) {
      addError({ input: 'email', message: 'Please input email.' })
      return false
    } else if (!emailRegex.test(email)) {
      addError({ input: 'email', message: 'Please input valid email.' })
      return false
    }
    return true
  }

  validPassword() {
    const { password, addError } = this.props
    if (isEmpty(password)) {
      addError({ input: 'password', message: 'Please input password.' })
      return false
    } else if (password.length < 6) {
      addError({ input: 'password', message: 'Too short password. Input at least 6 characters.' })
      return false
    }
    return true
  }

  validPasswordConfirmation() {
    const { password, passwordConfirmation, addError } = this.props
    if (isEmpty(passwordConfirmation)) {
      addError({ input: 'passwordConfirmation', message: 'Please match password.' })
      return false
    } else if (password !== passwordConfirmation) {
      addError({
        input: 'passwordConfirmation',
        message: 'Password confirmation does not match with password.'
      })
      return false
    }
    return true
  }

  togglePassword = (index) => {
    if(index === 1) {
      this.setState({hidePassword1: !this.state.hidePassword1})
    } else {
      this.setState({hidePassword2: !this.state.hidePassword2})
    }
  }

  render() {
    const { error } = this.props
    const emailInputStyle = [styles.input, (error.input === 'email' && { borderColor: Colors.paleRed })]
    const passwordInputStyle = [styles.input, error.input === 'password' && { borderColor: Colors.paleRed }]
    const passwordConfirmationInputStyle = [styles.input, error.input === 'passwordConfirmation' && { borderColor: Colors.paleRed }]

    return (
      <AuthScreenLayout>
        <KeyboardAvoidingView>
          <View style={styles.formWrapper}>
            <View style={styles.hasError}>
              <Text style={styles.errorText}>
                {error && error.message}
              </Text>
            </View>
            <View>
              <Text style={styles.infoMessage}>
                Currently only serving the Atlanta, GA, metro area
              </Text>
            </View>
            <Form>
              <Item style={styles.item}>
                <View style={styles.icon}>
                  <RenderIcon name='username' />
                </View>
                <Input
                  placeholder='Email'
                  style={emailInputStyle}
                  value={this.props.email}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={(email) =>
                    this.props.changeEmail(email)}
                />
              </Item>
              <Item style={styles.item}>
                <View style={styles.icon}>
                  <RenderIcon name='password' />
                </View>
                <Input
                  placeholder='Password'
                  secureTextEntry={this.state.hidePassword1}
                  style={passwordInputStyle}
                  value={this.props.password}
                  onChangeText={(password) =>
                    this.props.changePassword(password)}
                />
                <Button style={styles.rightIcon} transparent primary onPress={() => this.togglePassword(1)}>
                  <Icon name={this.state.hidePassword1 ? 'eye' : 'eye-off'}/>
                </Button>
              </Item>
              <Item style={styles.item}>
                <View style={styles.icon}>
                  <RenderIcon name='password' />
                </View>
                <Input
                  placeholder='Password Confirmation'
                  secureTextEntry={this.state.hidePassword2}
                  style={passwordConfirmationInputStyle}
                  value={this.props.passwordConfirmation}
                  onChangeText={(passwordConfirmation) =>
                    this.props.changePasswordConfirmation(passwordConfirmation)
                  }
                />
                <Button style={styles.rightIcon} transparent primary onPress={() => this.togglePassword(2)}>
                  <Icon name={this.state.hidePassword2 ? 'eye' : 'eye-off'}/>
                </Button>
              </Item>
              <View style={styles.activityIndicator}>
                {this.props.signingUp &&
                  <ActivityIndicator
                    size="large"
                    color={Colors.turtleGreen}
                  />}
              </View>
              <Item style={styles.item}>
                <Button primary
                  style={styles.loginButton}
                  onPress={() => this.signup()}
                >
                  <Text style={styles.loginButtonText}> SIGN UP </Text>
                </Button>
              </Item>
            </Form>
            <View style={styles.signInLine}>
              <Text style={styles.signInText}>
                Already have account?
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('LoginScreen')}
              >
                <Text style={styles.signInLink}>
                  Log In!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TermsConditionsModal
            visible={this.state.termsConditionsModalVisible}
            acceptTerms={this.acceptTerms}
            declineTerms={this.declineTerms}
            showAcceptDeclineButtons={true}
          />
        </KeyboardAvoidingView>
      </AuthScreenLayout>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  error: (state) => get(state, 'auth.form.error'),
  email: (state) => get(state, 'auth.form.email'),
  password: (state) => get(state, 'auth.form.password'),
  passwordConfirmation: (state) => get(state, 'auth.form.passwordConfirmation'),
  deviceToken: (state) => get(state, 'notification.deviceToken'),
  signingUp: (state) => get(state, 'auth.signingUp'),
  paymentMethodExists: (state) => get(state, 'payments.paymentMethodExists'),
  profileComplete: (state) => get(state, 'auth.profileComplete')
})

const mapDispatchToProps = dispatch => ({
  registerPushToken: (payload)  =>
    dispatch(Actions.registerPushTokenRequest(payload)),
  clearError: (payload)  => dispatch(Actions.clearError(payload)),
  addError: (payload)  => dispatch(Actions.addError(payload)),
  signup: (payload)  => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.signupRequest(payload, resolve, reject)))
  },
  changeEmail: (email) => dispatch(Actions.changeEmail(email)),
  changePassword: (password) => dispatch(Actions.changePassword(password)),
  changePasswordConfirmation: (passwordConfirmation) =>
    dispatch(Actions.changePasswordConfirmation(passwordConfirmation)),
  clearForm: (email) => dispatch(Actions.clearForm(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
