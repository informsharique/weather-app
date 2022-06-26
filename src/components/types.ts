interface WeatherCondition {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface DailyTemp {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
}

interface DailyFeel {
	day: number;
	night: number;
	eve: number;
	morn: number;
}

export interface CurrentWeather {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: WeatherCondition[];
}

export interface HourlyWeather {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	pop: number;
	weather: WeatherCondition[];
}

export interface DailyWeather {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: DailyTemp;
	feels_like: DailyFeel;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: WeatherCondition[];
	clouds: number;
	pop: number;
	uvi: number;
}

export interface weatherData {
	updated?: number;
	isLocationScreen?: boolean;
	isRefreshing?: boolean;
	lat: number;
	lon: number;
	city?: string;
	timezone: string;
	timezone_offset: string;
	current: CurrentWeather;
	hourly: HourlyWeather[];
	daily: DailyWeather[];
}
