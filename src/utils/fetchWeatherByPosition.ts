import Geolocation from 'react-native-geolocation-service';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

import { getCityName, getWeatherByGps } from '@redux/Async';
import { RootState } from '@redux/store';
import { permission } from '@redux/Slices/permissionSlice';

export const fetchWeatherByPosition = async (
	dispatch: ThunkDispatch<RootState, null, Action>,
	setRefreshing?: React.Dispatch<boolean>
): Promise<void> => {
	Geolocation.getCurrentPosition(
		({ coords: { latitude, longitude } }) => {
			dispatch(getCityName({ latitude, longitude }));
			dispatch(getWeatherByGps({ latitude, longitude })).then(() => {
				if (setRefreshing) setRefreshing(false);
				return null;
			});
		},
		(error) => dispatch(permission('denied')),
		{
			accuracy: {
				android: 'balanced',
				ios: 'kilometer',
			},
			showLocationDialog: true,
			forceRequestLocation: true,
		}
	);
};
