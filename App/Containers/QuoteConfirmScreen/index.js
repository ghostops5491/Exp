import React, { Component } from 'react';
import { View, Modal, Image, } from 'react-native'
import { Button, Text } from 'native-base'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { get } from 'lodash'
import styles from './styles'
import { Colors, Images } from 'App/Themes'
import Actions from 'App/Redux/Actions'

class QuoteConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requesting: false
    }
  }

  componentWillMount() {
    this.props.fetchNotifications()
    let { currentJobId } = this.props
    this.props.fetchInvoice(currentJobId)
  }

  acceptQuote = () => {
    if (this.state.requesting) return
    this.setRequesting(true, () => {
      const { currentJobId, deleteNotification } = this.props
      this.props.respondQuote({ quoteResponse: 'quote_confirmed', jobId: currentJobId })
      .then(() => {
        let notification_id = this.getNotification()
        if (notification_id) {
          deleteNotification(notification_id)
        }
        this.props.navigation.navigate('JobTimeline')
      })
    })
  }

  rejectQuote = () => {
    if (this.state.requesting) return
    this.setRequesting(true, () => {
      const { currentJobId, deleteNotification } = this.props
      this.props.respondQuote({ quoteResponse: 'quote_rejected', jobId: currentJobId })
        .then(() => {
          let notification_id = this.getNotification()
          if (notification_id) {
            deleteNotification(notification_id)
          }
          this.props.navigation.navigate('Dashboard')
        })
    })
  }

  getNotification = () => {
    const { currentNotification, currentJobId } = this.props
    if (currentNotification) {
      return currentNotification.notification_id
    } else {
      let quoteNotification = null
      Object.keys(this.props.notifications).map((notification_id) => {
        let notification = this.props.notifications[notification_id]
        if (notification.job_id === currentJobId && notification.type === 'quote_offer') {
          quoteNotification = notification
        }
      })
      return quoteNotification ? quoteNotification.notification_id : null;
    }
  }

  setRequesting = (requesting, cb) => {
    this.setState({ requesting }, () => {
      if (cb) cb();
    });
  }

  render() {
    const { allJobs, currentJobId } = this.props
    const currentJob = allJobs[currentJobId]

    if (!currentJob) {
      return (
        <View>
          <Text style={styles.missingJob}>We cannot find the job, please reload the application.</Text>
        </View>
      )
    }

    let quoteAmount = 0;
    this.props.invoice.forEach(invoiceItem => quoteAmount += Number(invoiceItem.amount*invoiceItem.quantity))

    const contractor = currentJob.contractor

    return (
      <View visible={true} style={styles.mainContainer}>
        <View style={styles.paddedContainer}>
          <View style={styles.jobCategoryView}>
            <Text style={styles.jobCategoryText}>
              {get(currentJob, 'job_type.title')}
            </Text>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>
              CONFIRM QUOTE
            </Text>
          </View>
          <View style={styles.contractorInfo}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.imageAvatar}
                source={ contractor.profile_photo.medium  ?
                  { uri: contractor.profile_photo.medium } : Images.avatar}
              />
            </View>
            <View style={styles.description}>
              <Text style={styles.boldBlueText}>
                {contractor.first_name+" "+contractor.last_name}
              </Text>
            </View>
          </View>
          <View style={styles.materialsTable}>
            { this.props.invoice.map((invoiceItem) => {
              return (
                <View style={styles.materialRow}>
                  <Text style={styles.materialName}>
                    {invoiceItem.label}
                  </Text>
                  <Text style={styles.materialCost}>
                   ${(invoiceItem.amount*invoiceItem.quantity).toFixed(2)}
                  </Text>
                </View>
              )
            })}
            <View style={styles.ruler}></View>
            <View style={styles.materialRow}>
              <Text style={styles.materialName}>
                Total
              </Text>
              <Text style={[styles.materialCost, {fontFamily: 'Roboto-Bold'}]}>
                ${quoteAmount.toFixed(2)}
              </Text>
            </View>

          </View>
          <View style={styles.buttonsContainer}>
          <Button
            disabled={this.state.requesting}
            bordered style={styles.acceptButton}
            onPress={() => this.acceptQuote()}>
              <Text style={[{ color: Colors.turtleGreen }, styles.buttonsText] }> ACCEPT </Text>
          </Button>
          <Button
            disabled={this.state.requesting}
            bordered style={styles.rejectButton}
            onPress={() => this.rejectQuote()}>
              <Text style={[styles.buttonsText, { color: Colors.paleRed }]}> REJECT </Text>
          </Button>
          </View>
        </View>
      </View>
     )
  }
}

const mapStateToProps = createStructuredSelector({
  allJobs: (state) => get(state, 'job.allJobs'),
  currentJobId: (state) => get(state, 'job.currentJobId'),
  invoice: (state) => get(state, 'invoice.current'),
  notifications: (state) => get(state, 'notification.allNotifications'),
  currentNotification: (state) => get(state, 'notification.currentNotification'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchInvoice: (currentJobId) => new Promise((resolve, reject) =>
    dispatch(Actions.fetchInvoiceRequest(currentJobId, resolve, reject))),
  respondQuote: (serviceRequest) => new Promise((resolve, reject) =>
    dispatch(Actions.acceptQuoteRequest(serviceRequest, resolve, reject))),
  deleteNotification: (payload) =>  new Promise((resolve, reject) =>
    dispatch(Actions.deleteNotificationRequest(payload, resolve, reject))),
  fetchNotifications: () =>  new Promise((resolve, reject) =>
    dispatch(Actions.fetchNotificationsRequest(resolve, reject))),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuoteConfirmScreen)
