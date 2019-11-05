import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Icon, Text, Right,Thumbnail, Left, Body,List, ListItem, Grid, Row, StepIndicator, Button } from "native-base";
import { Image,View } from 'react-native';
const items = [
  {
    text: 'Planting Trees with Children from Sutter Health Hospital.',
    name: 'Planting Trees',
    image: require('../assets/Trees.jpg'),
    points: 300,
    location: 12,
    company: 'Davis Creamery',
  },
  {
     text: 'Cleaning Pets from the local pound.',
    name: 'Cleaning Pets',
    image: require('../assets/Dog.jpg'),
    points: 200,
    location: 12,
    company: 'Davis Creamery',
  },
  {
     text: 'River Clean Up to fight local litering.',
    name: 'River Cleanup',
    image: require('../assets/River.jpg'),
    points: 350,
    location: 12,
    company: 'Davis Creamery',
  },
];
export default class DynamicCardExample2 extends Component {
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
                        
                    <Text style={{fontSize: 22, fontWeight: 'bold',paddingTop:25}}>{item.name} </Text>
                    <Text style={{fontSize: 15, textAlign: 'center', paddingBottom:25, paddingTop:10}}>{item.text} </Text>

                    <Button style={{alignSelf: 'center',}}>
                    <Text style={{ fontWeight: 'bold', }}>{item.points}</Text>
                    </Button>
                        
                    </View>
                    </CardItem>
                  </Card>
              </Content>
            </ListItem>
                  }>
                 </List>
            </Content>
      </Container>
    );
  }
}