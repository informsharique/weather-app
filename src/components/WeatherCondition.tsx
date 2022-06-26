import React from 'react';
import { PixelRatio, StyleSheet, View } from 'react-native';

import capitalize from '@utils/capitalize';
import { colors } from '@constants/colors';
import { Text } from '@components/Text';

interface WeatherState {
	cityName: string;
	weatherDescription: string;
	temp: number;
	feelsLike: number;
	isLocationScreen: boolean;
}

const WeatherCondition: React.FC<WeatherState> = ({ temp, weatherDescription, feelsLike }) => {
	return (
		<View style={styles.container}>
			<View style={styles.weatherInfo}>
				<View style={styles.item}>
					<Text style={styles.temp}>{Math.round(temp)}˚ </Text>
					<Text numberOfLines={2} style={styles.feelsLike}>
						Feels Like: {Math.round(feelsLike)}˚
					</Text>
					<Text style={styles.weatherCondition}>{capitalize(weatherDescription)}</Text>
				</View>
			</View>
		</View>
	);
};

const scale = PixelRatio.get();

const styles = StyleSheet.create({
	container: {
		borderRadius: 15,
		paddingBottom: 65,
		paddingTop: 130,
		marginHorizontal: 2.5 < scale ? 25 : 40,
	},
	weatherInfo: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
	},
	item: {
		flexDirection: 'column',
	},
	tempIcon: {
		flex: 1,
	},
	city: {
		color: colors.light.text,
		fontSize: 50,
		paddingBottom: 5,
	},
	temp: {
		color: colors.light.text,
		fontSize: 60,
	},
	weatherCondition: {
		backgroundColor: `${colors.light.forecastBg}27`,
		borderRadius: 20,
		color: colors.light.text,
		fontSize: 20,
		textAlign: 'center',
		paddingHorizontal: 8,
		paddingVertical: 5,
		marginTop: 50,
	},
	feelsLike: {
		color: colors.light.text,
		fontSize: 24,
		paddingLeft: 5,
	},
});

export default React.memo(WeatherCondition);
