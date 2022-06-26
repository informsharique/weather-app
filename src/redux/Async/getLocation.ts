import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

interface cityData {
	name: string;
}

export const getCityName = createAsyncThunk<
	// Return type of the payload creator
	cityData,
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
>('city', async ({ latitude, longitude }, thunkApi) => {
	const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=7`;
	const locationRequest = await fetch(url);
	const locationResponse: Promise<cityData> = await locationRequest.json();

	return locationResponse;
});
