import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'

export default class IconRenderer extends Component {
  render () {
    return (
      <View style={styles.logoOuterContainer}>
        <View style={styles.logoContainer}>
          <TouchableOpacity>
            <View>
              {this.props.children}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
