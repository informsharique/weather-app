import React, { useContext, useEffect, useRef, useCallback, useMemo } from 'react';
import { StyleSheet, View, I18nManager } from 'react-native';
import { MainNavigationProp } from '@navigation/types';
import { useNavigation } from '@react-navigation/core';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { deleteCity, deleting } from '@redux/Slices/manualWeatherSlice';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { Text } from '@components/Text';
import { listSelector, manualListSelector } from '@selectors/selectors';
import { shallowEqual } from 'react-redux';
import { SwipeContext } from './SwipeProvider';

interface props {
	index: number;
}

const SwipeableRow: React.FC<props> = ({ children, index }) => {
	const swipeableRef = useRef<Swipeable | null>(null);
	const { openedItemKey, setOpenedItemKey } = useContext(SwipeContext);
	const list = useAppSelector(listSelector, shallowEqual);
	const data = useAppSelector(manualListSelector, shallowEqual);
	const navigation = useNavigation<MainNavigationProp['navigation']>();
	const dispatch = useAppDispatch();

	const totalItems = useMemo(() => Object.entries(list).length + data.length, [data, list]);

	useEffect(() => {
		if (openedItemKey && index !== openedItemKey) {
			close();
		}
	}, [index, openedItemKey]);

	const close = useCallback(() => {
		if (swipeableRef.current) {
			swipeableRef.current.close();
		}
	}, [swipeableRef]);

	const handleSwipe = useCallback(() => {
		setOpenedItemKey(index);
	}, [index]);

	const pressHandler = useCallback(() => {
		dispatch(deleting(true));
		dispatch(deleteCity(index));
		if (0 === totalItems) dispatch(deleting(false));
		close();
	}, [totalItems, data]);

	const renderRightAction = (text: string, color: string) => {
		return (
			<View style={{ flex: 1 }}>
				<RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
					<Text style={styles.actionText}>{text}</Text>
				</RectButton>
			</View>
		);
	};

	const renderRightActions = () => (
		<View style={styles.rightActionButton}>{renderRightAction('Delete', '#dd2c00')}</View>
	);

	return (
		<Swipeable
			ref={swipeableRef}
			friction={2}
			leftThreshold={30}
			renderRightActions={renderRightActions}
			onSwipeableOpen={handleSwipe}
		>
			{children}
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	rightAction: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightActionButton: {
		height: 130,
		width: 192,
		flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
	},
	actionText: {
		color: 'white',
		fontSize: 16,
		padding: 10,
	},
});

export default SwipeableRow;
