/**
*
* ServiceAddress
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import { Text, Item, Input } from 'native-base'
import { ServiceAddress, RenderIcon } from 'App/Components'
import styles from './styles'

export default class ServiceAddressRow extends Component {
  static propTypes = {}

  render() {
    const { address, index, deleteAddress, editable } = this.props
    return (
      <View key={index+10} style={{ marginTop: 15 }}>
        {editable && <View style={{ alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => deleteAddress(address.id)}>
              <RenderIcon name="delete"/>
            </TouchableOpacity>
          </View>
        </View>}
        <ServiceAddress
          editable={false}
          street={address.street_address}
          address_2={address.address_2}
          city={address.city}
          state={address.state}
          zip={address.zip}
        />
      </View>
    );
  }
}
