export const timestampInWords = (timestamp, type) => {
	const ts_milliseconds = Date.parse(timestamp);
	const elapsed_seconds = (Date.now() - ts_milliseconds) / 1000;

	let ts_string = '';

	if (elapsed_seconds < 60) {
		ts_string = `${Math.floor(elapsed_seconds)} sec ago`;
	} else if (elapsed_seconds < 60 * 60) {
		ts_string = `${Math.floor(elapsed_seconds / 60)} min ago`;
	} else if (elapsed_seconds < 24 * 60 * 60) {
		ts_string = `${Math.floor(elapsed_seconds / 60 / 60)} hours ago`;
	} else if (elapsed_seconds < 7 * 24 * 60 * 60) {
		ts_string = `${Math.floor(elapsed_seconds / 24 / 60 / 60)} days ago`;
	} else {
		ts_string = localeDate(timestamp);
	}

	if (type === 'short') {
		return `${ts_string.split(' ')[0]} ${ts_string.split(' ')[1].charAt(0)}`;
	}

	return ts_string;
};

const localeDate = (timestamp) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };

	return new Date(timestamp).toLocaleDateString(undefined, options);
};
