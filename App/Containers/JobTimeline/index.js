import React, { Component } from 'react'
import { Image, View, ScrollView, TouchableOpacity } from 'react-native'
import { Button, Text, Content, Item, Input } from 'native-base'
import { Images, Colors, Fonts } from 'App/Themes'
import ShareModal from 'App/Components/Modals/ShareModal'
import IconRenderer from 'App/Components/IconRenderer'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, filter, last } from 'lodash'
import { MainContainer, Container, HeaderNav, FooterNav, Section, SectionList,
  AddPhotoButton, RenderIcon, ContractorBanner, JobActions,
  StatesTimeline, Loader } from 'App/Components'
import Actions from 'App/Redux/Actions'
import CancelButton from './CancelButton'
import CancelModal from './CancelModal'
import styles from './styles'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'


class JobTimeline extends Component {
  constructor(props) {
    super(props)
    this.confirmWorkCancelled = this.confirmWorkCancelled.bind(this)
    this.getLastState = this.getLastState.bind(this)
    this.toggleCancelModal = this.toggleCancelModal.bind(this)
       this.shareTimeline = this.shareTimeline.bind(this)
    this.state = {
      cancelModalVisible: false,
      updateSuccessMessage: null,
        shareModalVisible: false,
    }
  }

  getLastState() {
    const { allJobs, currentJobId } = this.props
    const currentJob = allJobs[currentJobId]
    const states = currentJob && currentJob.states
    const lastState = last(states)
    return lastState && lastState.state
  }

  toggleCancelModal() {
    this.setState({ cancelModalVisible: !this.state.cancelModalVisible })
  }

  getCurrentJob() {
    const { allJobs, currentJobId } = this.props
    return allJobs[currentJobId]
  }

  confirmWorkCancelled() {
    const { currentJobId, allJobs, jobStates, updateJobState } = this.props
    this.props.getCancelEstimateRequest({ jobId: currentJobId, allJobs: allJobs})
      .then(() => {
        this.toggleCancelModal()
        this.setState({ updateSuccessMessage: allJobs[currentJobId]['cancellation_cost'] })
        setTimeout(() => {
          this.setState({ updateSuccessMessage: null })
        }, 4000)
      })
      .catch(console.log)
  }

  shareTimeline = (email, name) => {
     this.props.shareItinerary({email: email, name: name, jobId: this.props.currentJobId})
      .then(() => {
         this.setState({ updateSuccessMessage: 'Timeline itinerary sent successfully', shareModalVisible: false })
         setTimeout(() => {
           this.setState({ updateSuccessMessage: null, shareModalVisible: false })
         }, 4000)
       })
       .catch(console.log)
  }

  toggleShareModal = () => {
    this.setState({
      shareModalVisible: !this.state.shareModalVisible,
    })
  }

  render () {
    const { allJobs, currentJobId, jobStates } = this.props
    const currentJob = allJobs[currentJobId]
    if (!currentJob) { return <Loader show={!currentJob}/> }

    const filteredStates = currentJob ? currentJob.states : []
    const lastState = this.getLastState()
    const showCancelButton = (
      lastState === jobStates.WAITING ||
      lastState === jobStates.MATCHED ||
      lastState === jobStates.ON_THE_WAY ||
      lastState === jobStates.ARRIVED ||
      lastState === jobStates.QUOTE_OFFER)

    return (
      <Container>
        <ScrollView>
          <View style={styles.screenBody}>
            <View style={{
              marginTop: 15,
              flexDirection : 'row',
              flexWrap : 'nowrap',
              justifyContent : 'space-around'
            }}>
              <ContractorBanner contractor={ currentJob.contractor } />
              <JobActions contractor={ currentJob.contractor }

            />
            </View>
            <View style={{

              flexDirection : 'row',
              marginBottom: 10

            }}>

              <TouchableOpacity
                onPress = {() => {this.toggleShareModal()}}
              >
                <RenderIcon name="share" width="35"/>
                <Text style={styles.underLineText}>Share</Text>
              </TouchableOpacity>
              <Text style={styles.underLineText}>{this.state.updateSuccessMessage}</Text>
              <ShareModal
                  visible={this.state.shareModalVisible}
                  toggle={(() => this.toggleShareModal())}
                    header="SHARE TIMELINE ITINERARY"
                  description="Share your service itinerary with friends or co-workers,
                    including provider info and job timeline. Enter the
                    email and name of the person you want to receive this itinerary:"
                  type="EMAIL"
                  buttonText="SHARE SERVICE ITINERARY"
                  submit={this.shareTimeline}
                />
            </View>

            <View style={{flexDirection: 'column', flex: 9, minHeight: 200}}>
              <StatesTimeline
                jobStates={jobStates}
                states={filteredStates}
                active={this.getLastState()}
                job={this.getCurrentJob()}
              />
            </View>
            {showCancelButton && <View style={{flex: 0.4}}>
              <CancelButton confirmWorkCancelled={this.confirmWorkCancelled} />
              <CancelModal
                visible={this.state.cancelModalVisible}
                toggle={this.toggleCancelModal}
                job={this.getCurrentJob()}
                jobStates={jobStates}
              />
              <View>
                <Text style={styles.cancellationMessage}>
                  Fee may apply
                </Text>
              </View>
            </View>}

          </View>
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentJobId: (state) => get(state, 'job.currentJobId'),
  allJobs: (state) => get(state, 'job.allJobs'),
  jobStates: (state) => get(state, 'job.jobStates'),
})

const mapDispatchToProps = (dispatch) => ({
  updateJobState: (payload) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.updateJobStateRequest(payload, resolve, reject)))
  },
  fetchJobs: () => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.fetchJobsRequest(resolve, reject)))
  },
  getCancelEstimateRequest: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.getCancelEstimateRequest(payload, resolve, reject))),
  shareItinerary: (payload) => new Promise((resolve, reject) =>
  dispatch(Actions.shareItineraryRequest(payload, resolve, reject)))
})

export default connect(mapStateToProps, mapDispatchToProps)(JobTimeline)
