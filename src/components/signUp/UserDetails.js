import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { useForm } from '../../hooks/useForm';

const UserDetails = (props) => {
	const { createProfile } = props;

	const submitProfile = (e) => {
		e.preventDefault();

		createProfile(profile);
	};

	const { formData: profile, onChange } = useForm({ name: '', username: '' });

	return (
		<Fragment>
			<form className="sign-up__form" onSubmit={submitProfile}>
				<div className="sign-up__profile-setup-info text-normal-R">
					Setup profile and get explored
				</div>
				<input
					type="text"
					name="name"
					value={profile.name}
					onChange={onChange}
					placeholder="name"
					className="text-field text-field--lg text-normal-R"
				/>
				<input
					type="text"
					name="username"
					value={profile.username}
					onChange={onChange}
					placeholder="username"
					className="text-field text-field--lg text-normal-R"
				/>
				<input type="submit" value="Confirm" className="btn btn--rect-lg text-medium-SB" />
			</form>
		</Fragment>
	);
};

UserDetails.propTypes = {
	createProfile: PropTypes.func.isRequired
};

export default UserDetails;
