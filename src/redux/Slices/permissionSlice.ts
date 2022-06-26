/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const permissionReducer = createSlice({
	name: 'permission',
	initialState: {
		hasPermission: 'denied',
	},
	reducers: {
		permission: (state, action) => {
			state.hasPermission = action.payload;
		},
	},
});

export const { permission } = permissionReducer.actions;

export default permissionReducer.reducer;
