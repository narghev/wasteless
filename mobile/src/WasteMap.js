import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { MapView } from 'expo';
import registerPullService from './registerPullService';

const { width, height } = Dimensions.get('window');

class WasteMap extends Component {
	state = {
		bins: [],
		region: {
			latitude: 40.1917271,
			longitude: 44.530983,
			latitudeDelta: 0.03,
			longitudeDelta: 0.03,
		}
	}

	mapView = React.createRef();

	componentDidMount() {
		this.unregister = registerPullService(this.setBins);
	}

	componentWillUnmount() {
		this.unregister();
	}

	setBins = (bins) => {
		this.setState({ bins });
	}

	onRegionChange = (region) => {
		this.setState({ region });
	}

	onReady = (result) => {
		this.mapView.fitToCoordinates(result.coordinates, {
			edgePadding: {
				right: (width / 20),
				bottom: (height / 20),
				left: (width / 20),
				top: (height / 20),
			}
		});
	}

	onError = (errorMessage) => {
		Alert.alert(errorMessage);
	}

	render() {
		const { bins, region } = this.state;
		return (
			<MapView
				region={region}
				ref={this.mapView}
				onRegionChange={this.onRegionChange}
				style={{ width: '100%', height: '100%' }}
			>
				{bins.map(bin => (
					<MapView.Marker
						key={bin.id}
						coordinate={bin.location}
					>
						<Image
							source={require('../assets/bin.png')}
							style={{ height: 20, width: 20 }}
						/>
						{(this.state.coordinates.length === 2) && (
							<MapViewDirections
								origin={this.state.coordinates[0]}
								destination={this.state.coordinates[1]}
								apikey="AIzaSyAEC5kJaCCnlSZfykAuRU9WfItNqVE6ieY"
								strokeWidth={3}
								strokeColor="hotpink"
								onReady={this.onReady}
								onError={this.onError}
							/>
						)}
					</MapView.Marker>
				))}
			</MapView>
		);
	}
}

export default WasteMap;
