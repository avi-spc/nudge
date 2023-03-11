import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../reduxStore/actions/auth';
import { useForm } from '../../hooks/useForm';
import { useDocumentTitle } from '../../hooks/useDcoumentTitle';

const LogIn = (props) => {
	const {
		login,
		auth: { isAuthenticated, loading },
		profile: { personalProfile }
	} = props;

	const navigate = useNavigate();

	useDocumentTitle("");

	useEffect(() => {
		if (!loading && isAuthenticated && personalProfile) {
			navigate('/feed');
		} else if (!loading && isAuthenticated && !personalProfile) {
			navigate('/register');
		}
	}, [isAuthenticated, personalProfile, loading]);

	const submitLogin = (e) => {
		e.preventDefault();

		login(user);
	};

	const { formData: user, onChange, resetForm } = useForm({ email: '', password: '' });

	return (
		<div className="container-small log-in">
			<div className="log-in__logo-p-form">
				<div className="log-in__logo">nudge</div>
				<form className="log-in__form" onSubmit={(e) => submitLogin(e)}>
					<input
						type="email"
						name="email"
						value={user.email}
						onChange={(e) => onChange(e)}
						placeholder="email"
						className="text-field text-field--lg text-normal-R"
					/>
					<input
						type="password"
						name="password"
						value={user.password}
						onChange={(e) => onChange(e)}
						placeholder="password"
						className="text-field text-field--lg text-normal-R"
					/>
					<input
						type="submit"
						value="Log In"
						className="btn btn--rect-lg text-medium-SB"
					/>
				</form>
			</div>
			<Link to="/register">
				<button className="btn-alternate text-medium-R">
					Don't have an account? <span className="text-medium-SB">Sign Up</span>
				</button>
			</Link>
		</div>
	);
};

LogIn.propTypes = {
	login: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { login })(LogIn);
