import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../reduxStore/actions/auth';

import NavNotifications from './NavNotifications';
import Avatar from '../Avatar';

const NavActions = (props) => {
	const {
		logout,
		profile: { personalProfile }
	} = props;

	const location = useLocation();
	const notificationRef = useRef();

	useEffect(() => {
		setShowDropdown(false);
		setShowNotificationDropdown(false);
		notificationRef.current.checked = false;
	}, [location]);

	const [showDropdown, setShowDropdown] = useState(false);
	const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

	return (
		<div className="navbar__actions">
			<NavLink to="/feed">
				<span className="material-symbols-outlined symbol--lg">cottage</span>
			</NavLink>
			<NavLink to="/create">
				<span className="material-symbols-outlined symbol--lg">loupe</span>
			</NavLink>
			<div className="notification-actions">
				<input type="checkbox" id="notification-dropdown" ref={notificationRef} />
				<label htmlFor="notification-dropdown">
					<span
						className={`material-symbols-outlined symbol--lg ${
							showNotificationDropdown ? 'filled' : ''
						}`}
						onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
					>
						favorite
					</span>
				</label>
				{showNotificationDropdown && <NavNotifications />}
			</div>
			<div className="profile-actions" onClick={() => setShowDropdown(!showDropdown)}>
				<Avatar imageId={personalProfile.imageId} classType="avatar" />
				{showDropdown && (
					<ul className="text-medium-R">
						<li>
							<Link to={`/profile/${personalProfile.user}`}>Profile</Link>
						</li>
						<li onClick={logout}>Logout</li>
					</ul>
				)}
			</div>
		</div>
	);
};

NavActions.propTypes = {
	logout: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { logout })(NavActions);
