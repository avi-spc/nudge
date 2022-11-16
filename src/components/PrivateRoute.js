import { Fragment, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from './navbar/Navbar';

const PrivateRoute = (props) => {
	const {
		auth: { isAuthenticated, loading }
	} = props;

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated && !loading) {
			navigate('/');
		}
	}, [isAuthenticated, loading]);

	return (
		isAuthenticated &&
		!loading && (
			<Fragment>
				<Navbar />
				<Outlet />
			</Fragment>
		)
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
