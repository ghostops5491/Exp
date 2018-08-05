import React, { Component } from 'react'
import { Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Text, Content, Item, Input } from 'native-base'

import { connect } from 'react-redux'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { Images, Colors, Fonts } from 'App/Themes'
import styles from './styles'
import {
  CheckProviderRow,
} from 'App/Components'


import Actions from 'App/Redux/Actions'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

class SharedProvidersList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      fetchingProviders: true,
      updateSuccessMessage: null,
      requesting: false,
      providerIds: [],
      checkedIds: null,
    }
  }

  componentDidMount() {
    const {currentShareId} = this.props
    this.props.fetchSharedContractorsRequest({currentShareId: currentShareId})
      .then(() => {
        this.setState({fetchingProviders: false})
        if (!this.state.checkedIds) {this.setState({checkedIds: this.props.preferredProviders.map(function(i) { return i.id })})}
      })
      .catch(() => this.setState({fetchingProviders: false}))
  }

  acceptShare = () => {
    if (this.state.requesting) return
    this.setRequesting(true, () => {
      const {currentNotification: {notification_id}, deleteNotification} = this.props
      this.props.mergeSharedContractorsRequest({contractor_ids: this.state.checkedIds})
        .then(() => {
          this.setState({updateSuccessMessage: 'Providers have been merged'})
          deleteNotification(notification_id)
        })
        .then(() => {
          this.props.navigation.navigate('MyProviderList')
        })
    })

  }

  rejectShare = () => {
    if (this.state.requesting) return
    this.setRequesting(true, () => {
      const {currentNotification: {notification_id}, deleteNotification} = this.props
      deleteNotification(notification_id)
      this.props.navigation.navigate('MyProviderList')
    })
  }

  setRequesting = (requesting, cb) => {
    this.setState({requesting}, () => {
      if (cb) cb()
    })
  }

  toggleCheck = (id, priorState) => {
    var arr = this.state.checkedIds || []
    if (priorState) {
      arr = arr.filter(e => e !== id)
    } else {
      arr = arr.concat(id)
    }
    this.setState({checkedIds: arr})
  }

  render () {
    const {provider, preferredProviders} = this.props
    const profilePhoto = provider && get(provider, 'profile_photo.medium')
    return (
      <View visible={true} style={styles.mainContainer}>
        <View style={styles.paddedContainer}>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>
              IMPORT PROVIDERS
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              disabled={this.state.requesting}
              bordered style={styles.acceptButton}
              onPress={() => this.acceptShare()}>
              <Text style={[{color: Colors.turtleGreen}, styles.buttonsText]}> ACCEPT </Text>
            </Button>
            <Button
              disabled={this.state.requesting}
              bordered style={styles.rejectButton}
              onPress={() => this.rejectShare()}>
              <Text style={[styles.buttonsText, {color: Colors.paleRed}]}> REJECT </Text>
            </Button>
          </View>
          <View>
            <View style={styles.activityIndicator}>
              {this.state.fetchingProviders &&
              <ActivityIndicator
                size="large"
                color={Colors.turtleGreen}
              />}
            </View>
            {this.state.updateSuccessMessage &&
            <View>
              <Text style={styles.successMessage}>
                {this.state.updateSuccessMessage}
              </Text>
            </View>}
            <ScrollView>
              <View style={styles.scrollList}>
                {
                  preferredProviders.map((provider, index) =>
                    <CheckProviderRow
                      key={provider.id}
                      provider={provider}
                      checked={false}
                      checkedIds={this.state.checkedIds}
                      parentToggle={this.toggleCheck}
                    />
                  )
                }
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentShareId: (state) => get(state, 'notification.currentShareId'),
  currentNotification: (state) => get(state, 'notification.currentNotification'),
  preferredProviders: (state) => get(state, 'contractor.preferredContractors'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchSharedContractorsRequest: (currentShareId) => new Promise((resolve, reject) =>
    dispatch(Actions.fetchSharedContractorsRequest(currentShareId, resolve, reject))),
  deleteNotification: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.deleteNotificationRequest(payload, resolve, reject))),
  fetchPreferredContractorsRequest: () => new Promise((resolve, reject) =>
    dispatch(Actions.fetchPreferredContractorsRequest(resolve, reject))),
  mergeSharedContractorsRequest: (contractor_ids) => new Promise((resolve, reject) =>
    dispatch(Actions.mergeSharedContractorsRequest(contractor_ids, resolve, reject))),
})

export default connect(mapStateToProps, mapDispatchToProps)(SharedProvidersList)
