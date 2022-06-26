import { colors } from '@constants/colors';
import React, { useEffect, useState } from 'react';
import { PixelRatio, StatusBar, StyleSheet, Text } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-dynamic-vector-icons';

interface headerProps {
	city: string;
	isLocationScreen: boolean;
	updatedTime: string;
	translationY: Animated.SharedValue<number>;
}

const Header: React.FC<headerProps> = ({ translationY, city, isLocationScreen, updatedTime }) => {
	const inputRange = [0, 100];
	const rStyles = useAnimatedStyle(() => {
		const fontSize = interpolate(translationY.value, inputRange, [45, 30], Extrapolate.CLAMP);
		const paddingLeft = interpolate(translationY.value, inputRange, [0, 4], Extrapolate.CLAMP);
		return {
			fontSize,
			paddingLeft,
		};
	}, []);

	return (
		<Animated.View style={styles.container}>
			<Animated.Text numberOfLines={2} style={[styles.city, rStyles]}>
				{city}
			</Animated.Text>
			<Animated.View style={styles.updated}>
				{isLocationScreen && <Icon type="MaterialIcons" name="location-pin" color="black" />}
				<Text style={styles.updatedText}>
					{updatedTime && updatedTime.includes('second') ? 'Just Updated' : `Updated ${updatedTime} ago`}
				</Text>
			</Animated.View>
		</Animated.View>
	);
};

const scale = PixelRatio.get();

const styles = StyleSheet.create({
	container: {
		paddingTop: StatusBar.currentHeight + 20,
		backgroundColor: 'transparent',
	},
	city: {
		color: colors.light.text,
		paddingBottom: 5,
		marginHorizontal: 2.5 < scale ? 25 : 40,
	},
	updated: {
		flexDirection: 'row',
		marginHorizontal: 2.5 < scale ? 25 : 40,
	},
	updatedText: {
		top: 2,
		paddingLeft: 5,
		paddingBottom: 15,
	},
});

export default Header;
