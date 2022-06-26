/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getCityName } from '../Async';

interface SliceState {
	city: string;
	status: 'loading' | 'success' | 'failed';
}

const initialState: SliceState = {
	city: '',
	status: 'loading',
};

const locationReducer = createSlice({
	name: 'city',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCityName.pending, (state, _) => {
			state.status = 'loading';
		});
		builder.addCase(getCityName.fulfilled, (state, { payload }) => {
			state.status = 'success';
			state.city = payload.name;
		});
		builder.addCase(getCityName.rejected, (state, { payload }) => {
			console.log(payload);
			state.status = 'failed';
		});
	},
});

export default locationReducer.reducer;
