import React from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator,
	HeaderStyleInterpolators,
	TransitionSpecs,
} from '@react-navigation/stack';

import CityScreen from '@screens/CityScreen';
import SettingsScreen from '@screens/SettingsScreen';
import SwipeNavigator from '@navigation/swiper/Swiper';
import AddCityScreen from '@screens/AddCityScreen';
import { HomeStackParams } from '../types';

const Stack = createStackNavigator<HomeStackParams>();

const Home: React.FC = () => {
	return (
		<Stack.Navigator
			initialRouteName="Main"
			headerMode="screen"
			screenOptions={{
				transitionSpec: {
					open: TransitionSpecs.TransitionIOSSpec,
					close: TransitionSpecs.TransitionIOSSpec,
				},
				cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
				headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
			}}
		>
			<Stack.Screen name="Main" component={SwipeNavigator} />
			<Stack.Screen name="City" component={CityScreen} />
			<Stack.Screen name="AddCity" component={AddCityScreen} />
			<Stack.Screen name="Settings" component={SettingsScreen} />
		</Stack.Navigator>
	);
};

export default Home;
