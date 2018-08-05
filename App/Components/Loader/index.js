/**
 *
 * Loader
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import { Content } from 'native-base'
import { Container } from '../'
import styles from './styles'
import Colors from '../../Themes/Colors'

const Loader = ({ show }) => {
  return show ? (
    <View style={styles.loaderContainer}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.turtleGreen} />
      </View>
    </View>
  ) : null
}

export default Loader
