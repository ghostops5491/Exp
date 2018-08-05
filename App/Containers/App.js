import 'App/Config'
import DebugConfig from 'App/Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { View, Platform, SafeAreaView } from 'react-native'
import { Text } from 'native-base'
import RootContainer from './RootContainer'
import store from 'App/Redux'
import Actions from 'App/Redux/Actions'
import PushService from 'App/Services/PushService'
import { Sentry } from 'react-native-sentry'
import { getResponsiveCSSFrom8 } from '../Lib/Utils'
import TestFairy from 'react-native-testfairy'

// Comment out in development
Sentry.config(
  'https://75b40415c7ee40268c3166a648081e53:dccca78cbe8c4efeab3e33a7e196d58f@sentry.io/1187460'
).install()

const pushService = new PushService(
  payload => store.dispatch(Actions.savePushTokenLocal(payload)),
  payload => store.dispatch(Actions.notificationReceived(payload))
)
pushService.configure()

class App extends Component {
  componentWillMount = () => {
    TestFairy.begin('1307d9f31b99123e4f1112e69856ecc9eb3c2258')
  }
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fcfcfc',
            ...Platform.select({
              ios: {
                marginTop: -20
              }
            })
          }}
        >
          <RootContainer />
          { DebugConfig.stagingBuild &&
            <Text style={{textAlign: 'center', color: '#ef6940'}}>STAGING BUILD</Text>
          }
        </SafeAreaView>
      </Provider>
    )
  }
}

export default App
