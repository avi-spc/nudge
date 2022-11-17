import PropTypes from 'prop-types';

import { baseUrl } from '../utils/env';

const Avatar = (props) => {
	const { imageId, classType } = props;

	return imageId ? (
		<img src={`${baseUrl}/api/profile/image/${imageId}`} alt="" className={classType} />
	) : (
		<div className={classType} />
	);
};

Avatar.propTypes = {
	imageId: PropTypes.string.isRequired,
	classType: PropTypes.string.isRequired
};

export default Avatar;
