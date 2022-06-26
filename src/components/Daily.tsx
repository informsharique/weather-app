import React from 'react';
import { View, StyleSheet, PixelRatio } from 'react-native';
import LottieView from 'lottie-react-native';

import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { formatDate, formatDay } from '@utils/formatter';
import weatherIcon from '@utils/weatherIcon';
import { DailyWeather } from './types';

interface props {
	data: DailyWeather[];
	timeZone: string;
}

const Daily: React.FC<props> = ({ data, timeZone }) => {
	return (
		<View style={styles.container}>
			{data?.map((item, index) => {
				const time = new Date(item?.dt * 1000);
				return data.length - 1 > index ? (
					<View key={String(index)} style={styles.itemContainer}>
						<View style={styles.day}>
							<Text style={styles.dayText}>{0 === index ? 'Today' : formatDay(time, timeZone)}</Text>
							<Text style={styles.dateText}>{formatDate(time, timeZone)}</Text>
						</View>
						<View style={styles.lottieView}>
							<LottieView
								style={styles.lottie}
								source={weatherIcon(item.weather[0].icon, item.weather[0].main)}
								progress={0.5}
							/>
							<Text style={styles.weatherText}>{item.weather[0].main}</Text>
						</View>
						<View style={styles.minmax}>
							<Text style={styles.maxTemp}>{Math.trunc(item.temp.max)} ˚C ⬆</Text>
							<Text style={styles.minTemp}>{Math.trunc(item.temp.min)} ˚C ⬇</Text>
						</View>
					</View>
				) : null;
			})}
		</View>
	);
};

const scale = PixelRatio.get();

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		marginHorizontal: 2.5 < scale ? 25 : 42,
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		marginVertical: 5,
	},
	day: {
		flex: 2,
		justifyContent: 'space-around',
		alignSelf: 'stretch',
	},
	dayText: {
		fontSize: 17,
		color: colors.light.text,
	},
	dateText: {
		fontSize: 14,
		color: `${colors.light.text}CC`,
	},
	lottieView: {
		flex: 2,
	},
	lottie: {
		width: 40,
		height: 40,
		bottom: 2,
		alignItems: 'center',
		alignSelf: 'center',
	},
	weather: {
		flex: 1,
	},
	weatherText: {
		fontSize: 14,
		color: colors.light.text,
		textAlign: 'center',
		bottom: 5,
	},
	minmax: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
		alignSelf: 'stretch',
	},
	maxTemp: {
		fontSize: 17,
		color: colors.light.text,
	},
	minTemp: {
		fontSize: 17,
		color: `${colors.light.iconColor}A5`,
	},
});

export default React.memo(Daily);
