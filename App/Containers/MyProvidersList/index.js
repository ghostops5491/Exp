import React, { Component } from 'react'
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { Button, Text, Content, Item, Input } from 'native-base'

import { connect } from 'react-redux'
import { get } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { Images, Colors, Fonts } from 'App/Themes'
import styles from './styles'
import {
  Section,
  RenderIcon,
  CheckProviderRow,
} from 'App/Components'

import ShareModal from 'App/Components/Modals/ShareModal'

import Actions from 'App/Redux/Actions'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

class MyProvidersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchingProviders: true,
      shareModalVisible: false,
      updateSuccessMessage: null,
      checkedIds: null,
      checkListVisible: false,
      categories: new Set(),
    }
    this.toggleShareModal = this.toggleShareModal.bind(this)
    this.sharePreferredList = this.sharePreferredList.bind(this)
  }

  componentDidMount() {
    this.props
      .fetchPreferredContractorsRequest()
      .then(() => {
        this.setState({ fetchingProviders: false })
        if (!this.state.checkedIds) {this.setState({ checkedIds: this.props.preferredProviders.map(function(i) { return i.id }) })}
        var cats = new Set() // use Set so we don't get duplicates
        this.props.preferredProviders.forEach(function(provider) {
          cats.add(provider.problem_category)
        })
        this.setState({ categories: cats })
      })
      .catch(() => this.setState({ fetchingProviders: false }))
  }

  goToPreferredProviderDetails = provider => {
    this.props.setCurrentPreferredContractor(provider)
    this.props.navigation.navigate('PreferredProviderDetails')
  }

  toggleShareModal = () => {
    this.setState({ shareModalVisible: !this.state.shareModalVisible, checkListVisible: false })
  }

  cancelShare = () => {
    this.setState({ checkListVisible: false })
  }

  prepareToShare = () => {
    this.setState({ checkListVisible: true })
  }

  sharePreferredList(email) {
    this.toggleShareModal()
    this.props.sharePreferredListRequest({ email: email, checked_ids: this.state.checkedIds })
      .then(() => {
        this.setState({ updateSuccessMessage: 'Share email sent successfully' })
        setTimeout(() => {
          this.setState({ updateSuccessMessage: null })
        }, 4000)
      })
      .catch((e) => {
        this.setState({ error: e })
      })
  }

  toggleCheck = (id, priorState) => {
    var arr = this.state.checkedIds || []
    if (priorState) {
      arr = arr.filter(e => e !== id)
    } else {
      arr = arr.concat(id)
    }
    this.setState({ checkedIds: arr })
  }

  render() {
    const { checkedIds, checkListVisible } = this.state
    return (
      <ScrollView>
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Section>
              <View style={styles.searchInnerContainer}>
                {/* <View> */}
                <RenderIcon
                  name="search"
                  width={getResponsiveCSSFrom8(20).width}
                />
                {/* </View> */}
                {/* <View> */}
                <Input placeholder="search" style={styles.input}/>
                {/* </View> */}
              </View>
            </Section>
          </View>
          <View style={styles.shareButton}>
            <TouchableOpacity
              onPress={() => {this.prepareToShare()}}
            >
              <Section>
                <RenderIcon
                  name="share"
                  width={getResponsiveCSSFrom8(25).width}
                />
                <Text style={styles.shareText}>SHARE</Text>
              </Section>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {(this.state.fetchingProviders || this.state.requestingToShare) &&
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              size="large"
              color={Colors.turtleGreen}
            />
          </View>}
          {this.state.updateSuccessMessage &&
          <View>
            <Text style={styles.successMessage}>
              {this.state.updateSuccessMessage}
            </Text>
          </View>}
          {this.state.error && (
            <View>
              <Text style={styles.alertTitleText}>
                {this.state.error}
              </Text>
            </View>
          )}
          {this.state.checkListVisible &&
          (<View>
            <Text style={styles.successMessage}>
              Select which Providers you would like to share, then press NEXT
            </Text>
            <View style={styles.buttonsContainer}>
              <Button primary
                      style={styles.buttonCancel}
                      onPress={this.cancelShare}
              >
                <Text style={styles.buttonText}> CANCEL </Text>
              </Button>
              <Button primary
                      style={styles.buttonNext}
                      onPress={this.toggleShareModal}
              >
                <Text style={styles.buttonText}> NEXT </Text>
              </Button>
            </View>
          </View>)}
        </View>
        <View>
          {[...this.state.categories].map(category => (
            <Section>
              <View>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
              <View>
                {this.props.preferredProviders.map(provider =>
                  (provider.problem_category == category &&
                    <TouchableOpacity
                      onPress={() => {
                        this.goToPreferredProviderDetails(provider)
                      }}
                    >
                      <CheckProviderRow
                        key={provider.id}
                        provider={provider}
                        checked={false}
                        checkedIds={checkedIds}
                        parentToggle={this.toggleCheck}
                        checkListVisible={checkListVisible}
                      />
                    </TouchableOpacity>
                  ))}
              </View>
            </Section>
          ), this)}
        </View>

        <View>
          <ShareModal
            visible={this.state.shareModalVisible}
            toggle={this.toggleShareModal}
            header="SHARE PREFERRED PROVIDERS"
            description="Share your list of preferred providers with a friend or co-worker.
              Enter the email of the person you wish receive the list:"
            type="EMAIL"
            buttonText="SHARE PREFERRED PROVIDERS"
            submit={this.sharePreferredList}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  preferredProviders: state => get(state, 'contractor.preferredContractors'),
  sharePreferredListForm: state =>
    get(state, 'contractor.sharePreferredListForm'),
  errors: state => get(state, 'contractor.sharePreferredListForm.errors')
})

const mapDispatchToProps = dispatch => ({
  fetchPreferredContractorsRequest: () =>
    new Promise((resolve, reject) =>
      dispatch(Actions.fetchPreferredContractorsRequest(resolve, reject))
    ),
  setCurrentPreferredContractor: provider =>
    dispatch(Actions.setCurrentPreferredContractor(provider)),
  sharePreferredListRequest: payload =>
    new Promise((resolve, reject) =>
      dispatch(Actions.sharePreferredListRequest(payload, resolve, reject))
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProvidersList)
