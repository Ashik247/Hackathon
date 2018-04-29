import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";
import Geolocation from "./geolocation";
import Home from "./home";



export default class App extends React.Component {
  render() {
    return (
      <Home />,
      <Geolocation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
