import React from 'react';
import { View, Text, Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { DefaultNavigatorOptions, TabRouterOptions } from '@react-navigation/native';
import {
	MaterialTopTabNavigationConfig,
	MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs/lib/typescript/src/types';

type Props = DefaultNavigatorOptions<MaterialTopTabNavigationOptions> &
	TabRouterOptions &
	MaterialTopTabNavigationConfig;

const TabBar: React.FC<Props> = ({ state, descriptors, navigation, position }) => {
	return (
		<View style={{ flexDirection: 'row', paddingTop: 20 }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<RectButton
						key={route.key}
						testID={options.tabBarTestID}
						onPress={onPress}
						style={{ flex: 1, marginTop: 45, justifyContent: 'center' }}
					>
						<Animated.Text style={{ textAlign: 'center' }}>{Number(label) + 1}</Animated.Text>
					</RectButton>
				);
			})}
		</View>
	);
};

export default TabBar;
