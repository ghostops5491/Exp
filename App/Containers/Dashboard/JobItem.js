/**
*
* JobItem
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import moment from 'moment'
import styles from './styles'

export default class JobItem extends Component {
  static propTypes = {
    job: PropTypes.object.isRequired,
  }

  timeFromNow() {
    const { job } = this.props
    return moment(job.service_time).fromNow()
  }

  render() {
    const { job } = this.props
    return (
      <View style={styles.jobItem}>
        <View style={styles.flowDirection}>
          <Text style={styles.jobTitle}>{job.job_type.title}</Text>
          <Text style={styles.jobTimer}>{this.timeFromNow()}</Text>
        </View>
        <Text style={styles.jobAddress}>
          {job.service_address.street_address}
        </Text>
      </View>
    );
  }
}
