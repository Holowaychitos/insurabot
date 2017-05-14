import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

const getHealthData = require("./src/getHealthData.js");

export default class NativeInsurance extends Component {
  constructor() {
    super();

    this.state = {
      data: "started2"
    };
  }

  componentDidMount() {
    getHealthData()
      .then(res => {
        this.setState({
          data: JSON.stringify(res)
        });
      })
      .catch(err => {
        this.setState({
          data: JSON.stringify(err)
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.data}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{"\n"}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

ErrorUtils.setGlobalHandler(function(err) {
  console.error(err);
});

AppRegistry.registerComponent("NativeInsurance", () => NativeInsurance);
