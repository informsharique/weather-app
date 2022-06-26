import React, { useCallback, useLayoutEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, UIManager, Platform, Dimensions, BackHandler } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import SearchBar from 'react-native-dynamic-search-bar';
import Loader from 'react-native-spinkit';
import Localize from 'react-native-localize';

import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-dynamic-vector-icons';
import { MainNavigationProp } from '@navigation/types';
import Cities from './Cities';

interface cityState {
	lat: number;
	lon: number;
	city: string;
	importance?: number;
	display_name?: string;
}

const AddCity: React.FC = () => {
	const [spinnerVisibility, setSpinnerVisibility] = useState<boolean>();
	const [cities, setCities] = useState<Array<cityState>>([]);
	const navigation = useNavigation<MainNavigationProp['navigation']>();
	const lang = Localize.getLocales()[0].languageCode;

	if ('android' === Platform.OS) {
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
	}

	useLayoutEffect(() => {
		if ('android' === Platform.OS) {
			StatusBar.setBackgroundColor('transparent');
			StatusBar.setTranslucent(true);
		}
	}, []);

	const backAction = useCallback(() => {
		navigation.goBack();
		return true;
	}, [navigation]);

	useFocusEffect(
		useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', backAction);
			return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
		}, [])
	);

	const debounced = useDebouncedCallback(async (text: string) => {
		setCities([]);
		if (3 <= text.length) {
			setSpinnerVisibility(true);
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?city=${text}&format=json&addressdetails=1&limit=3&accept-language=${lang}`
			);
			const data = await response.json();
			const citiesList =
				data &&
				data.map((loc: cityState) => {
					const valid = 0.4 <= loc.importance;
					if (valid) {
						const cityName = loc.display_name;
						const { lon, lat } = loc;
						const cityNameSet = cityName.split(',');
						if (3 < cityNameSet.length) {
							const cityArr = cityNameSet.filter((ele) => !ele.match(/[0-9]/g));
							const city = `${cityArr[0]},${cityArr.slice(cityArr.length - 2, cityArr.length)}`;
							return { city, lat, lon };
						}
						return { city: cityName, lat, lon };
					}
					return null;
				});
			const filteredCities = citiesList.filter((item: cityState) => null !== item);
			setCities(filteredCities);
			setSpinnerVisibility(false);
		}
		if (3 > text.length) setCities([]);
		return [];
	}, 1000);

	useLayoutEffect(
		useCallback(() => {
			navigation.setOptions({
				header: () => (
					<View style={styles.header}>
						<Icon
							onPress={() => navigation.pop()}
							style={{ top: 17, left: 12, paddingRight: 5 }}
							name="arrow-back"
							type="MaterialIcons"
							size={24}
							color="black"
						/>
						<SearchBar
							style={styles.search}
							autoCapitalize="words"
							autoFocus
							textInputStyle={styles.input}
							returnKeyLabel="Search"
							returnKeyType="search"
							placeholder="Enter City Name..."
							selectionColor={colors.light.iconColor}
							clearIconComponent={
								<Icon style={{ left: 15 }} name="close" type="MaterialCommunityIcons" size={28} />
							}
							searchIconComponent={<View />}
							onClearPress={() => setCities([])}
							onChangeText={(text) => debounced(text)}
						/>
					</View>
				),
			});
		}, [navigation])
	);

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
			{0 < cities.length ? (
				cities.map((city, index) => {
					return <Cities key={String(index)} city={city} />;
				})
			) : !spinnerVisibility ? (
				<Text
					style={{
						textAlign: 'center',
						fontSize: 24,
						fontWeight: 'bold',
					}}
				>
					No Cities Found...
				</Text>
			) : null}
			{spinnerVisibility && (
				<View style={{ alignItems: 'center' }}>
					<Loader type="Pulse" size={32} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
	},
	header: {
		marginTop: StatusBar.currentHeight * 1.2,
		backgroundColor: 'transparent',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc5',
		borderRadius: 0,
	},
	search: {
		marginBottom: -5,
		width: Dimensions.get('window').width - 80,
		backgroundColor: 'transparent',
		top: -15,
		left: 20,
	},
	input: {
		height: 60,
		fontSize: 20,
		marginLeft: -15,
	},
});

export default AddCity;
