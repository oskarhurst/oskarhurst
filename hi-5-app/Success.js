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
        <View style={{ justifyContent: 'center', backgroundColor:'lightgreen', flex:1}}>
        <Right style={{ justifyContent: 'center',}}>
        <Icon active name="checkmark-circle-outline" style={{fontSize:300, color:'white', marginRight:50 }}/>
        <Text style={{ color: "white", fontSize:35, fontWeight:'bold',padding:10}}> You Are Checked In</Text>
        <Button  icon style={{marginRight:100, height:75, width: 150}}
        onPress={() => navigate('Home')}>
                          <Icon name='hand' style={{fontSize:50}}/>
              <Text style={{ fontWeight: 'bold', color: "white", fontSize:30, marginRight:20 }}>200</Text>
                        </Button>
        <Text style={{ color: "white", fontSize:35, fontWeight:'bold',padding:10}}> Has Been Awarded!</Text>
        </Right>
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