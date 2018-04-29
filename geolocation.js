import React, {Component} from 'react';
import { Platform, Text, View, StyleSheet, Keyboard } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class Geolocation extends  Component {
  state = {
    location: null,
    errorMessage: null,
    isLoading: true
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
 
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, isLoading: false });
  };

  renderMarker() {
    const coord = {
      latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude,
    }
    return (
      <MapView.Marker
        coordinate={coord}
        title="User Location"
        detail="Here I am"
      />
    )
  }

  render() {
    let text = 'Waiting..';
    if (this.state.location) {
      console.log(this.state.location);
      return(
        <MapView
        style={{flex: 1}}
        region={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }}
        loadingEnabled
        showsUserLocation
        showsMyLocationsButton
        showsPointsOfInterest
        showsTraffic
        >
        {/* {this.renderMarker()}      */}
      </MapView>
      );
    }

    return null;

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});