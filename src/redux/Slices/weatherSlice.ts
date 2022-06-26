/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { weatherData } from '@components/types';
import { getWeatherByGps } from '../Async';

interface SliceState {
	navigatingScreen: undefined | string;
	list: Partial<weatherData>;
	status: 'loading' | 'success' | 'failed';
}

const initialState: SliceState = {
	navigatingScreen: undefined,
	list: {},
	status: 'loading',
};

const weatherReducer = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		navigatingScreen: (state, action) => {
			state.navigatingScreen = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getWeatherByGps.pending, (state, _) => {
			state.status = 'loading';
		});
		builder.addCase(getWeatherByGps.fulfilled, (state, { payload }) => {
			state.status = 'success';
			state.list = payload;
		});
		builder.addCase(getWeatherByGps.rejected, (state, { payload }) => {
			console.log(payload);
			state.status = 'failed';
		});
	},
});

export const { navigatingScreen } = weatherReducer.actions;

export default weatherReducer.reducer;
