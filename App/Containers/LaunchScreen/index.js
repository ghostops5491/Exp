import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Button, Text, Container, Content, Radio, Right, ListItem, Form, Item, Input, Label, Icon } from 'native-base'
import { Images, Colors, Fonts } from 'App/Themes'
import AddPhotoButton from 'App/Components/AddPhotoButton'
import styles from './styles'

const Separator = (
  <View style={{ marginTop: 3, marginBottom: 3 }}></View>
)

export default class LaunchScreen extends Component {
  goToLoginScreen() {
    this.props.navigation.navigate("LoginScreen")
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content padder style={{ backgroundColor: "#fff", padding: 20 }}>
          <Button primary style={{ width: 280, height: 46 }}>
            <Text style={{ width: '100%' }}> LOG IN </Text>
          </Button>
          {Separator}

          <Button primary style={{ width: 280, height: 46, opacity: 0.6 }}>
            <Text style={{ width: '100%' }}> LOG IN </Text>
          </Button>
          {Separator}

          <Button light style={{ width: 280, height: 46, opacity: 0.6 }}>
            <Text style={{ width: '100%' }}> CANCEL JOB </Text>
          </Button>
          {Separator}

          <Button light style={{ width: 280, height: 46 }}>
            <Text style={{ width: '100%' }}> CANCEL JOB </Text>
          </Button>
          {Separator}

          <Button light style={{ width: 130, height: 46 }}>
            <Text style={{ width: '100%' }}> PAUSE JOB </Text>
          </Button>
          {Separator}

          <Button primary style={{ width: 130, height: 60 }}>
            <Text style={{ width: '100%' }}> LOG IN </Text>
          </Button>
          {Separator}

          <Button bordered style={{ width: 130, height: 60 }}>
            <Text> APPLIANCE REPAIR </Text>
          </Button>
          {Separator}

          <Button transparent style={{ width: 280, height: 46 }}>
            <Text style={{ fontSize: 12 }}> ADD MORE </Text>
          </Button>
          {Separator}

          <AddPhotoButton />
          {Separator}

          <ListItem>
            <Text>Option 1</Text>
            <Right>
              <Radio selected={true}/>
            </Right>
          </ListItem>
          <ListItem>
            <Text>Option 2</Text>
            <Radio selected={false}/>
          </ListItem>
          {Separator}

          <Button primary
            style={{ width: 280, height: 46 }}
            onPress={() => {this.goToLoginScreen}}
          >
            <Text style={{ width: '100%' }}> GO TO LOG IN </Text>
          </Button>
          {Separator}
        </Content>
      </Container>
    )
  }
}
