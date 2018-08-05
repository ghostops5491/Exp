/**
*
* JobActions
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Images } from 'App/Themes'
import { RenderIcon } from '../'
import CallModal from '../Modals/CallModal'
import BillingModal from '../Modals/BillingModal'
import ShareModal from '../Modals/ShareModal'
import styles from './styles'

export default class JobActions extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.toggleCallModal = this.toggleCallModal.bind(this)
    this.toggleBillingModal = this.toggleBillingModal.bind(this)
    this.state = {
      callModalVisible: false,
      billingModalVisible: false,
    }
  }

  toggleCallModal() {
    this.setState({ callModalVisible: !this.state.callModalVisible });
  }

  toggleBillingModal() {
    this.setState({ billingModalVisible: !this.state.billingModalVisible });
  }

  render() {

    const { contractor } = this.props
    return (
      <View style={styles.flexFlow}>
        <View>
          <TouchableOpacity
            style={{flex : 1}}
            onPress = {() => {this.toggleCallModal()}}
          >
            <View style={styles.icon}>
              <RenderIcon name="contact" width="35"/>
            </View>
            <Text style={[styles.underLineText]}>CONTACT</Text>
          </TouchableOpacity>
          {this.props.shareButtonVisible &&
          <View>
           <View style={styles.separator} />

              </View>
              }

        </View>
        <CallModal
          visible={this.state.callModalVisible}
          toggle={this.toggleCallModal}
          phoneNumber={contractor && contractor.phone_number}
        />

        {
          /*<BillingModal
            visible={this.state.billingModalVisible}
            toggle={this.toggleBillingModal}
          />*/

        }
      </View>
    );
  }
}
