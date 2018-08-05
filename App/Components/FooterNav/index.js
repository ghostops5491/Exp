import React, { Component } from 'react'
import {
  Button,
  Footer,
  FooterTab,
  Icon,
  Badge,
  Text as NBText
} from 'native-base'
import { View, TouchableOpacity, Text, Platform } from 'react-native'
import RenderIcon from '../RenderIcon'
import styles from './styles'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

export default class FooterNav extends Component {
  constructor(props) {
    super(props)
    this.footerTabs = [
      {
        label: 'Notifications',
        icon: {
          width: 24,
          height: 24,
          activeLabel: 'bellActive',
          inactiveLabel: 'bellInactive'
        },
        text: 'NOTIFICATIONS'
      },
      {
        label: 'ProvidersTabs',
        icon: {
          width: 24,
          height: 24,
          activeLabel: 'starActive',
          inactiveLabel: 'starInactive'
        },
        text: 'MY PROVIDERS'
      },
      {
        label: 'Dashboard',
        icon: {
          width: 24,
          height: 24,
          activeLabel: 'dashboardActive',
          inactiveLabel: 'dashboardInactive'
        },
        text : 'MY JOBS'
      },
      {
        label: 'ProfileTabs',
        icon: {
          width: 20,
          height: 24,
          activeLabel: 'profileActive',
          inactiveLabel: 'profileInactive'
        },
        text: 'PROFILE'
      }
    ]
  }

  toggleTab = routeName => {
    const { navigator, currentRoute } = this.props
    if (navigator && currentRoute !== routeName) {
      navigator.props.navigation.navigate(routeName)
    }
  }

  isActiveRoute = routeName => routeName === this.props.activeTab

  getAllowedTabs = tab => {
    // All tabs allowed as of 7/19/18
    return this.footerTabs

  }

  render() {
    const { isActiveRoute } = this
    let allowedTabs = this.getAllowedTabs()
    const TextNode = NBText
    Platform.select({
      android: Text,
      ios: NBText
    })
    return (
      <Footer style={styles.footer}>
        {allowedTabs.map(tab => (
          <FooterTab style={styles.footerTab}>
            <Button
              active={isActiveRoute(tab.label)}
              onPress={() => this.toggleTab(tab.label)}
              style={styles.button}
            >
              {tab.label === 'Notifications' &&
                this.props.showNotiBadge && (
                  <View style={styles.badge}>
                    <Badge />
                  </View>
                )}
              {isActiveRoute(tab.label) ? (
                <RenderIcon
                  name={tab.icon.activeLabel}
                  width={getResponsiveCSSFrom8(tab.icon.width).width}
                  height={getResponsiveCSSFrom8(tab.icon.height).height}
                />
              ) : (
                <RenderIcon
                  name={tab.icon.inactiveLabel}
                  width={getResponsiveCSSFrom8(tab.icon.width).width}
                  height={getResponsiveCSSFrom8(tab.icon.height).height}
                />
              )}
              <TextNode style={styles.tabText}>{tab.text}</TextNode>
            </Button>
          </FooterTab>
        ))}
      </Footer>
    )
  }
}
