/**
*
* AddAddressModal
*
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, last, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { View, Modal } from 'react-native'
import { Button, Text, Item, Input } from 'native-base'
import { ServiceAddress } from 'App/Components'
import { saveUserToLocalStorage } from 'App/Lib/Auth'
import styles from './styles'
import Actions from 'App/Redux/Actions'

class AddAddressModal extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.onConfirm = this.onConfirm.bind(this)
  }

  onConfirm = (e) => {
    e.preventDefault()
    if(this.validateInputFields()) {
      this.props.toggle()
      const { streetAddress, address2, state, city, zip } = this.props
      this.props.createAddress({
        street_address: streetAddress,
        address_2: address2,
        city,
        state: state,
        zip
      })
      .then(() => saveUserToLocalStorage(this.props.user))
    }
  }

  validateInputFields = () => {
    const { streetAddress, city, zip, state } = this.props

    if (isEmpty(streetAddress)) {
      this.props.addStreetValidationError('Street cannot be empty')
      return false
    }

    if (isEmpty(city)) {
      this.props.addCityValidationError('City cannot be empty')
      return false
    }

    if (isEmpty(state)) {
      this.props.addStateValidationError('State cannot be empty')
      return false
    }

    if (isEmpty(zip)) {
      this.props.addZipValidationError('Zipcode cannot be empty')
      return false
    }

    if (zip.length < 5) {
      this.props.addZipValidationError('Must enter a valid Zipcode')
      return false
    }

    return true
  }

  close = () => {
    this.props.toggle()
  }

  render() {
    return (
      <Modal animationType = {"fade"} transparent = {true}
       visible={this.props.visible}
       address={this.props.address}
       onRequestClose = {() => { console.log("Modal has been closed.") } }>
       <View style={styles.modalContainer}>
        <View style={styles.modal}>
           <View style={styles.modalInnerContainer}>
              <Text
                style={styles.closeButton}
                onPress={this.close}
               >X</Text>
              <Text style={styles.modalTitle}>
                ADD SERVICE ADDRESS
              </Text>
              <ServiceAddress
                street={this.props.streetAddress}
                address2={this.props.address2}
                city={this.props.city}
                state={this.props.state}
                zip={this.props.zip}
                onChangeStreet={ text => this.props.changeStreet(text) }
                onChangeAddress2={ text => this.props.changeAddress2(text) }
                onChangeCity={ text => this.props.changeCity(text) }
                onChangeState={ text => this.props.changeState(text) }
                onChangeZip={ text => this.props.changeZip(text) }
                validationErrors={this.props.validationErrors}
                editable={true}
                displayError={true}
              />
              <View style={styles.hasError}>
                <Text style={styles.errorText}>
                {!isEmpty(this.props.validationErrors)
                  ? (
                    this.props.validationErrors.street ||
                    this.props.validationErrors.state ||
                    this.props.validationErrors.city ||
                    this.props.validationErrors.zip
                  ): ''
                }
                </Text>
              </View>
              <Button primary
                style={styles.button}
                onPress={this.onConfirm}
              >
                 <Text style={{width: '100%', fontWeight: "bold" }}>
                  CONFIRM ADDITION
                 </Text>
              </Button>
           </View>
        </View>
       </View>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: (state) => get(state, 'auth.currentUser'),
  streetAddress: (state) => get(state, 'address.form.street'),
  address2: (state) => get(state, 'address.form.address2'),
  city: (state) => get(state, 'address.form.city'),
  state: (state) => get(state, 'address.form.state'),
  zip: (state) => get(state, 'address.form.zip'),
  validationErrors: (state) => get(state, 'address.errors'),
})

const mapDispatchToProps = (dispatch) => ({
  createAddress: (address) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.createAddressRequest(address, resolve, reject)))
  },
  changeStreet: (street) => dispatch(Actions.changeStreet(street)),
  changeAddress2: (address2) => dispatch(Actions.changeAddress2(address2)),
  changeCity: (city) => dispatch(Actions.changeCity(city)),
  changeState: (state) => dispatch(Actions.changeState(state)),
  changeZip: (zip) => dispatch(Actions.changeZip(zip)),
  addStreetValidationError: (error) => dispatch(Actions.addStreetValidationError(error)),
  addStateValidationError: (error) => dispatch(Actions.addStateValidationError(error)),
  addCityValidationError: (error) => dispatch(Actions.addCityValidationError(error)),
  addZipValidationError: (error) => dispatch(Actions.addZipValidationError(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressModal)
