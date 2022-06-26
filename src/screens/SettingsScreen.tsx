import AddCity from '@components/AddCity';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

const SettingsScreen: React.FC = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Icon type="MaterialCommunityIcons" name="home" size={60} color="#efa423" />
		</View>
	);
};

export default SettingsScreen;
