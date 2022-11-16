import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Loader = (props) => {
	const { loading } = props;

	return (
		<div className={`loader ${loading ? 'visible' : ''}`}>
			<div className="text-large-M">Loading...</div>
		</div>
	);
};

Loader.propTypes = {
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	loading: state.auth.loading
});

export default connect(mapStateToProps)(Loader);
