export const isEmpty = (value) => {
	return (
		Object.keys(value).filter((key) => {
			return value[key].trim() === '';
		}).length > 0
	);
};
