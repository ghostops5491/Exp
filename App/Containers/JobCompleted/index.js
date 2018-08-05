import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { createStructuredSelector } from 'reselect'
import { get, last, map, find } from 'lodash'
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { Button, Text, Form, Item, Input, Content } from 'native-base'
import {
  MainContainer,
  Container,
  HeaderNav,
  FooterNav,
  Section,
  SectionList,
  ContractorBanner,
  JobActions,
  StatesTimeline,
  RateContractor,
  ServiceAddress,
  FormControl,
  PhotoGrid
} from 'App/Components'
import { Images, Colors } from 'App/Themes'
import styles from './styles'
import Actions from 'App/Redux/Actions'
import DebugConfig from '../../Config/DebugConfig'
import { SCREEN_NAMES } from '../../Navigation/AppNavigation'

class JobCompleted extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      addedAsPrefferredProvider: false
    }
    this.addPreferredContractor = this.addPreferredContractor.bind(this)
    this.shouldShowAddButton = this.shouldShowAddButton.bind(this)
  }

  changeTitle(title) {
    this.setState({ title })
  }

  addPreferredContractor(contractor) {
    this.props
      .addPreferredContractorRequest({ contractor_id: contractor.id })
      .then(() => {
        this.setState({
          addedAsPrefferredProvider: true
        })
      })
      .catch(console.log)
  }

  shouldShowAddButton(contractor) {
    return !find(this.props.preferredContractors, p => p.id === contractor.id)
  }

  navigateToDisputePage = () => {
    this.props.navigation.navigate(SCREEN_NAMES.DisputePaymentsScreen)
  }

  render() {
    const { allJobs, currentJobId } = this.props
    const currentJob = allJobs[currentJobId]
    const preServicePhotos = currentJob.photos ? currentJob.photos.filter(photo => photo.photo_type === 'pre_service') : []
    const postServicePhotos = currentJob.photos ? currentJob.photos.filter(photo => photo.photo_type === 'post_service') : []

    if (!currentJob) {
      return <View />
    }
    const filteredStates = currentJob.states
    const {
      service_address,
      customer,
      job_type,
      urgency,
      materials,
      estimate,
      labor,
      materials_cost,
      photos,
      contractor
    } = currentJob
    const total = parseFloat(materials_cost) + parseFloat(labor)
    return (
      <Container>
        <ScrollView>
          <View style={{ padding: 15 }}>
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-around'
              }}
            >
              <ContractorBanner contractor={currentJob.contractor} />
              <JobActions contractor={currentJob.contractor} />
            </View>
            <View style={{ alignItems: 'center', paddingBottom: 20 }}>
              <View>
                <Text style={styles.estimate}>{'$' + total.toFixed(2)}</Text>
              </View>
              <View>
                <Text style={styles.finalPrice}>FINAL PRICE</Text>
              </View>
            </View>
            <View>
              <ServiceAddress
                labelText="SERVICE ADDRESS"
                street={service_address.street_address}
                city={service_address.city}
                state={service_address.state}
                zip={service_address.zip}
                editable={false}
              />
              <FormControl
                editable={false}
                labelText="JOB TYPE"
                placeholder="Job Type"
                data={job_type.title}
              />
              <View>
                <View>
                  <Text style={styles.jobAddressTitle}>INVOICE</Text>
                </View>
                <View style={styles.totalAmountOuterContainer}>
                  <View style={styles.totalAmountInnerContainer}>
                    <View>
                      <Text style={styles.jobAddressTitle}>MATERIALS</Text>
                      <Text style={styles.jobAddressTitle}>LABLOR</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <Text style={styles.descriptionText}>
                        ${materials_cost}
                      </Text>
                      <Text style={styles.descriptionText}>${labor}</Text>
                    </View>
                  </View>
                  <View style={styles.totalAmount}>
                    <Text style={styles.jobAddressTitle}>TOTAL</Text>
                    <Text style={styles.descriptionText}>${total.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
              <View>
                <View>
                  <Text style={styles.jobAddressTitle}>PHOTOS</Text>
                  {
                    preServicePhotos.length > 0 &&
                    <View>
                      <Text style={styles.photoLabel}>Before</Text>
                      <PhotoGrid photosArray={preServicePhotos} />
                    </View>
                  }
                  {
                    postServicePhotos.length > 0 &&
                    <View>
                      <Text style={styles.photoLabel}>After</Text>
                      <PhotoGrid photosArray={postServicePhotos} />
                    </View>
                  }
                </View>
              </View>
              <View style={{ height: 40 }}>
                {this.props.requestingToAdd && (
                  <ActivityIndicator
                    size="large"
                    color={Colors.turtleGreen}
                  />
                )}
              </View>
              {this.shouldShowAddButton(contractor) &&
                !this.state.addedAsPrefferredProvider && (
                  <Button
                    primary
                    style={styles.button}
                    onPress={() => this.addPreferredContractor(contractor)}
                  >
                    <Text style={{ width: '100%', fontWeight: 'bold' }}>
                      ADD AS PREFERRED PROVIDER{' '}
                    </Text>
                  </Button>
                )}
              {DebugConfig.featureFlags.disputePayments && (
                <Button
                  style={styles.disputeButton}
                  onPress={this.navigateToDisputePage}
                >
                  <Text style={styles.disputeButtonText}>
                    DISPUTE PAYMENT{' '}
                  </Text>
                </Button>
              )}
            </View>
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentJobId: state => get(state, 'job.currentJobId'),
  requestingToAdd: state => get(state, 'contractor.requestingToAdd'),
  allJobs: state => get(state, 'job.allJobs'),
  jobStates: state => get(state, 'job.jobStates'),
  preferredContractors: state => get(state, 'contractor.preferredContractors')
})

const mapDispatchToProps = dispatch => ({
  addPreferredContractorRequest: payload =>
    new Promise((resolve, reject) =>
      dispatch(Actions.addPreferredContractorRequest(payload, resolve, reject))
    ),

  updateJobState: payload =>
    new Promise((resolve, reject) =>
      dispatch(Actions.updateJobStateRequest(payload, resolve, reject))
    )
})

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(JobCompleted)
)
