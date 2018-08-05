import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Linking} from 'react-native'
import {getResponsiveCSSFrom8} from '../../Lib/Utils'
import {Content} from 'native-base'

const JOI_PAYMENTS_EMAIL = 'payments@jonnyonit.com'
export default class DisputePaymentsScreen extends Component {
  handleEmailPressed = () => {
    Linking.openURL(`mailto:${JOI_PAYMENTS_EMAIL}`)
  }

  render() {
    return (
      <View style={{
        flex: 1,
        padding: getResponsiveCSSFrom8(25).width,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{
          alignSelf: 'stretch'
        }}>
          <Text style={{padding: 10, textAlign: 'center'}}>
            If you would like to dispute this payment, please email
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: 'stretch'
            }}
            onPress={this.handleEmailPressed}>
            <Text style={{textAlign: 'center', color: 'blue'}}>
              {JOI_PAYMENTS_EMAIL}
            </Text>
          </TouchableOpacity>
          <Text style={{textAlign: 'center'}}>with your request.</Text>
        </View>
      </View>
    )
  }
}
