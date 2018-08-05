/**
 *
 * CancelModal
 *
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {get, last, isEmpty} from 'lodash'
import PropTypes from 'prop-types'
import {View, Modal} from 'react-native'
import {Button, Text, Item, Input} from 'native-base'
import styles from './styles'
import Actions from 'App/Redux/Actions'

class CancelModal extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm = (e) => {
    e.preventDefault()
    this.props.toggle()
    const {currentJobId, jobStates} = this.props
    this.props.updateJobState({jobId: currentJobId, state: jobStates.WORK_CANCELLED})
      .then(() => {
        this.props.navigation.navigate('Dashboard')
      })
      .catch(console.log)
  }

  close = () => {
    this.props.toggle()
  }

  render() {
    const {job} = this.props
    const estimate = job['cancellation_cost']
    //const estimate = 15
    return (
      <Modal animationType={"fade"} transparent={true}
             visible={this.props.visible}
             onRequestClose={() => {
               console.log("Modal has been closed.")
             }}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalInnerContainer}>
              <Text
                style={styles.closeButton}
                onPress={this.close}
              >X</Text>
              <Text style={styles.modalTitle}>
                CANCEL JOB
              </Text>
              <Text style={styles.modalText}>
                Cancelling this job now may incur an additional charge of ${estimate}
              </Text>
              <Button primary
                      style={styles.button}
                      onPress={this.onConfirm}
              >
                <Text style={{width: '100%', fontWeight: "bold"}}>
                  CONFIRM CANCEL
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: (state) => get(state, 'auth.currentUser'),
  currentJobId: (state) => get(state, 'job.currentJobId'),
  cancellation_cost: (state) => get(state, 'job.cancellation_cost'),
})

const mapDispatchToProps = (dispatch) => ({
  updateJobState: (payload) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.updateJobStateRequest(payload, resolve, reject)))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CancelModal)
