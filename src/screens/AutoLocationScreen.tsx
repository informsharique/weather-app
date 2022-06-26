import React from 'react';
import { StatusBar, View, ImageBackground, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useAppSelector } from '@redux/hooks';
import { shallowEqual } from 'react-redux';
import { listSelector } from '@selectors/selectors';
import WeatherList from '@components/WeatherList';

const BACKGROUND_IMAGE = require('../../assets/clear-night.jpg');

const AutoLocationScreen: React.FC = () => {
	const list = useAppSelector(listSelector, shallowEqual);
	const { city } = useAppSelector((state) => state.city, shallowEqual);

	return (
		<LinearGradient colors={['#e7ded5', '#dae2f8']}>
			<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
			<WeatherList item={{ ...list, city }} />
		</LinearGradient>
	);
};

export default React.memo(AutoLocationScreen);
