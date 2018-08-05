import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Button, Text, Container, Content } from 'native-base'
import { map } from 'lodash'
import Section from '../Section'
import styles from './styles'

export default class SectionList extends Component {
  static propTypes = {
    data: PropTypes.array,
    keyEvaluator: PropTypes.string,
  }
  render () {
    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
        <View>
          {map(this.props.data, item => (
            <Section key={ item.id ? item.id : item}>
              {this.props.renderRow(item)}
            </Section>
          ))}
        </View>
      </View>
    )
  }
}
