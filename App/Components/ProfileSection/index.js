import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles'

export default class ProfileSection extends Component {
  render () {
    return (
      <View style={styles.section}>
        <View style={styles.sectionBody}>
          {this.props.children}
        </View>
      </View>
    )
  }
}
