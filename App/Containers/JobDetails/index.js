import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, filter } from 'lodash'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
  Platform,
  PermissionsAndroid
} from 'react-native'
import { Button, Text, Content, Form, Item, Input, Picker } from 'native-base'
import {
  MainContainer,
  Container,
  HeaderNav,
  FooterNav,
  Section,
  SectionList,
  AddPhotoButton,
  TakePhotoScreen,
  PhotoGrid
} from 'App/Components'
import { Images, Colors } from 'App/Themes'
import styles from './styles'
import ModalDropdown from 'react-native-modal-dropdown'
import Actions from 'App/Redux/Actions'
import { map } from 'App/Lib/lodash'
import { getResponsiveCSSFrom8, requestCameraPermission } from '../../Lib/Utils'

class JobDetails extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.getProblems = this.getProblems.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.renderDropdownRow = this.renderDropdownRow.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.captureImageUri = this.captureImageUri.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
    this.state = {
      photo_uri: null,
      showTakePhotoScreen: false,
      problemNotSelected: null
    }
  }

  componentWillMount() {
    const { categoryId } = this.props
    this.props.fetchProblems(categoryId).catch(console.log)
  }

  openCamera() {
    if (Platform.OS === 'android') {
      requestCameraPermission()
        .then(granted => {
          console.log('---> CAMERA PERMISSIONS GRANTED : ()', granted)
          if (granted) this.setState({ showTakePhotoScreen: true })
        })
        .catch(err => {
          if (err.JOI_Error) {
            console.log(
              '---> CAMERA PERMISSIONS NOT GRANTED : ',
              err.rejectedPermissions
            )
          }
          return
        })
    } else this.setState({ showTakePhotoScreen: true })
  }

  captureImageUri(uri) {
    this.setState({ photo_uri: uri })
    this.props.addProblemPhoto(uri)
  }

  onRequestClose() {
    this.setState({ showTakePhotoScreen: false })
  }

  getProblems() {
    return map(p => p.title, this.props.problems)
  }

  onSelect(index, item) {
    const { problems, selectProblem } = this.props
    this.setState({ problemNotSelected: null })
    filter(problems, p => p.title === item && selectProblem(p.id))
  }

  onNext() {
    const { selectedProblem } = this.props
    if (!selectedProblem) {
      this.setState({ problemNotSelected: true })
      return
    }
    this.props.navigation.navigate('JobEstimates')
  }

  render() {
    const { photo_uri } = this.state
    const { photoURIs } = this.props

    return (
      <Container>
        <ScrollView>
          <View
            style={{
              padding: 15
            }}
          >
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset="0"
            >
              <View>
                <Text style={styles.titleText}>WHEN DO YOU NEED HELP?</Text>
              </View>
              <View>
                <Text style={styles.scheduleJobText}>
                  Tell us more about your need. Attach photos of any problem
                  areas here.
                </Text>
              </View>
              <Form>
                <View>
                  <View>
                    <Text style={styles.subheadingTitleText}>
                      WHATS THE PROBLEM?
                    </Text>
                  </View>
                  <Item style={styles.item}>
                    <View style={styles.input}>
                      <ModalDropdown
                        options={this.getProblems()}
                        renderRow={this.renderDropdownRow}
                        style={styles.addressContainer}
                        animated={false}
                        textStyle={styles.problemCategoryDropdownTextStyle}
                        onSelect={this.onSelect}
                        dropdownStyle={
                          styles.problemCategoryDropdownDropdownStyle
                        }
                      />
                    </View>
                  </Item>
                  <View style={styles.hasError}>
                    {get(this.state, 'problemNotSelected') && (
                      <Text style={styles.errorText}>Select a problem</Text>
                    )}
                  </View>
                </View>
                <View>
                  <View style={styles.notesWrapper}>
                    <Text style={styles.subheadingTitleText}>
                      ADDITIONAL NOTES
                    </Text>
                    <Text style={styles.notesCounter}>{this.props.notes ? this.props.notes.length : 0}/300</Text>
                  </View>
                  <View>
                    <Item style={styles.item}>
                      <Input
                        placeholder="Notes"
                        maxLength={300}
                        multiline={true}
                        style={[
                          styles.input,
                          { height: getResponsiveCSSFrom8(100).height }
                        ]}
                        value={this.props.notes}
                        onChangeText={text => this.props.changeNotes(text)}
                      />
                    </Item>
                  </View>
                </View>
                <View>
                  <View>
                    <Text style={styles.subheadingTitleText}>PHOTOS</Text>
                  </View>

                  {photo_uri && (
                    <View style={styles.photoGrid}>
                      {map(
                        (item, index) => (
                          <View>
                            {
                              <Image
                                loadingIndicatorSource={Images.loader}
                                source={
                                  item
                                    ? { uri: item.toString() }
                                    : Images.loader
                                }
                                style={styles.photo}
                              />
                            }
                            <Button
                              transparent
                              onPress={() =>
                                this.props.deleteProblemPhoto(item)
                              }
                            >
                              <Text style={{ marginLeft: 30, fontSize: 12 }}>
                                {' '}
                                DELETE{' '}
                              </Text>
                            </Button>
                          </View>
                        ),
                        photoURIs
                      )}
                    </View>
                  )}
                </View>
                <View>
                  <Button
                    style={styles.photoButton}
                    onPress={this.openCamera}
                  >
                    <Image style={styles.buttonImage} source={Images.plus} />
                  </Button>
                </View>
                <View style={styles.jobScheduleButtons}>
                  <Button
                    primary
                    style={styles.nextButton}
                    onPress={() => this.onNext()}
                  >
                    <Text style={styles.buttonText}> NEXT </Text>
                  </Button>
                </View>
              </Form>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        <TakePhotoScreen
          visible={this.state.showTakePhotoScreen}
          textToDisplay="TAKE PHOTO"
          onRequestClose={this.onRequestClose}
          captureImageUri={this.captureImageUri}
        />
      </Container>
    )
  }
  renderDropdownRow(rowData, highlighted) {
    if (rowData)
      return (
        <TouchableHighlight underlayColor="cornflowerblue">
          <View style={[styles.dropdownRow, { backgroundColor: 'white' }]}>
            <Text
              style={[
                styles.dropdownRowText,
                highlighted && { color: Colors.midBlue }
              ]}
            >
              {rowData}
            </Text>
          </View>
        </TouchableHighlight>
      )
    return null
  }
}

const mapStateToProps = createStructuredSelector({
  problems: state => get(state, 'problem.allProblems'),
  selectedProblem: state => get(state, 'problem.selectedProblem'),
  categoryId: state => get(state, 'problemCategory.selectedCategory'),
  notes: state => get(state, 'serviceRequest.notes'),
  photoURIs: state => get(state, 'serviceRequest.photoURIs'),
  paymentMethods: state => get(state, 'payments.paymentMethods')
})

const mapDispatchToProps = dispatch => ({
  fetchProblems: categoryId => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.fetchProblemsRequest(categoryId, resolve, reject))
    )
  },
  selectProblem: problem => dispatch(Actions.selectProblem(problem)),
  changeNotes: notes => dispatch(Actions.changeNotes(notes)),
  addProblemPhoto: photo_uri => dispatch(Actions.addProblemPhoto(photo_uri)),
  deleteProblemPhoto: photo_uri =>
    dispatch(Actions.deleteProblemPhoto(photo_uri))
})

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails)
