/**
*
* RateContractor
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Metrics } from 'App/Themes'
import { RenderIcon } from '../'
import styles from './styles'

export default class RateContractor extends Component {
  static propTypes = {
  }

  render() {
    return (
      <View style={{ display: 'flex', alignSelf: 'center', flexDirection: 'row', width: 180, marginTop: 20 }}>
        <RenderIcon name="starRatingInactive" width="35" height="35"/>
        <RenderIcon name="starRatingInactive" width="35" height="35"/>
        <RenderIcon name="starRatingInactive" width="35" height="35"/>
        <RenderIcon name="starRatingInactive" width="35" height="35"/>
        <RenderIcon name="starRatingInactive" width="35" height="35"/>
      </View>
    );
  }
}
