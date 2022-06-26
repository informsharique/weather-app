import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

interface cityData {
	lat: number;
	lon: number;
	text: string;
	address: {
		city: string;
	};
}

export const getCityName = createAsyncThunk<
	// Return type of the payload creator
	cityData,
	// First argument to the payload creator
	{
		text: string;
	},
	// Optional fields for defining thunkApi field types
	{
		dispatch: AppDispatch;
		state: RootState;
	}
>('city', async ({ text }, thunkApi) => {
	const url = `https://nominatim.openstreetmap.org/search/${text}?format=json&addressdetails=1&limit=10`;
	const locationRequest = await fetch(url);
	const locationResponse: Promise<cityData> = await locationRequest.json();

	return locationResponse;
});
