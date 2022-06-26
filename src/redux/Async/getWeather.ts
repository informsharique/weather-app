import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_KEY } from '@api/api';
import { weatherData } from 'components/types';
import { AppDispatch, RootState } from '../store';

export const getWeather = createAsyncThunk<
	// Return type of the payload creator
	weatherData,
	// First argument to the payload creator
	{
		latitude: number;
		longitude: number;
		city: string;
		isRefreshing: boolean;
	},
	// Optional fields for defining thunkApi field types
	{
		dispatch: AppDispatch;
		state: RootState;
	}
>('weather/manual', async ({ latitude, longitude, city, isRefreshing }, { getState, rejectWithValue }) => {
	const updated = Date.now();
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
	try {
		const weatherRequest = await fetch(url);
		const weatherResponse: Promise<weatherData> = await weatherRequest.json();
		return { ...weatherResponse, city, isRefreshing, updated };
	} catch (error) {
		return rejectWithValue(error);
	}
});
