import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button, Text, Content } from 'native-base'
import { get, map } from 'lodash'
import { Colors } from 'App/Themes'
import styles from './styles'
import { MainContainer, Container, HeaderNav,
  FooterNav, Section, SectionList } from 'App/Components'
import Actions from 'App/Redux/Actions'
import JobItem from './JobItem'

class Dashboard extends Component {
  static propTypes = {
    fetchJob: PropTypes.func.isRequired,
    allJobs: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchJobs()
      .catch(console.log)
    this.props.fetchUpcomingJobs()
      .catch(console.log)
  }

  gotoJobCategories = () => {
    this.props.setServiceRequestType('normal')
    this.props.navigation.navigate("JobCategories")
  }

  goToJobDetail(job) {
    this.props.setCurrentJob(job.id)
    const nextRoute = job.status == 'waiting' ? 'FindingProvider' : 'JobTimeline'
    this.props.navigation.navigate(nextRoute)
  }

  render () {
    return (
      <View style={{
        backgroundColor: Colors.grayThree,
        flex: 1
      }}>
        <Section>
          <View style={styles.buttonDescription}>
            <Text style={styles.text}>
              Find a qualified service provider now!
            </Text>
          </View>
          <Button primary
            style={{ width: '100%', height: 46, marginTop: 12 }}
            onPress={this.gotoJobCategories}
          >
            <Text style={styles.buttonText}> BOOK JOB </Text>
          </Button>
        </Section>

        <ScrollView>
          <SectionList
            title="ACTIVE JOBS"
            data={this.props.orderedActiveJobs}
            renderRow={(jobId) => {
              let job = this.props.allJobs[jobId]
              return (
                <TouchableOpacity
                  onPress={() => {this.goToJobDetail(job)}}
                >
                  <JobItem job={job} />
                </TouchableOpacity>
              )
            }}
          />

          <SectionList
            title="UPCOMING JOBS TODAY"
            data={this.props.orderedUpcomingJobs}
            renderRow={(jobId) => {
              let job = this.props.allJobs[jobId]
              return (
                <TouchableOpacity
                  onPress={() => {this.goToJobDetail(job)}}
                >
                  <JobItem job={job} />
                </TouchableOpacity>
              )
            }}
          />

          <SectionList
            title="PAST JOBS"
            data={this.props.orderedPastJobs}
            renderRow={(jobId) => {
              let job = this.props.allJobs[jobId]
              return (
                <TouchableOpacity
                  onPress={() => {this.goToJobDetail(job)}}
                >
                  <JobItem job={job} />
                </TouchableOpacity>
              )
            }}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  allJobs: (state) => get(state, 'job.allJobs'),
  orderedActiveJobs: (state) => get(state, 'job.orderedActiveJobs'),
  orderedUpcomingJobs: (state) => get(state, 'job.orderedUpcomingJobs'),
  orderedPastJobs: (state) => get(state, 'job.orderedPastJobs'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchJob: (payload) =>  new Promise((resolve, reject) =>
    dispatch(Actions.fetchJob(payload, resolve, reject))),
  fetchJobs: () => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.fetchJobsRequest(resolve, reject)))
  },
  fetchUpcomingJobs: () => {
    return new Promise ((resolve, reject) =>
      dispatch(Actions.fetchUpcomingJobsRequest(resolve, reject)))
  },
  setCurrentJob: (id) => dispatch(Actions.setCurrentJob(id)),
  setServiceRequestType: (rType) => dispatch(Actions.setServiceRequestType(rType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
