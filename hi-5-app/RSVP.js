import React from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right,Thumbnail, Left, Body,List, ListItem, Grid, Row, StepIndicator, Button, Fab } from "native-base";
import {
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class MarkerTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
    };
  }

  render() {
    const {navigate} = this.props.navigation; 
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Image
              style={styles.eventImage}
              source={require('/assets/Trees.jpg')}
            />
            <Text style={styles.title}>Planting Trees</Text>
            <View style={styles.infoItem}>
              <Icon active name="clock" />
              <Text style={styles.iconText}> 9:30 - 10:40 AM</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon active name="pin" />
              <Text style={styles.iconText}> Memorial Union</Text>
            </View>

            <MapView
              provider={this.props.provider}
              style={styles.map}
              initialRegion={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              <Marker
                coordinate={this.state.b}
                onSelect={e => log('onSelect', e)}
                onDrag={e => log('onDrag', e)}
                onDragStart={e => log('onDragStart', e)}
                onDragEnd={e => log('onDragEnd', e)}
                onPress={e => log('onPress', e)}
                draggable
              />
            </MapView>
            <View style={styles.details}>
              <Text style={styles.text3}>
                Have fun and do something great by planting trees with us. Get a good workout while contributing to Oakland’s community spirit and environmental health. Our program allows Oakland residents to receive free or reduced-cost trees, thanks mainly to a grant from the State of California to our sponsors at the Oakland Parks & Recreation Foundation (http://oaklandparks.org).
What: Planting a few trees in Oakland for local residents.
Where: Meet at our staging area at the east end of Epic School: 1045 Derby Ave, below East 12th Street. This is a few blocks from Fruitvale BART. The trees will be for other places around town, so please join us here for our orientation and safety briefing first.
When: Saturday morning/midday, starting at 9am. We expect to finish by 1pm.
We can plant in light rain, but if we decide to cancel because of heavier rain, we’ll announce it here by 8am.
              </Text>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity style={styles.button}
              onPress={() => navigate('Dashboard')}>
                <Text style={styles.rsvp}>RSVP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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

MarkerTypes.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // flex: 0.8,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: 400,
    height: 150,
  },

  title: {
    width: 261,
    height: 70,
    color: '#121212',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop:10,
  },
  details: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  eventImage: {
    // marginTop: 100,
    width: 400,
    height: 200,
    
  },

  infoItem: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    paddingTop: 20,
    width: '100%',
    height: 70,
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000699',
  },
  rsvp: {
    color: '#FAFAFA',
  },
});

export default MarkerTypes;