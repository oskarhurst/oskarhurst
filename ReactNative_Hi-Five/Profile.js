import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs,Text,Thumbnail, Button, Icon,Fab } from 'native-base';
import { Image,View } from 'react-native';
import NavigationService from './NavigationService.js';
import Tab1 from './Profile_Pages/Rewards';
import Tab2 from './Profile_Pages/History';
import Tab3 from './Profile_Pages/Stats';
import Tab4 from './GetData';


export default class TabsExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
      
      <View style={{flexDirection: 'row',justifyContent: 'center', paddingTop: 50}}>
      <Thumbnail style={{width: 150, height: 150}} large source={require('./assets/janet.jpg')} />
      </View>
      <View style={{flexDirection: 'row',justifyContent: 'center', paddingTop: 10}}>
      <Text style={{fontSize:30,fontWeight: 'bold'}}>Janet</Text>
      </View>
      <View style={{flexDirection: 'row',justifyContent: 'center', paddingTop: 20, paddingBottom:20}}>
      <Button  icon style={{}}>
                          <Icon name='hand' />
                          <Text style={{ fontWeight: 'bold', }}>3214</Text>
                        </Button>
      </View>
        <Header hasTabs style={{height:0, paddingTop:0, }} />
        <Tabs tabBarUnderlineStyle={{ backgroundColor: 'black' }}>
          <Tab heading="Rewards" activeTextStyle={{color: 'black'}}>
            <Tab1 />
          </Tab>
          <Tab heading="History" activeTextStyle={{color: 'black'}}>
            <Tab2 />
          </Tab>
          <Tab heading="Stats" activeTextStyle={{color: 'black'}}>
            <Tab3 />
          </Tab>
        </Tabs>
        <Fab 
            
            active={this.state.active}
            direction="down"
            containerStyle={{ }}
            style={{ backgroundColor: 'black' }}
            position="topLeft"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="hand"/>
            <Button bordered dark style={{ backgroundColor: 'white' }}
            onPress={() => navigate('Dashboard')}>
              <Icon name="list"/>
            </Button>
            <Button bordered dark style={{ backgroundColor: 'white' }}
            onPress={() => navigate('Events')}>
              <Icon name="calendar"/>
            </Button>
            <Button bordered dark style={{ backgroundColor: 'white' }}
            onPress={() => navigate('Profile')}>
              <Icon name="person"/>
            </Button>
            <Button bordered dark style={{ backgroundColor: 'white' }}
            onPress={() => navigate('Reward')}>
              <Icon name="navigate"/>
            </Button>
          </Fab>
      </Container>
    );
  }
}