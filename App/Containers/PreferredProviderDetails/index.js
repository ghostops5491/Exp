/**
 *
 * PreferredProviderDetails
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native'
import { Button, Text, Content } from 'native-base'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, filter, last } from 'lodash'
import {
  Container,
  ProfileSection,
  ThumbsGrid,
  CallModal
} from 'App/Components'
import { Images } from 'App/Themes'
import Actions from 'App/Redux/Actions'
import styles from './styles'
import Provider from '../../Components/Provider'
import phone from 'phone'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

class PreferredProviderDetails extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {
      callModalVisible: false
    }
  }

  componentDidMount() {
    this.props.getContractorInfo(this.props.currentPreferredContractor.id)
  }

  GotoBookJob = () => {
    const { currentPreferredContractor } = this.props
    this.props.setServiceRequestType('preferred')
    this.props.selectCategory(currentPreferredContractor.problem_category_id)
    this.props.selectProviderForJob(currentPreferredContractor.id)
    this.props.navigation.navigate('ScheduleJob')
  }

  handleContactNumberPressed = () => {
    const { currentPreferredContractor } = this.props
    const phoneNumber = phone(
      get(currentPreferredContractor, 'phone_number')
    )[0]
    Linking.openURL(`tel:${phoneNumber}`)
  }

  render() {
    const { currentPreferredContractor, contractorInfo } = this.props
    if (!currentPreferredContractor) return <View />
    profilePhoto = get(currentPreferredContractor, 'profile_photo.medium')
    const firstName = get(currentPreferredContractor, 'first_name')
    const lastName = get(currentPreferredContractor, 'last_name')

    return (
      <Content style={styles.background}>
        <Image
          source={profilePhoto ? { uri: profilePhoto } : Images.avatar}
          style={styles.avatar}
        />
        <ScrollView>
          <ProfileSection>
            <View style={styles.screenBody}>
              <View style={styles.providerDetailsContainer}>
                <View style={styles.providerDetailsInnerContainer}>
                  <View style={[styles.providerDetailRow]}>
                    <Provider
                      firstName={firstName}
                      lastName={lastName}
                      provider={currentPreferredContractor}
                      providerNameStyles={styles.nameFont}
                      shouldNotNavigate={true}
                      providerContainerStyles={styles.providerContainerStyles}
                      providerNameStyles={styles.providerNameStyles}
                    />
                  </View>

                  <View style={[styles.providerDetailRow]}>
                    <View style={styles.providerDetailLabelContainer}>
                      <Text style={styles.providerDetailLabel}>Company</Text>
                    </View>
                    <View style={styles.providerDetailInfoContainer}>
                      <Text style={styles.providerDetailInfo}>
                        {currentPreferredContractor.company_name}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.providerDetailRow]}>
                    <View style={styles.providerDetailLabelContainer}>
                      <Text style={styles.providerDetailLabel}>Contact</Text>
                    </View>
                    <TouchableOpacity
                      onPress={this.handleContactNumberPressed}
                      style={styles.providerDetailInfoContainer}
                    >
                      <Text
                        style={[
                          { textDecorationLine: 'underline' },
                          styles.providerDetailInfo
                        ]}
                      >
                        {phone(currentPreferredContractor.phone_number)[0]}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.licensesContainer}>
                    <Text style={styles.licensesHeader}>Licenses</Text>
                    {!!contractorInfo && !!contractorInfo.documents &&
                    !!contractorInfo.documents.length ? (
                      <ThumbsGrid
                        photosArray={contractorInfo.documents}
                        photoGridStyles={{
                          justifyContent: 'space-around',
                          flexWrap: 'wrap',
                          width: '100%'
                        }}
                        photoStyles={{width: getResponsiveCSSFrom8(200).width, height: getResponsiveCSSFrom8(200).width}}
                      />
                    ) : (
                      <Text style={styles.noDocumentsText}>None</Text>
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.padding}>
                <Button
                  primary
                  style={styles.button}
                  onPress={this.GotoBookJob}
                >
                  <Text style={styles.buttonText}> CONTACT PROVIDER </Text>
                </Button>
              </View>
            </View>
          </ProfileSection>
        </ScrollView>
      </Content>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentPreferredContractor: state =>
    get(state, 'contractor.currentPreferredContractor'),
  contractorInfo: state =>
    get(state, 'contractor.contractorInfo')
})

const mapDispatchToProps = dispatch => ({
  selectProviderForJob: payload =>
    dispatch(Actions.selectProviderForJob(payload)),
  setServiceRequestType: rType =>
    dispatch(Actions.setServiceRequestType(rType)),
  selectCategory: category => dispatch(Actions.selectProblemCategory(category)),
  getContractorInfo: contractorId => {
    return new Promise((resolve, reject) => dispatch(Actions.getContractorInfoRequest(contractorId, resolve, reject)))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  PreferredProviderDetails
)
