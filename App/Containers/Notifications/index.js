/**
*
* Notifications
*
*/

import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Image, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Images } from 'App/Themes'
import { get, map } from 'lodash'
import { MainContainer, Container, HeaderNav, FooterNav,
  RenderIcon, Section } from 'App/Components'
import Actions from 'App/Redux/Actions'
import styles from './styles'

class Notifications extends Component {
  static propTypes = {
    readNotificationRequest: PropTypes.func.isRequired,
    setCurrentNotification: PropTypes.func.isRequired,
    fetchNotifications: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchNotifications()
    this.props.dismissNotificationsScreen()
    this.props.fetchJobs()
    this.props.fetchCompletedJobs()
  }

  readNotification = (item) => {
    const { notification_id, job_id, share_id, type } = item
    this.props.readNotificationRequest(notification_id)
    this.props.setCurrentNotification(notification_id)
    if (type === 'none_contractor_available') {
      this.props.navigation.navigate('ProviderNotFound')
    } else if (type === 'none_preferred_contractor_available') {
      this.props.navigation.navigate('PreferredProviderNotFound')
    } else if (type === 'quote_offer'){
      this.props.setCurrentJob(job_id)
      this.props.navigation.navigate('QuoteConfirmScreen')
    } else if (type === 'shared_provider'){
      this.props.setCurrentShare(share_id)
      this.props.navigation.navigate('SharedProvidersList')
    } else {
      this.props.fetchJobRequest({ jobId: job_id })
      .then(() => this.props.navigation.navigate('JobTimeline'))
    }
  }

  goToJob = (item) => {
    this.props.setCurrentJob(item.job_id)
    this.props.navigation.navigate("JobCompleted")
  }

  confirmClearNotification = () => {
    Alert.alert(
      'Are you sure you would like to clear all of your notifications?',
      '',
      [
        {text: 'Yes', onPress: () => this.props.clearNotifications()},
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              NOTIFICATIONS
            </Text>
          </View>
          <View style={styles.clearView}>
            <TouchableOpacity onPress={() => this.confirmClearNotification()}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View>
            {map(this.props.sortedNotifications, id => {
              const item = this.props.notifications[id];
              return <TouchableOpacity onPress={() => this.readNotification(item)}>
                <Section key={item.keyEvaluator}>
                <View style={styles.sectionRow}>
                  <View style={{ flex: 7 }}>
                    <Text style={styles.titleText}>
                      {item.title}
                    </Text>
                    {item.service_time && <Text style={styles.date}>
                      {moment(item.service_time).fromNow()}
                    </Text>}
                    {item.type === 'work_completed' &&
                      <Text
                      style={styles.unread}
                      onPress={this.goToJob.bind(this, item)}>
                        VIEW RECEIPT
                      </Text>
                    }
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {!item.read &&
                      <View style={{
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                      >
                        <RenderIcon name="unread" />
                        <Text style={styles.unread}>
                          UNREAD
                        </Text>
                      </View>
                    }
                  </View>
                </View>
                </Section>
              </TouchableOpacity>
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: get(state, 'auth.currentUser'),
  notifications: get(state, 'notification.allNotifications'),
  sortedNotifications: get(state, 'notification.sortedNotifications'),
  allJobs: get(state, 'job.allJobs')
})

const mapDispatchToProps = (dispatch) => ({
  fetchJobRequest: (payload) =>  new Promise((resolve, reject) =>
    dispatch(Actions.fetchJobRequest(payload, resolve, reject))),
  fetchJobs: () => new Promise((resolve, reject) =>
    dispatch(Actions.fetchJobsRequest(resolve, reject))),
  fetchCompletedJobs: () => new Promise((resolve, reject) =>
    dispatch(Actions.fetchCompletedJobsRequest(resolve, reject))),
  setCurrentJob: (payload) => dispatch(Actions.setCurrentJob(payload)),
  setCurrentShare: (payload) => dispatch(Actions.setCurrentShare(payload)),
  readNotificationRequest: (payload) =>  new Promise((resolve, reject) =>
    dispatch(Actions.readNotificationRequest(payload, resolve, reject))),
  setCurrentNotification: (payload) => dispatch(Actions.setCurrentNotification(payload)),
  saveNotificationsLocal: (payload) => dispatch(Actions.saveNotificationsLocal(payload)),
  fetchNotifications: () =>  new Promise((resolve, reject) =>
    dispatch(Actions.fetchNotificationsRequest(resolve, reject))),
  dismissNotificationsScreen: () => dispatch(Actions.dismissNotificationsScreen()),
  clearNotifications: () => new Promise((resolve, reject) =>
    dispatch(Actions.deleteAllNotificationsRequest(resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
