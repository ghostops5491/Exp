import React, { Component } from 'react'
import { Image, View, ScrollView } from 'react-native'
import { Button, Text, Content, Item, Input } from 'native-base'
import { Images, Colors, Fonts } from 'App/Themes'
import Section from 'App/Components/Section'
import SectionList from 'App/Components/SectionList'
import styles from './styles'
import { MainContainer, Container, HeaderNav, FooterNav, AddPhotoButton } from 'App/Components'

export default class UpdateBilling extends Component {

  render () {
    return (
      <Container>
        <Content>
          <View style={styles.screenBody}>
            <View>
              <Text style={styles.titleText}>
                UPDATE BILLING
              </Text>
            </View>
            <View>
              <Text style={styles.descriptionText}>
                Please select your payment method. Your card will not be charged unitl job completion and approval.
              </Text>
            </View>
            <View>
              <Item style={styles.item}>
                <Input placeholder="Default card" style={styles.input}/>
              </Item>
            </View>
            <View>
              <Button primary style={styles.updateButton}>
                <Text style={{ width: '100%', fontWeight: "bold" }}>
                  UPDATE BILLING </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
