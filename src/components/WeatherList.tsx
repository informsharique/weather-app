/* eslint-disable global-require */
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, BackHandler, View, Image, StatusBar, Dimensions } from 'react-native';
import { shallowEqual } from 'react-redux';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-dynamic-vector-icons';
import { useFocusEffect, useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import LottieView from 'lottie-react-native';

import { formatter } from '@utils/formatter';
import { HomeStackParams } from '@navigation/types';
import { colors } from '@constants/colors';
import { fetchWeatherByPosition } from '@utils/fetchWeatherByPosition';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getWeather } from '@redux/Async';
import weatherIcon from '@utils/weatherIcon';
import { statusSelector } from '@selectors/selectors';
import WeatherCondition from './WeatherCondition';
import AtmosphereInfo from './AtmosphereInfo';
import Sunrise from './Sunrise';
import Forecast from './Forecast';
import { weatherData } from './types';
import { Text } from './Text';
import Header from './Header';

interface props {
	item: Partial<weatherData>;
	index?: number;
}

const WeatherList: React.JSXElementConstructor<props> = ({ item }) => {
	const translationY = useSharedValue(0);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const { hasPermission } = useAppSelector((state) => state.permission, shallowEqual);
	const status = useAppSelector(statusSelector, shallowEqual);
	const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
	const navigationState = useNavigationState((state) => state);
	const { index, routeNames } = navigationState;
	const dispatch = useAppDispatch();

	const timeZone = item?.timezone;
	const current = item?.current;
	const icon = current?.weather[0]?.icon;
	const main = current?.weather[0]?.main;
	const sunriseSec = current?.sunrise;
	const sunsetSec = current?.sunset;
	const sunriseDate = sunriseSec && new Date(sunriseSec * 1000);
	const sunsetDate = sunsetSec && new Date(sunsetSec * 1000);
	const sunrise = sunriseDate && formatter(sunriseDate, timeZone);
	const sunset = sunsetDate && formatter(sunsetDate, timeZone);
	const isLocationScreen = item?.isLocationScreen;
	const updated = item?.updated;
	const updatedTime = updated && formatDistanceStrict(updated, Date.now());

	const backAction = useCallback(() => {
		BackHandler.exitApp();
		return true;
	}, []);

	useFocusEffect(
		useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', backAction);
			return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
		}, [])
	);

	const scrollHandler = useAnimatedScrollHandler({
		// eslint-disable-next-line no-return-assign
		onScroll: (event) => (translationY.value = event.contentOffset.y),
	});

	const addCity = useCallback(() => {
		navigation.navigate('City');
	}, []);

	const onRefresh = useCallback(() => {
		const screen = 'denied' === hasPermission ? `Weather${index}` : `Weather${index - 1}`;
		setRefreshing(true);
		if ('Home' === routeNames[index]) {
			fetchWeatherByPosition(dispatch, setRefreshing);
		}
		if (screen === routeNames[index]) {
			const latitude = item.lat;
			const longitude = item.lon;
			const { city } = item;
			dispatch(getWeather({ latitude, longitude, city, isRefreshing: true })).then(() => setRefreshing(false));
		}
	}, [index]);

	if (current === undefined) return null;

	return (
		<>
			<RectButton onPress={addCity} style={styles.fab}>
				<Icon type="MaterialCommunityIcons" name="home-city-outline" size={25} color={colors.light.text} />
			</RectButton>
			<LottieView style={styles.lottie} source={weatherIcon(icon, main)} autoPlay loop />
			<Header
				translationY={translationY}
				city={item?.city}
				isLocationScreen={isLocationScreen}
				updatedTime={updatedTime}
			/>
			<Animated.ScrollView
				contentContainerStyle={{ paddingBottom: 150 }}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				nestedScrollEnabled
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						progressViewOffset={StatusBar.currentHeight}
					/>
				}
			>
				<WeatherCondition
					cityName={item?.city}
					isLocationScreen={item?.isLocationScreen}
					temp={current?.temp}
					weatherDescription={current.weather[0].description}
					feelsLike={current.feels_like}
				/>
				<AtmosphereInfo
					humidity={current.humidity}
					pressure={current.pressure}
					windSpeed={current.wind_speed}
					uv={current.uvi}
					visibility={current.visibility}
					precipitation={item.hourly[0].pop}
					windDirection={current.wind_deg}
				/>
				<Sunrise sunrise={sunrise} sunset={sunset} />
				<Forecast hourly={item?.hourly} daily={item?.daily} timeZone={timeZone} />
				<View style={styles.provider}>
					<Text style={{ marginRight: 20 }}>Powered by</Text>
					<Image style={styles.providerImage} source={require('../../assets/open-weather.png')} />
				</View>
			</Animated.ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	lottie: {
		position: 'absolute',
		top: '10%',
		right: '-5%',
		width: '80%',
	},
	fab: {
		zIndex: 1,
		position: 'absolute',
		bottom: 160,
		right: 40,
		width: 55,
		height: 55,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'hsl(230,30%,70%)',
		elevation: 10,
	},
	provider: {
		flexDirection: 'row',
		marginLeft: 25,
		alignItems: 'center',
	},
	providerImage: {
		width: 60,
		height: 25,
	},
	backgroundImage: {},
});

export default React.memo(WeatherList);
