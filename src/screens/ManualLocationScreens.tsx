import React from 'react';
import { StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { weatherData } from '@components/types';
import WeatherList from '@components/WeatherList';

interface Props {
	item: Partial<weatherData>;
}

const ManualLocationScreens: React.FC<Props> = ({ item }) => {
	return (
		<View style={{ flex: 1, backgroundColor: '#fefefe' }}>
			<LinearGradient colors={['#e7ded5', '#dae2f8']}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
				<WeatherList item={item} />
			</LinearGradient>
		</View>
	);
};

export default React.memo(ManualLocationScreens);
