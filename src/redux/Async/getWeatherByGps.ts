import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_KEY } from '@api/api';
import { weatherData } from 'components/types';
import { AppDispatch, RootState } from '../store';

export const getWeatherByGps = createAsyncThunk<
	// Return type of the payload creator
	weatherData,
	// First argument to the payload creator
	{
		latitude: number;
		longitude: number;
	},
	// Optional fields for defining thunkApi field types
	{
		dispatch: AppDispatch;
		state: RootState;
	}
>('weather/gps', async ({ latitude, longitude }, { rejectWithValue }) => {
	const updated = Date.now();
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
	try {
		const weatherRequest = await fetch(url, { headers: { Connection: 'Close' } });
		const weatherResponse: Promise<weatherData> = await weatherRequest.json();
		return { ...weatherResponse, updated, isLocationScreen: true };
	} catch (error) {
		return rejectWithValue(error);
	}
});
