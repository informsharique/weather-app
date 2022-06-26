import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { PermissionsAndroid, Platform, StatusBar } from 'react-native';
import { shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Localize from 'react-native-localize';

import { fetchWeatherByPosition } from '@utils/fetchWeatherByPosition';
import { permission } from '@redux/Slices/permissionSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import CityScreen from '@screens/CityScreen';
import AutoLocationScreen from '@screens/AutoLocationScreen';
import ManualLocationScreens from '@screens/ManualLocationScreens';
import { listSelector, manualListSelector } from '@selectors/selectors';
import { SwiperStackParam } from '../types';

const Tab = createMaterialTopTabNavigator<SwiperStackParam | any>();

const isEmpty = (obj) => 0 === Object.entries(obj).length && obj.constructor === Object;

const SwipeNavigator: React.FC = () => {
	const navigation = useNavigation();
	const { hasPermission } = useAppSelector((state) => state.permission, shallowEqual);
	const dispatch = useAppDispatch();

	const data = useAppSelector(manualListSelector, shallowEqual);
	const list = useAppSelector(listSelector, shallowEqual);
	const listLength = !isEmpty(list) ? 1 : 0;
	const totalItems = listLength + data.length;

	useLayoutEffect(
		useCallback(() => {
			if ('android' === Platform.OS) {
				StatusBar.setBarStyle('dark-content');
				StatusBar.setBackgroundColor('transparent');
				StatusBar.setTranslucent(true);
			}
			navigation.setOptions({
				header: () => null,
			});
		}, [])
	);

	const checkPermission = async () => {
		const hasLocationPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);
		if (hasLocationPermission) dispatch(permission('granted'));
		if (!hasLocationPermission) {
			dispatch(permission('denied'));
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					dispatch(permission('granted'));
				} else {
					dispatch(permission('denied'));
				}
			} catch (err) {
				dispatch(permission('denied'));
			}
		}
	};

	const handleLocaleChanges = useCallback(() => fetchWeatherByPosition(dispatch), []);

	useEffect(() => {
		Localize.addEventListener('change', handleLocaleChanges);
		return () => Localize.removeEventListener('change', handleLocaleChanges);
	}, []);

	useEffect(() => {
		checkPermission();
		'granted' === hasPermission && fetchWeatherByPosition(dispatch);
	}, [hasPermission]);

	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBarOptions={{
				style: { height: 0, width: 0 },
			}}
		>
			{'granted' === hasPermission && <Tab.Screen name="Home" component={AutoLocationScreen} />}
			{0 < data.length &&
				data.map((item, index) => (
					<Tab.Screen key={String(index)} name={`Weather${index}`}>
						{(props) => <ManualLocationScreens item={item} {...props} />}
					</Tab.Screen>
				))}
			{'denied' === hasPermission && <Tab.Screen name="City" component={CityScreen} />}
		</Tab.Navigator>
	);
};

export default SwipeNavigator;
