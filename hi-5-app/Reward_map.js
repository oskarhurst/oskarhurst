import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right,Thumbnail, Left, Body,List, ListItem, Grid, Row, StepIndicator, Button, Fab } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

import { Components } from 'expo';

import MapView from 'react-native-maps';

const Images = [
  require('./assets/ice-cream.jpg') ,
  require('./assets/boba.jpg'),
  require('./assets/cookie.jpg'),
  require('./assets/pizza.jpg'),
  require('./assets/taco.jpg'),
  { uri: 'https://i.imgur.com/Ka8kNST.jpg' },
];

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 2.5;
const CARD_WIDTH = width - 20;

export default class screens extends Component {
  state = {
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: 'Davis Creamery',
        description: 'Get one scoop of ice cream of your choice from Davis Creamery.',
        image: Images[0],
        points: 300,
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: 'BobaNinja',
        description: 'Get one small Boba of your choice from BobaNinja',
        image: Images[1],
        points: 400,
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        title: 'Cookie Shop',
        description: 'Long Day of work, Earn one freshly baked cookie',
        image: Images[2],
        points: 500,
      },
      {
        coordinate: {
          latitude: 45.5256856,
          longitude: -122.6742034,
        },
        title: 'Sliver Pizzeria',
        description: 'Best Pizza in Town! Come in and get a hot slice.',
        image: Images[3],
        points: 500,
      },
      {
        coordinate: {
          latitude: 45.5232846,
          longitude: -122.6901134,
        },
        title: 'Taco Factory',
        description: 'Two Traditional Street Tacos. 3 differnet meats and vegetarian too.',
        image: Images[4],
        points: 500,
      },
      
    ],
    region: {
      latitude: 45.52220671242907- 0.005,
      longitude: -122.6653281029795 -0.006,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.03);
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              latitude: coordinate.latitude - 0.002,
              longitude: coordinate.longitude,
              latitudeDelta: this.state.region.latitudeDelta-0.04,
              longitudeDelta: this.state.region.longitudeDelta-0.04,
            },
            350
          );
        }
      }, 10);
    });
  }
  render() {
    const {navigate} = this.props.navigation;
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp',
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp',
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}>

          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}>
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text style={styles.cardtitle}>
                  {marker.title}
                </Text>
                <Text style={styles.cardDescription}>
                  {marker.description}
                </Text>
                <Button  icon style={{paddingRight:10, alignSelf:'flex-end',}} onPress={() => navigate('Profile')}>
                          <Icon name='hand' />
                          <Text style={{ fontWeight: 'bold',color:'white' }}>{marker.points}</Text>
                        </Button>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
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
    paddingBottom:'0%',
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderRadius:20,
  },
  cardImage: {
    flex: 1,
    width: '110%',
    height: '100%',
    marginTop:-10,
    alignSelf: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 25,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 20,
    color: '#444',
    paddingBottom:5,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
});