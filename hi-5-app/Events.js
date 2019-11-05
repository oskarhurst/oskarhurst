import React, { Component } from "react";
import { FlatList, StyleSheet, View, Text, AsyncStorage,TouchableOpacity,Image } from "react-native";
import { Container, Header, Content, Button, Icon,Item,Input,Fab } from 'native-base';
import Date from "./components/Events/Date/Date";
import Event from "./components/Events/Event/Event";

export default class Events extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
        events: [
          {
            name: "Tree Planting",
            time: "9:30-10:40 am", 
            image: require("./assets/Trees.jpg"),
            day: "Th",
            dayNum: "1st"
          },
            {
            name: "Painting Houses",
            time: "9:30-10:40 am",
            image: require("./assets/Paint.jpg"),
            day: "Fr",
            dayNum: "2nd"
          },
          {
            name: "Cleaning Pets",
            time: "9:30-10:40 am",
            image: require("./assets/Dog.jpg"),
            day: "Sa",
            dayNum: "3rd"
          },
          {
            name: "River Cleanup",
            time: "9:30-10:40 am",
            image: require("./assets/River.jpg"),
            day: "Th",
            dayNum: "4th"
          }
        ]}
  }

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => { 
        console.error(error);
      });
  }

  render() {
    const {navigate} = this.props.navigation; 
    return (
      <View style={styles.container}>
      <View style={{flexDirection: 'row',}}>
        <Text style={styles.text} >
          This
        </Text>
        <Text style={{fontSize: 40, marginTop:90, paddingLeft:10}} >
         Week
        </Text>
        </View>
          <FlatList
            data={this.state.events}
            renderItem={({item}) =>
              <View style={styles.dateRow}>
                <Date style={styles.date} details={item} />

 <View>
        <View style={{padding:10}}>
        <TouchableOpacity onPress={() => navigate('RSVP')}>
          <Image
            style={{marginTop: 30,height:175,width:225}}
            source={item.image}
          />
        </TouchableOpacity>
          <Text style={{fontSize:30, fontWeight:'bold'}}>{item.name}</Text>
        </View>
        <Text style={{fontSize:20,paddingLeft:15, marginTop:-15 }}>{item.time}</Text>
      </View>

              </View>
            }
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 50,
    paddingTop:0
  },
  text: {
    color: "#121212",
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 0,
    marginTop: 90,
  },
  date: {
    width: 67,
    height: 100,
    marginTop: 34,
    fontWeight: 'bold',
  },
  events: {
    width: 201,
    height: 244,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  dateRow: {
    height: 250,
    flexDirection: "row",
    flex: 1,
    marginRight: 48,
    marginLeft: 0,
    fontWeight: 'bold',
  }
});