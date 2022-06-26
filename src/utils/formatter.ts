import { utcToZonedTime, format } from 'date-fns-tz';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import Localize from 'react-native-localize';

export const formatter = (time: Date, timeZone: string): string => {
	// const timeZone = Localize.getTimeZone();
	const formatPattern = Localize.uses24HourClock() ? 'HH:mm' : 'p';
	const formatted = time && format(utcToZonedTime(time, timeZone), formatPattern, { timeZone });
	return formatted;
};

export const formatDay = (time: Date, timeZone: string): string => {
	// const timeZone = Localize.getTimeZone();
	const formatPattern = 'cccc';
	const formatted = format(utcToZonedTime(time, timeZone), formatPattern, { timeZone });
	return formatted;
};

export const formatDate = (time: Date, timeZone: string): string => {
	// const timeZone = Localize.getTimeZone();
	const formatPattern = 'PP';
	const formatted = format(utcToZonedTime(time, timeZone), formatPattern, { timeZone });
	return formatted.split(',')[0];
};

export const difference = (date1: Date, date2: Date): number => {
	return differenceInSeconds(date1, date2);
};
