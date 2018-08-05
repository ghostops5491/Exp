import React, { Component } from 'react'
import { View, Container, Header, Content, Tab, Tabs } from 'native-base'
import Tab1 from '../MyProvidersList'
import Tab2 from '../InviteProviders'
import { HeaderNav, FooterNav } from 'App/Components'
import styles from './styles'
import { Text, ScrollView } from 'react-native'
import { Colors, Fonts } from 'App/Themes'
import ScrollableTabView, {
  ScrollableTabBar
} from 'react-native-scrollable-tab-view'

export default class ProvidersTabs extends Component {
  render() {
    return (
      <ScrollableTabView
        style={{ backgroundColor: Colors.grayThree }}
        initialPage={0}
        tabBarUnderlineStyle={styles.tabView}
        tabBarActiveTextColor={Colors.midBlue}
        tabBarInactiveTextColor={Colors.grayFour}
        tabBarTextStyle={{ fontWeight: '400' }}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <View tabLabel="MY PROVIDERS">
          <Tab1 navigation={this.props.navigation} />
        </View>
        <View tabLabel="INVITE PROVIDERS">
          <Tab2 navigation={this.props.navigation} />
        </View>
      </ScrollableTabView>
    )
  }
}
