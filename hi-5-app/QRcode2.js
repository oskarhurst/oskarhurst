import React, { Component } from "react";
import { FlatList, StyleSheet, View, Text, AsyncStorage,TouchableOpacity,Image } from "react-native";
import { Container, Header, Content, Button, Icon,Item,Input,Fab,Right } from 'native-base';
import Date from "./components/Events/Date/Date";
import Event from "./components/Events/Event/Event";

export default class QRcode extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
    }
  }
  render() {
    const {navigate} = this.props.navigation; 
    return (
        <View style={{justifyContent: 'center', flexDirection:"row"}}>
        <View>
        <Image source={require('./assets/Boba.png')} style={{width: 300, height: 300, marginTop:200}} />
         <Button full transparent style={{height:200}}
         onPress={() => navigate('Success2')}>
        <Text style={{color:'white'}}>invisible</Text>
        </Button>
        </View>
          <Fab 
            
            active={this.state.active}
            direction="right"
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
      </View>
    );
  }
}