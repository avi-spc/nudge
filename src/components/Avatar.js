import PropTypes from 'prop-types';

const Avatar = (props) => {
	const { imageId, classType } = props;

	return imageId ? (
		<img src={`http://localhost:5000/api/profile/image/${imageId}`} alt="" className={classType} />
	) : (
		<div className={classType} />
	);
};

Avatar.propTypes = {
	imageId: PropTypes.string.isRequired,
	classType: PropTypes.string.isRequired
};

export default Avatar;
