import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { useForm } from '../../hooks/useForm';

const UserRegistration = (props) => {
	const { setAlert, register } = props;

	const submitRegister = (e) => {
		e.preventDefault();

		if (password !== confirm_password) {
			return setAlert("passwords don't match", 'error');
		}

		const user = { email, password };

		register(user);
	};

	const { formData, onChange } = useForm({ email: '', password: '', confirm_password: '' });
	const { email, password, confirm_password } = formData;

	return (
		<Fragment>
			<form className="sign-up__form" onSubmit={submitRegister}>
				<input
					type="email"
					name="email"
					value={email}
					onChange={onChange}
					placeholder="email"
					className="text-field text-field--lg text-normal-R"
				/>
				<input
					type="password"
					name="password"
					value={password}
					onChange={onChange}
					placeholder="password"
					className="text-field text-field--lg text-normal-R"
				/>
				<input
					type="password"
					name="confirm_password"
					value={confirm_password}
					onChange={onChange}
					placeholder="confirm password"
					className="text-field text-field--lg text-normal-R"
				/>
				<input type="submit" value="Sign Up" className="btn btn--rect-lg text-medium-SB" />
			</form>
		</Fragment>
	);
};

UserRegistration.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

export default UserRegistration;
