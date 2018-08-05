import React, { Component } from 'react'
import { Image, View, ScrollView } from 'react-native'
import { Button, Text, Content } from 'native-base'
import { connect } from 'react-redux'
import { get } from 'lodash';
import { createStructuredSelector } from 'reselect'
import { Images, Colors, Fonts } from 'App/Themes'
import Section from 'App/Components/Section'
import SectionList from 'App/Components/SectionList'
import styles from './styles'
import AddPhotoButton from 'App/Components/AddPhotoButton'
import { MainContainer, Container, HeaderNav, FooterNav, PhotoGrid } from 'App/Components'

class PreferredProvider extends Component {

  render () {

    const { currentJobId, allJobs } = this.props;
    const currentJob = allJobs[currentJobId]
    if (!currentJob) return <View></View>
    return (
      <Container>
        <ScrollView>
          <View style={styles.screenBody}>
            <View>
              <Text style={styles.titleText}>
                {get(currentJob, 'contractor.first_name')+
                " "+get(currentJob, 'contractor.last_name')}
              </Text>
            </View>
            <View>
              <Text style={styles.scheduleJobText}>
                {currentJob.notes}
              </Text>
            </View>

            <View>
              <PhotoGrid
                photosArray={currentJob.photos}
              />
            </View>

            <View>
              <Button primary
                style={styles.viewJobTimelineButton}
                onPress={() => this.props.navigation.navigate('JobTimeline')}
              >
                <Text style={styles.buttonText}> VIEW JOB TIMELINE </Text>
              </Button>
            </View>

            <View>
              <Button light style={styles.cancelRequestButton}>
                <Text style={styles.buttonText}> CANCEL REQUEST </Text>
              </Button>
            </View>
            <View>
              <Text style={styles.cancellationMessage}>
                Cancellation Fee will apply
              </Text>
            </View>
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentJobId: (state) => get(state, 'job.currentJobId'),
  allJobs: (state) => get(state, 'job.allJobs'),
})

export default connect(mapStateToProps, null)(PreferredProvider)
