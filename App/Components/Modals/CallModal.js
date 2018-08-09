import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Modal, TouchableOpacity, TouchableWithoutFeedback,
  Linking } from 'react-native'
import { Button, Text, Item, Input } from 'native-base'
import styles from './styles'
import { RenderIcon } from '../'
import { Colors, Fonts, Images } from 'App/Themes'
import call from 'react-native-phone-call'

export default class CallModal extends Component {
  static propTypes = {
  }

  render() {
    const phone = (this.props.phoneNumber || '').replace(/\D/g,'');
    const callUrl = "tel:1".concat(phone)
    const smsUrl = "sms:1".concat(phone)

    return (
      <Modal animationType={"fade"} transparent={true}
        visible = {this.props.visible}
        onRequestClose = {() => { console.log("Modal has been closed.") }}>
        <TouchableWithoutFeedback onPress={() => this.props.toggle()} >
          <Text style={styles.vacantSpaceCall}> </Text>
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalInnerContainer}>
              <Text style={styles.modalTitle}>
                CONTACT CONTRACTOR
              </Text>
              <View style={styles.contactModalFlow}>
                <TouchableOpacity
                onPress={() => Linking.openURL(callUrl)}>
                >
                  <RenderIcon name="contact" width="35"/>
                  <Text style={styles.underLineText}>CALL</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  onPress={() => Linking.openURL(smsUrl)}
                >
                  <RenderIcon name="message" width="35" />
                  <Text style={styles.underLineText}>MESSAGE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => this.props.toggle()} >
          <Text style={styles.vacantSpaceCall}></Text>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
