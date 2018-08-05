import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, last, isEmpty } from 'lodash'
import { emailRegex, phoneRegex } from 'App/Lib/Regex'
import { Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Text, Content, Item, Input } from 'native-base'
import { Images, Colors, Fonts } from 'App/Themes'
import styles from './styles'
import FormControl from 'App/Components/FormControl'
import { MainContainer, Container, HeaderNav, FooterNav, Section,
  SectionList } from 'App/Components'
import Actions from 'App/Redux/Actions'

class InviteProviders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updateSuccessMessage: null
    }
  }

  componentWillMount() {
    this.props.clearForm()
  }

  inviteContractor = () => {

    const { inviteContractorsForm, clearError } = this.props
    if (this.validateInputs()) {
      clearError()

      const invitee_name = get(this.props, 'inviteContractorsForm.name')
      const invitee_email = get(this.props, 'inviteContractorsForm.email')
      const phone_number = get(this.props, 'inviteContractorsForm.phone')

      this.props.invitePreferredContractorRequest({ invitee_email, invitee_name, phone_number })
      .then(() => {
        this.props.clearForm()
        this.setState({  updateSuccessMessage: "Invitation email sent successfully"})
        setTimeout(() => {
          this.setState({updateSuccessMessage: null})}, 5000)
      })
      .catch(console.log)
    }
  }

  validateInputs = () => {
    return this.validName() && this.validEmail() && this.validPhone()
  }

  validName = () => {
    const name = get(this.props, 'inviteContractorsForm.name')
    if (isEmpty(name)) {
      this.props.addNameError("Enter Provider's name")
      return false
    }
    else {
      this.props.clearError()
      return true
    }
  }

  validEmail = () => {
    const email = get(this.props, 'inviteContractorsForm.email')
    if (isEmpty(email)) {
      this.props.addEmailError("Enter Provider's email")
      return false
    } else if (!emailRegex.test(email)) {
      this.props.addEmailError("Enter valid Provider's email")
      return false
    }
    else {
      this.props.clearError()
      return true
    }
  }

  validPhone = () => {
    const phoneNumber = get(this.props, 'inviteContractorsForm.phone')
    if (isEmpty(phoneNumber)) {
      this.props.addPhoneError("Enter Provider's phone number")
      return false
    }
    else if (!phoneRegex.test(phoneNumber)) {
      this.props.addPhoneError("Phone number format is not valid. \r (use format:  123 123 1234\)")
      return false
    }
    else {
      this.props.clearError()
      return true
    }
  }

  render () {
    const { inviteContractorsForm, changeName, changeEmail, changePhone, errors } = this.props
    return (
      <ScrollView>
        {this.state.updateSuccessMessage &&
        <View>
          <Text style={styles.successMessage}>
            {this.state.updateSuccessMessage}
          </Text>
        </View>}

        <View style={styles.container}>
          <View>
            <Text style={styles.mainProvidersTitle}>
              Enter the service provider’s information below
            </Text>
          </View>

          <View style={{height: 40}}>
            {this.props.requestingToInvite &&
              <ActivityIndicator
              size='large'
              color={Colors.turtleGreen}
              />
            }
          </View>
          <FormControl
            labelText="FULL NAME"
            data={inviteContractorsForm.name}
            changeInput={changeName}
            errors={errors.name}
          />
          <FormControl
            labelText="EMAIL"
            data={inviteContractorsForm.email}
            changeInput={changeEmail}
            errors={errors.email}
          />
          <FormControl
            labelText="PHONE"
            data={inviteContractorsForm.phone}
            changeInput={changePhone}
            errors={errors.phone}
          />

          <View>
            <Button primary style={styles.button}
              onPress={() => this.inviteContractor()}
            >
              <Text style={styles.buttonText}>
                INVITE PROVIDER </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  inviteContractorsForm: get(state, 'contractor.inviteContractorsForm'),
  errors: get(state, 'contractor.inviteContractorsForm.errors'),
  requestingToInvite: get(state, 'contractor.requestingToInvite')
})

const mapDispatchToProps = (dispatch) => ({
  changeName: (name) => dispatch(Actions.changeContractorName(name)),
  changeEmail: (email) => dispatch(Actions.changeContractorEmail(email)),
  changePhone: (phone) => dispatch(Actions.changeContractorPhone(phone)),
  addNameError: (error) => dispatch(Actions.addInviteProviderNameError(error)),
  addEmailError: (error) => dispatch(Actions.addInviteProviderEmailError(error)),
  addPhoneError: (error) => dispatch(Actions.addInviteProviderPhoneError(error)),
  clearError: (error) => dispatch(Actions.clearInviteProviderError(error)),
  invitePreferredContractorRequest: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.invitePreferredContractorRequest(payload, resolve, reject))),
  clearForm: () => dispatch(Actions.clearInviteForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(InviteProviders)
