import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './Slices/weatherSlice';
import permissionReducer from './Slices/permissionSlice';
import cityReducer from './Slices/locationSlice';
import manualWeatherReducer from './Slices/manualWeatherSlice';

export const rootReducer = combineReducers({
	weather: weatherReducer,
	city: cityReducer,
	manualWeather: manualWeatherReducer,
	permission: permissionReducer,
});
