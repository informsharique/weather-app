import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reduxFlipper from 'redux-flipper';

import { rootReducer } from './reducers';

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
	whitelist: ['permission', 'city', 'weather', 'manualWeather'],
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		if (__DEV__) {
			return getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(reduxFlipper());
		}
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		});
	},
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
