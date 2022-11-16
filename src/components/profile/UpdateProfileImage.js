import { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { uploadProfileImage, removeProfileImage } from '../../reduxStore/actions/profile';

import TitleHeaderBar from '../headerBars/TitleHeaderBar';

const UpdateProfileImage = (props) => {
	const { setShowPopup, uploadProfileImage, removeProfileImage, profile } = props;

	const profileImageForm = useRef();

	return (
		<div className="popup">
			<div className="padded update-profile__image">
				<TitleHeaderBar title="Change profile photo" action={() => setShowPopup(false)} />
				<ul className="text-medium-R">
					<li>
						<form ref={profileImageForm}>
							<label htmlFor="file">Change profile photo</label>
							<input
								type="file"
								id="file"
								name="file"
								onChange={() => uploadProfileImage(profileImageForm.current)}
								className="hidden"
							/>
						</form>
					</li>
					{profile.imageId && (
						<li>
							<button
								className="btn btn--rect-sm btn--danger text-medium-R"
								onClick={removeProfileImage}
							>
								Remove
							</button>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

UpdateProfileImage.propTypes = {
	setShowPopup: PropTypes.func.isRequired,
	uploadProfileImage: PropTypes.func.isRequired,
	removeProfileImage: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

export default connect(null, { uploadProfileImage, removeProfileImage })(UpdateProfileImage);
