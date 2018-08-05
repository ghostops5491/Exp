import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { View, TouchableOpacity, ScrollView, KeyboardAvoidingView,
  ActivityIndicator } from 'react-native'
import { Button, Text, Form, Item, Input } from 'native-base'
import { get, isEmpty } from 'lodash'
import { AuthScreenLayout, RenderIcon } from 'App/Components'
import { Colors } from 'App/Themes'
import styles from './styles'
import Actions from 'App/Redux/Actions'

class ForgotPasswordScreen extends Component {
  static propTypes = {
    clearError: PropTypes.func.isRequired,
    addError: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.clearForm()
  }

  forgotPassword() {
    const { email, clearError, clearForm } = this.props
    if (this.validateInputs()) {
      clearError()
      this.props.forgotPassword(email)
      .then(() => {
        clearForm()
        this.props.navigation.navigate('ForgotPasswordProcessing')
      })
      .catch(console.log)
    }
  }

  validateInputs() {
    return this.validEmail()
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

  render () {
    const { error } = this.props
    const emailInputStyle = [styles.input, (error.input === 'email' && { borderColor: Colors.paleRed })]

    return (
        <AuthScreenLayout>
          <KeyboardAvoidingView>
            <View style={styles.formWrapper}>
              <View style={styles.hasError}>
                <Text style={styles.errorText}>
                  {error && error.message}
                </Text>
              </View>
              <Form>
                <Item style={styles.item}>
                  <View style={styles.icon}>
                    <RenderIcon name="username"/>
                  </View>
                  <Input
                    placeholder="Email"
                    style={emailInputStyle}
                    value={this.props.email}
                    keyboardType="email-address"
                    autoCapitalize='none'
                    onChangeText={(email) =>
                      this.props.changeEmail(email)}
                  />
                </Item>
                <View style={styles.activityIndicator}>
                  {this.props.requesting &&
                    <ActivityIndicator
                      size="large"
                      color={Colors.turtleGreen}
                    />}
                </View>
                <Item style={styles.item}>
                  <Button primary
                    style={styles.forgotPasswordButton}
                    onPress={() => this.forgotPassword()}
                  >
                    <Text style={styles.forgotPasswordButtonText}> RESET PASSWORD </Text>
                  </Button>
                </Item>
              </Form>
              <View style={styles.signUpLine}>
                <Text style={styles.signUpText}>
                  Have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('LoginScreen')}
                >
                  <Text style={styles.signUpLink}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signUpLine}>
                <Text style={styles.signUpText}>
                  New to Jonny On It?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SignupScreen')}
                >
                  <Text style={styles.signUpLink}>
                    Sign Up now!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </AuthScreenLayout>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  error: (state) => get(state, 'auth.form.error'),
  email: (state) => get(state, 'auth.form.email'),
  currentUser: (state) => get(state, 'auth.currentUser'),
  requesting: (state) => get(state, 'auth.requesting')
})

const mapDispatchToProps = (dispatch) => ({
  clearError: (payload) => dispatch(Actions.clearError(payload)),
  addError: (payload) => dispatch(Actions.addError(payload)),
  forgotPassword: (email, password) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.forgotPasswordRequest(email, resolve, reject)))
  },
  changeEmail: (email) => dispatch(Actions.changeEmail(email)),
  clearForm: (email) => dispatch(Actions.clearForm(Actions.email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
