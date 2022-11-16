import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../reduxStore/actions/alert';
import { register, logout } from '../../reduxStore/actions/auth';
import { createProfile } from '../../reduxStore/actions/profile';

import UserRegistration from './UserRegistration';
import UserDetails from './UserDetails';

const SignUp = (props) => {
	const {
		setAlert,
		register,
		logout,
		createProfile,
		auth: { isAuthenticated, loading },
		profile: { personalProfile }
	} = props;

	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && isAuthenticated && personalProfile) {
			navigate('/feed');
		}
	}, [isAuthenticated, personalProfile, loading]);

	return (
		<div className="container-small sign-up">
			<div className="sign-up__logo-p-form">
				<div className="sign-up__logo">nudge</div>
				{!isAuthenticated && (
					<UserRegistration
						setAlert={setAlert}
						isAuthenticated={isAuthenticated}
						register={register}
					/>
				)}
				{!loading && isAuthenticated && !personalProfile && (
					<UserDetails setAlert={setAlert} createProfile={createProfile} />
				)}
			</div>
			{!isAuthenticated && (
				<Link to="/">
					<button className="btn-alternate text-medium-R">
						Already have an account? <span className="text-medium-SB">Log In</span>
					</button>
				</Link>
			)}
			{!loading && isAuthenticated && !personalProfile && (
				<button className="btn-alternate text-medium-R" onClick={logout}>
					Want to switch accounts? <span className="text-medium-SB">Logout</span>
				</button>
			)}
		</div>
	);
};

SignUp.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	createProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { setAlert, register, logout, createProfile })(SignUp);
