/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */

const weatherIcon = (icon: string, main: string): string => {
	let imageSource: string;
	switch (icon) {
		case '11d': {
			imageSource = require('../../assets/lottie-files/thunderstorm-d.json');
			return imageSource;
		}
		case '11n': {
			imageSource = require('../../assets/lottie-files/thunderstorm-n.json');
			return imageSource;
		}
		case '09d': {
			if ('Rain' === main) {
				imageSource = require('../../assets/lottie-files/shower-rain-d.json');
				return imageSource;
			}
			imageSource = require('../../assets/lottie-files/drizzle-d.json');
			return imageSource;
		}
		case '09n': {
			if ('Rain' === main) {
				imageSource = require('../../assets/lottie-files/shower-rain-n.json');
				return imageSource;
			}
			imageSource = require('../../assets/lottie-files/drizzle-n.json');
			return imageSource;
		}
		case '10d': {
			imageSource = require('../../assets/lottie-files/rain-d.json');
			return imageSource;
		}
		case '10n': {
			imageSource = require('../../assets/lottie-files/rain-n.json');
			return imageSource;
		}
		case '13d': {
			imageSource = require('../../assets/lottie-files/snow-d.json');
			return imageSource;
		}
		case '13n': {
			imageSource = require('../../assets/lottie-files/snow-n.json');
			return imageSource;
		}
		case '50d': {
			imageSource = require('../../assets/lottie-files/mist-d.json');
			return imageSource;
		}
		case '50n': {
			imageSource = require('../../assets/lottie-files/mist-n.json');
			return imageSource;
		}
		case '01d': {
			imageSource = require('../../assets/lottie-files/clear-sky-d.json');
			return imageSource;
		}
		case '01n': {
			imageSource = require('../../assets/lottie-files/clear-sky-n.json');
			return imageSource;
		}
		case '02d': {
			imageSource = require('../../assets/lottie-files/few-clouds-d.json');
			return imageSource;
		}
		case '02n': {
			imageSource = require('../../assets/lottie-files/few-clouds-n.json');
			return imageSource;
		}
		case '03d': {
			imageSource = require('../../assets/lottie-files/scattered-clouds-d.json');
			return imageSource;
		}
		case '03n': {
			imageSource = require('../../assets/lottie-files/scattered-clouds-n.json');
			return imageSource;
		}
		case '04d': {
			imageSource = require('../../assets/lottie-files/broken-clouds-d.json');
			return imageSource;
		}
		case '04n': {
			imageSource = require('../../assets/lottie-files/broken-clouds-n.json');
			return imageSource;
		}
	}
	return imageSource;
};

export default weatherIcon;
