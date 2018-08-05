/**
*
* RenderIcon
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { Images } from 'App/Themes'
import styles from './styles'

export default class RenderIcon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    width: PropTypes.string,
  }

  render() {
    const iconWidth = Number(this.props.width) || 25
    const iconHeight = Number(this.props.height) || 25
    return (
      <View style={[{height: iconHeight}, styles.container]}>
        <Image source={Images[this.props.name]}
          style={[styles.icon, { width: iconWidth, height: iconHeight }]}/>
      </View>
    );
  }
}
