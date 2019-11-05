import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Icon, Text, Right,Thumbnail, Left, Body,List, ListItem, Grid, Row, StepIndicator, Button, Fab } from "native-base";
import { Image,View,Modal,Alert } from 'react-native';
import Profile from '../Profile';
import NavigationService from '../NavigationService.js';
const items = [
  {
    text: 'Get one scoop of ice cream of your choice from Davis Creamery.',
    name: 'Scoop of love',
    image: require('../assets/ice-cream.jpg'),
    points: 300,
    company: 'Davis Creamery',
  },
  {
    text: 'Get one small Boba of your choice from BobaNinja',
    name: 'BobaTastic',
    image: require('../assets/boba.jpg'),
    points: 400,
    company: 'Boba Ninja',
  },
  {
    text: 'Long Day of work, Earn one freshly baked cookie',
    name: 'Craving Cookies',
    image: require('../assets/cookie.jpg'),
    points: 500,
    company: 'Davis Creamery',
  },
];

export default class DynamicCardExample1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
  }
  render() {
    return (
      <Container>
        <Content>
          <List dataArray={items}
                renderRow={(item) =>
              <ListItem style={{borderBottomWidth: 0}}>
                <Content>
                  <Card style={{ borderRadius: 30 }}>
                    <CardItem style={{borderRadius: 30, paddingTop:0, paddingBottom:0 }}>
                    <Image source={item.image} style={{width: 150, height: 220,marginLeft:-14, borderRadius:30}} />
                    <View style={{backgroundColor:'white', marginLeft:-25, width:25,height:220}}/>
                    <View style={{alignItems: 'center', justifyContent:'center', flex:1}}>
                        
                    <Button transparent iconLeft danger style={{ alignSelf: 'center', marginTop:-40}}>
                    <Icon name='pin' />
                    <Text style={{ fontWeight: 'bold', color:'black', fontSize: 13 }}>{item.company}</Text>
                    </Button>
                        
                    <Text style={{fontSize: 22, fontWeight: 'bold', paddingBottom:5 }}>{item.name} </Text>
                    <Text style={{fontSize: 15, textAlign: 'center', padding:5, paddingBottom: 12 }}>{item.text} </Text>

                    <Button style={{ backgroundColor:'#18D700', alignSelf: 'center', marginBottom:-40}} 
                      onPress={() => NavigationService.navigate('QRcode2')}>
                    <Text style={{ fontWeight: 'bold', }}>{'redeem'}</Text>
                    </Button>
                        
                    </View>
                    </CardItem>
                  </Card>
                </Content>
              </ListItem>
                  }>
                 </List>
            </Content>
            <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: 'black' }}
            position="bottomRight"
            onPress={() => NavigationService.navigate('Reward')}>
            <Icon name="globe" />
          </Fab>
      </Container>
    );
  }
}
