import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash.isequal';
import { RootState } from '@redux/store';

const manualList = (state: RootState) => state.manualWeather.manualList;
const list = (state: RootState) => state.weather.list;
const status = (state: RootState) => state.weather.status;
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
export const manualListSelector = createDeepEqualSelector(manualList, (items) => items);
export const listSelector = createDeepEqualSelector(list, (item) => item);
export const statusSelector = createDeepEqualSelector(status, (item) => item);
