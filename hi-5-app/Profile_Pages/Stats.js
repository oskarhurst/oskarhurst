import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon,Item,Input } from 'native-base';
import { Image,View } from 'react-native';
export default class ButtonExample extends Component {
  render() {
    return (
      <Container>
        <Content style={{padding: 20}}>
        <View style={{justifyContent: 'center', flexDirection: 'row', padding:5}}>
            <Text>Lifetime HI-Fives</Text>
        </View>
        <View style={{justifyContent: 'center', flexDirection: 'row', paddingBottom:20}}>
        <Button  icon style={{}}>
                          <Icon name='hand' />
                          <Text style={{ fontWeight: 'bold', }}>3214</Text>
                        </Button>
        </View>

        <Item>
        <Button  icon transparent style={{}}>
          <Icon name='mail'style={{color:'black'}} />
        </Button>
            <Input placeholder="Jannet.good@gmail.com" />
          </Item>
          <Item>
          <Button  icon transparent style={{}}>
            <Icon name='call'style={{color:'black'}} />
          </Button>
            <Input placeholder="(303) 123 4567" />
          </Item>
        </Content>
      </Container>
    );
  }
}