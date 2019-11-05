import React, { Component } from "react";
import { StyleSheet, View, Image, Text,Button , TouchableOpacity} from "react-native";

export default class Event extends Component {
  render() {
    const {navigate} = this.props.navigation; 
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.imageStack}>
        <TouchableOpacity onPress={() => navigate('RSVP')}>
          <Image
            source={this.props.details.image}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>
          <Text style={styles.text2}>{this.props.details.name}</Text>
        </View>
        <Text style={styles.text3}>{this.props.details.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    top: 0,
    left: 1,
    width: 200,
    height: 200,
    position: "absolute"
  },
  text2: {
    top: 177,
    left: 0,
    width: 200,
    height: 37,
    color: "#121212",
    position: "absolute",
    fontSize: 30,
    fontFamily: "roboto-700",
    fontWeight: 'bold'
  },
  imageStack: {
    width: 201,
    height: 214
  },
  text3: {
    width: 200,
    height: 29,
    color: "#121212",
    fontSize: 18,
    fontFamily: "roboto-regular",
    marginTop: 1,
    marginLeft: 1
  }
});
