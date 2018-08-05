import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles'

export default class Section extends Component {
  render () {
    let propStyles = this.props.styles || {};
    return (
      <View style={[styles.section, propStyles.section]}>
        <View style={styles.sectionBody}>
          {this.props.children}
        </View>
      </View>
    )
  }
}
