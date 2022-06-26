/* eslint-disable no-param-reassign */
import { createSlice, current, original, PayloadAction } from '@reduxjs/toolkit';
import { weatherData } from '@components/types';
import { getWeather } from '../Async';

interface SliceState {
	manualList: Array<Partial<weatherData>>;
	status: 'loading' | 'success' | 'failed';
	deleting: boolean;
}

const initialState: SliceState = {
	manualList: [],
	status: 'loading',
	deleting: false,
};

const manualWeatherReducer = createSlice({
	name: 'manualWeather',
	initialState,
	reducers: {
		deleteCity: (state, action: PayloadAction<number>) => {
			state.manualList = state.manualList.filter((_, i) => i !== action.payload);
		},
		deleting: (state, action: PayloadAction<boolean>) => {
			state.deleting = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getWeather.pending, (state, _) => {
			state.status = 'loading';
		});
		builder.addCase(getWeather.fulfilled, (state, { payload }) => {
			if (payload.isRefreshing) {
				state.manualList.find((item, index) => {
					if (item.lat === payload.lat && item.lon === payload.lon) {
						state.manualList[index] = payload;
					}
					return null;
				});
			}
			if (!payload.isRefreshing) state.manualList.push(payload);
			state.status = 'success';
		});
		builder.addCase(getWeather.rejected, (state, { payload }) => {
			console.log(payload);
			state.status = 'failed';
		});
	},
});

export const { deleteCity, deleting } = manualWeatherReducer.actions;

export default manualWeatherReducer.reducer;
