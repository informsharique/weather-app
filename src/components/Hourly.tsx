import React from 'react';
import { View, StyleSheet, PixelRatio } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { formatter } from '@utils/formatter';
import weatherIcon from '@utils/weatherIcon';
import { HourlyWeather } from './types';

interface props {
	data: HourlyWeather[];
	timeZone: string;
}

const Hourly: React.FC<props> = ({ data, timeZone }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Today</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled>
				{data?.map((item, index) => {
					const time = new Date(item?.dt * 1000);
					return 24 > index ? (
						<View key={String(index)} style={styles.itemContainer}>
							<Text style={styles.timeText}>{formatter(time, timeZone)}</Text>
							<LottieView
								style={styles.lottie}
								source={weatherIcon(item.weather[0].icon, item.weather[0].main)}
								progress={0.5}
								// autoPlay={'Rain' === item.weather[0].main}
								// loop={'Rain' === item.weather[0].main}
							/>
							<Text style={styles.tempText}>{Math.trunc(item.temp)} ˚C </Text>
						</View>
					) : null;
				})}
			</ScrollView>
		</View>
	);
};

const scale = PixelRatio.get();

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 2.5 < scale ? 25 : 40,
		borderRadius: 15,
		paddingVertical: 20,
		backgroundColor: 'rgba(255,255,255,0.5)',
	},
	heading: {
		paddingLeft: 20,
		paddingBottom: 15,
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.light.text,
	},
	itemContainer: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginHorizontal: 7,
	},
	timeText: {
		fontSize: 18,
		color: colors.light.text,
		paddingBottom: 10,
	},
	lottie: {
		width: 45,
		height: 45,
		alignItems: 'center',
	},
	tempText: {
		fontSize: 18,
		color: colors.light.text,
		paddingTop: 10,
	},
});

export default React.memo(Hourly);
