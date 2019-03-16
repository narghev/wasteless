import React, { Component } from "react";
import { Dimensions, StyleSheet, Image } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import registerPullService from "./registerPullService";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 40.1917271;
const LONGITUDE = 44.530983;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyAEC5kJaCCnlSZfykAuRU9WfItNqVE6ieY";

const truck_coordinate = {
  latitude: LATITUDE,
  longitude: LONGITUDE
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: []
    };
    this.mapView = null;
  }

  componentDidMount() {
    this.unregister = registerPullService(this.setBins);
  }

  componentWillUnmount() {
    this.unregister();
  }

  setBins = coordinates => {
    this.setState({ coordinates });
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
    });
  };

  render() {
    const { coordinates } = this.state;
    return (
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
        style={StyleSheet.absoluteFill}
        ref={c => (this.mapView = c)}
        onPress={this.onMapPress}
      >
        {coordinates !== [] &&
          coordinates.map((coordinate, index) => (
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate}>
              <Image
                source={require("../assets/bin.png")}
                style={{ height: 20, width: 20 }}
              />
            </MapView.Marker>
          ))}
        <MapView.Marker key={`truck`} coordinate={truck_coordinate}>
          <Image
            source={require("../assets/truck.jpg")}
            style={{ height: 20, width: 20 }}
          />
        </MapView.Marker>
        {coordinates !== [] && this.state.coordinates.length >= 2 && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={
              this.state.coordinates.length > 2
                ? this.state.coordinates.slice(1, -1)
                : null
            }
            destination={
              this.state.coordinates[this.state.coordinates.length - 1]
            }
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="green"
            optimizeWaypoints={true}
            onReady={result => {
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20
                }
              });
            }}
            onError={errorMessage => {
              console.log(errorMessage);
            }}
          />
        )}
      </MapView>
    );
  }
}

export default Map;
