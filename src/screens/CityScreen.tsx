import React, { useCallback, useLayoutEffect, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton, FlatList } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

import { compositeNavigation } from '@navigation/types';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { listSelector, manualListSelector } from '@selectors/selectors';
import { colors } from '@constants/colors';
import capitalize from '@utils/capitalize';
import weatherIcon from '@utils/weatherIcon';
import Icon from 'react-native-dynamic-vector-icons';
import CityList from '@components/CityList';
import SwipeableRow from '@components/SwipeableRow';
import { deleting } from '@redux/Slices/manualWeatherSlice';
import { shallowEqual } from 'react-redux';

const isEmpty = (obj) => 0 === Object.entries(obj).length && obj.constructor === Object;

const renderItem = ({ item, index }) => (
	<SwipeableRow index={index}>
		<CityList item={item} index={index} />
	</SwipeableRow>
);

const Cities: React.FC = () => {
	const navigation = useNavigation<compositeNavigation>();
	const isDeleting = useAppSelector((state) => state.manualWeather.deleting, shallowEqual);
	const data = useAppSelector(manualListSelector, shallowEqual);
	const list = useAppSelector(listSelector, shallowEqual);
	const hasPermission = useAppSelector((state) => state.permission.hasPermission, shallowEqual);
	const city = useAppSelector((state) => state.city.city, shallowEqual);
	const dispatch = useAppDispatch();
	const listLength = !isEmpty(list) ? 1 : 0;
	const totalItems = listLength + data.length;
	console.log(totalItems);

	const icon = list?.current?.weather[0]?.icon;
	const main = list?.current?.weather[0]?.main;

	const backAction = useCallback(() => {
		if (0 === totalItems) {
			BackHandler.exitApp();
			return true;
		}
		return false;
	}, [totalItems]);

	useFocusEffect(
		useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', backAction);
			return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
		}, [])
	);

	useEffect(() => {
		if (isDeleting && 0 === totalItems) navigation.goBack();
		dispatch(deleting(false));
	}, []);

	const navigateToMain = useCallback(() => navigation.navigate('Home'), [navigation, totalItems]);

	const addCity = useCallback(() => {
		navigation.navigate('AddCity');
	}, []);

	const headerLeft = totalItems ? (
		<Icon
			onPress={() => navigation.navigate('Main')}
			style={{ marginLeft: 12 }}
			name="arrow-back"
			type="MaterialIcons"
			size={24}
			color="black"
		/>
	) : null;

	return (
		<>
			<StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
			{'granted' === hasPermission ? (
				<LinearGradient
					locations={[0, 0.5, 1]}
					colors={[backgroundColor(), backgroundColor(), backgroundColor()]}
					useAngle
					angle={135}
					angleCenter={{ x: 0.3, y: 0.3 }}
				>
					<TouchableWithoutFeedback
						style={[styles.button, { backgroundColor: backgroundColor() }]}
						onPress={navigateToMain}
					>
						<View style={styles.button}>
							<View style={styles.description}>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
									<Text style={styles.city}>{city}</Text>
									<Icon type="MaterialIcons" name="location-pin" color="black" />
								</View>
								<Text style={styles.city}>{Math.trunc(list.current.temp)}˚</Text>
								<Text style={[styles.city, { fontSize: 20 }]}>
									{capitalize(list.current.weather[0].description)}
								</Text>
							</View>
							<View style={styles.description}>
								<LottieView
									style={{ width: 100, height: 100 }}
									source={weatherIcon(icon, main)}
									autoPlay
									loop
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</LinearGradient>
			) : null}
			{0 < data.length ? (
				<FlatList
					keyExtractor={(_, index) => String(index)}
					contentContainerStyle={{ backgroundColor: '#fefefe' }}
					data={data}
					renderItem={renderItem}
				/>
			) : 'denied' === hasPermission ? (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fefefe' }}>
					<Text style={styles.city}>No Cities found...</Text>
				</View>
			) : null}
			<RectButton onPress={addCity} style={styles.fab}>
				<Icon type="MaterialCommunityIcons" name="plus" size={30} color={colors.light.text} />
			</RectButton>
		</>
	);
};

const styles = StyleSheet.create({
	button: {
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
	fab: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		width: 55,
		height: 55,
		borderRadius: 35,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'hsl(270,30%,70%)',
		elevation: 12,
	},
});

const rand = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const backgroundColor = () => {
	const h = rand(0, 360);
	const s = rand(60, 95);
	const l = rand(80, 90);
	return 'hsla(' + h + ',' + s + '%,' + l + '%, 0.5)';
};

export default Cities;
