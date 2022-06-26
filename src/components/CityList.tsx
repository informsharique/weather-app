import React, { useCallback } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import { Text } from '@components/Text';
import weatherIcon from '@utils/weatherIcon';
import capitalize from '@utils/capitalize';
import { compositeNavigation } from '@navigation/types';
import { weatherData } from './types';

interface props {
	item: Partial<weatherData>;
	index: number;
}

const CityList: React.JSXElementConstructor<props> = ({ item, index }) => {
	const navigation = useNavigation<compositeNavigation | any>();
	const navigateToScreen = useCallback(() => navigation.navigate(`Weather${index}`), []);

	return (
		<LinearGradient
			locations={[0, 0.5, 1]}
			colors={[backgroundColor(), backgroundColor(), backgroundColor()]}
			useAngle
			angle={135}
			angleCenter={{ x: 0.3, y: 0.3 }}
		>
			<TouchableWithoutFeedback style={styles.button} onPress={navigateToScreen}>
				<View style={styles.button}>
					<View style={styles.description}>
						<Text style={[styles.city, { marginBottom: 10 }]}>{item.city}</Text>
						<Text style={styles.city}>{Math.trunc(item.current.temp)}˚</Text>
						<Text style={[styles.city, { fontSize: 20 }]}>
							{capitalize(item.current.weather[0].description)}
						</Text>
					</View>
					<View style={styles.description}>
						<LottieView
							style={{ width: 100, height: 100 }}
							source={weatherIcon(item.current.weather[0].icon, item.current.weather[0].main)}
							autoPlay
							loop
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 0,
		paddingHorizontal: 30,
		height: 130,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	description: {
		flexDirection: 'column',
	},
	city: {
		fontSize: 28,
		// fontWeight: 'bold',
		marginRight: 5,
		color: '#2B0613',
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

export default CityList;
