import React, { useCallback, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Loader from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@components/Text';
import { compositeNavigation } from '@navigation/types';
import { getWeather } from '@redux/Async';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { manualListSelector } from '@selectors/selectors';
import { shallowEqual } from 'react-redux';

interface props {
	city: {
		city: string;
		lat: number;
		lon: number;
	};
}

const Cities: React.FC<props> = ({ city: { city, lat: latitude, lon: longitude } }) => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const navigation = useNavigation<compositeNavigation | any>();
	const list = useAppSelector(manualListSelector, shallowEqual);
	const dispatch = useAppDispatch();

	const cityName = city.substring(0, city.indexOf(','));
	const stateAndCountry = city.substring(city.indexOf(',') + 2, city.length);

	let added = false;
	let screenIndex: string;

	list.forEach((item, index) => {
		if (item.lat === Number(Number(latitude).toFixed(4)) && item.lon === Number(Number(longitude).toFixed(4))) {
			added = true;
			screenIndex = `Weather${index}`;
		}
	});

	const addCity = useCallback(() => {
		if (added) navigation.navigate(screenIndex);
		if (!added) {
			setFetching(true);
			dispatch(getWeather({ latitude, longitude, city: cityName, isRefreshing: false })).then(() => {
				setFetching(false);
			});
		}
	}, [added, screenIndex]);

	return (
		<KeyboardAvoidingView>
			<ScrollView>
				<LinearGradient
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						borderRadius: 20,
						overflow: 'hidden',
						marginBottom: 10,
						marginHorizontal: 10,
					}}
					locations={[0, 0.5, 1]}
					colors={[backgroundColor(), backgroundColor(), backgroundColor()]}
					useAngle
					angle={135}
					angleCenter={{ x: 0.3, y: 0.3 }}
				/>
				<RectButton style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.01)' }]} onPress={addCity}>
					{added && <Text style={styles.added}>Added</Text>}
					<View style={styles.description}>
						<Text style={styles.city}>{cityName}</Text>
						<Text style={styles.city}>{stateAndCountry}</Text>
					</View>
					<View style={styles.description}>
						<Text style={styles.city}>Latitude: {Number(latitude).toFixed(4)}</Text>
						<Text style={styles.city}>Longitude: {Number(longitude).toFixed(4)}</Text>
					</View>
					<Loader isVisible={isFetching} type="FadingCircleAlt" />
				</RectButton>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
		marginHorizontal: 10,
		paddingHorizontal: 20,
		height: 100,
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	description: {
		flexDirection: 'column',
	},
	city: {
		fontSize: 18,
		marginVertical: 5,
		fontWeight: 'bold',
	},
	added: {
		letterSpacing: 1.4,
		transform: [{ rotate: '90deg' }],
		position: 'absolute',
		right: -20,
		color: 'white',
		top: 40,
		backgroundColor: '#990011',
		fontWeight: 'bold',
		paddingHorizontal: 10,
		borderRadius: 10,
	},
});

const rand = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
const backgroundColor = () => {
	const h = rand(0, 360);
	const s = rand(60, 95);
	const l = rand(80, 90);
	return 'hsla(' + h + ',' + s + '%,' + l + '%, 1)';
};

export default Cities;
