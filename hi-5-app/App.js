import {createAppContainer,  } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, { Component } from 'react';
import NavigationService from './NavigationService';
import Profile from './Profile';
import Reward from './Reward_map';
import Rewards from './Profile_Pages/Rewards';
import Events from './Events';
import Dashboard from './Dashboard';
import Reward_list from './Profile_Pages/Rewards';
import RSVP from './RSVP';
import Check_in from './Check_in';
import QRcode from './QRcode';
import Success from './Success';
import QRcode2 from './QRcode2';
import Success2 from './Success2';
import DocuSign from './DocuSign';


const MainNavigator = createStackNavigator({
  Home: {screen: Dashboard,
  navigationOptions: {
      header: null
    },
  },
  Profile: {screen: Profile,
  navigationOptions: {
      header: null
    },
    },
  Dashboard: {screen: Dashboard,
  navigationOptions: {
      header: null
    },
    },
  Events: {screen: Events,
  navigationOptions: {
      header: null
    },},
  Reward: {screen: Reward,
  navigationOptions: {
      header: null
    },},
  Reward_list: {screen: Reward_list,
  navigationOptions: {
      header: null
    },},
    RSVP: {screen: RSVP,
  navigationOptions: {
      header: null
    },},
    Check_in: {screen: Check_in,
  navigationOptions: {
      header: null
    },},
    QRcode: {screen: QRcode,
  navigationOptions: {
      header: null
    },},
    Success: {screen: Success,
  navigationOptions: {
      header: null
    },},
    QRcode2: {screen: QRcode2,
  navigationOptions: {
      header: null
    },},
    Success2: {screen: Success2,
  navigationOptions: {
      header: null
    },},
    DocuSign: {screen: DocuSign,
  navigationOptions: {
      header: null
    },},
    Rewards: {screen: Rewards,
  navigationOptions: {
      header: null
    },},


});

const AppContainer = createAppContainer(MainNavigator);
export default class App extends React.Component {
  // ...

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}