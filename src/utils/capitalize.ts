export default (str: string): string => {
	if ('string' !== typeof str) return '';
	return str
		.split(' ')
		.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
		.join(' ');
};
