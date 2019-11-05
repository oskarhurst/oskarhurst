import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Date extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.text4Stack}>
          <Text style={styles.text4}>{this.props.details.day}</Text>
          <Text style={styles.text6}>{this.props.details.dayNum}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text4: {
    top: 0,
    left: 0,
    width: 67,
    height: 55,
    color: "#121212",
    position: "absolute",
    fontSize: 52,
    fontFamily: "roboto-700",
    fontWeight: 'bold'
  },
  text6: {
    top: 55,
    left: 12,
    width: 44,
    height: 108,
    color: "#121212",
    position: "absolute",
    fontSize: 25,
    fontFamily: "roboto-700"
  },
  text4Stack: {
    width: 67,
    height: 73
  }
});
