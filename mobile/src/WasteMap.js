import React, { Component } from 'react';
import { Image } from 'react-native';
import { MapView } from 'expo';
import registerPullService from './registerPullService';

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

	render() {
		const { bins, region } = this.state;
		return (
			<MapView
				region={region}
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
					</MapView.Marker>
				))}
			</MapView>
		);
	}
}

export default WasteMap;
