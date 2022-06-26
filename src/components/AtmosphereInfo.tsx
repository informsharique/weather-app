import React, { useCallback, useMemo } from 'react';
import { PixelRatio, StyleSheet, View } from 'react-native';

import { Text } from '@components/Text';

interface atmProps {
	humidity: number;
	pressure: number;
	windSpeed: number;
	uv: number;
	visibility: number;
	precipitation: number;
	windDirection: number;
}

const AtmosphereInfo: React.FC<atmProps> = ({
	humidity,
	pressure,
	precipitation,
	uv,
	visibility,
	windDirection,
	windSpeed,
}) => {
	const getUVI = useMemo(() => {
		let uvi: string;
		if (2 >= uv) uvi = 'Low';
		if (2 < uv && 7 >= uv) uvi = 'Moderate';
		if (7 < uv && 11 > uv) uvi = 'Very High';
		if (11 <= uv) uvi = 'Extreme';
		return uvi;
	}, []);

	const getDirection = useCallback((angle: number) => {
		const rem = Math.floor(angle / 22.5 + 0.5);
		const directions = [
			'N',
			'NNE',
			'NE',
			'ENE',
			'E',
			'ESE',
			'SE',
			'SSE',
			'S',
			'SSW',
			'SW',
			'WSW',
			'W',
			'WNW',
			'NW',
			'NNW',
		];
		return directions[rem % 16];
	}, []);

	return (
		<View style={styles.wrapper}>
			<Text style={styles.title}>Details</Text>
			<View style={styles.container}>
				<View style={styles.item}>
					<View style={styles.content}>
						<Text style={styles.cardTitle}>Humidity</Text>
						<Text style={styles.contentText}>{`${humidity} %`}</Text>
					</View>
					<View style={[styles.content, { justifyContent: 'flex-end' }]}>
						<Text style={styles.cardTitle}>Pressure</Text>
						<Text style={styles.contentText}>{`${Math.trunc(pressure * 0.75006375541921)} mmHg`}</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.cardTitle}>Visibility</Text>
						<Text style={styles.contentText}>{`${visibility / 1000} Km`}</Text>
					</View>
				</View>
				<View style={styles.item}>
					<View style={styles.content}>
						<Text style={styles.cardTitle}>UV</Text>
						<Text style={styles.contentText}>{getUVI}</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.cardTitle}>{getDirection(windDirection)} Wind</Text>
						<Text style={styles.contentText}>{Number((windSpeed * 18) / 5).toFixed(2)} Km/h</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.cardTitle}>Precipitation</Text>
						<Text style={styles.contentText}>{`${precipitation || '0.0'} mm`}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const scale = PixelRatio.get();

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		borderRadius: 15,
		marginHorizontal: 2.5 < scale ? 25 : 40,
		backgroundColor: 'rgba(255,255,255,0.5)',
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		marginTop: 30,
		borderRadius: 10,
	},
	item: {
		width: '50%', // is 50% of container width
	},
	title: {
		fontSize: 20,
		marginLeft: 18,
		marginTop: 15,
		marginBottom: -15,
	},
	cardTitle: {
		fontSize: 12,
		color: '#444',
		paddingBottom: 5,
	},
	content: {
		padding: 20,
	},
	contentText: {
		fontSize: 20,
	},
});

export default AtmosphereInfo;
