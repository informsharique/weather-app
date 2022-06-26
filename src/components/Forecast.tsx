import React from 'react';
import Daily from './Daily';
import Hourly from './Hourly';
import { HourlyWeather, DailyWeather } from './types';

interface props {
	hourly: HourlyWeather[];
	daily: DailyWeather[];
	timeZone: string;
}

const Forecast: React.FC<props> = ({ hourly, daily, timeZone }) => {
	return (
		<>
			<Hourly data={hourly} timeZone={timeZone} />
			<Daily data={daily} timeZone={timeZone} />
		</>
	);
};

export default Forecast;
