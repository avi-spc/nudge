import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchUsers, clearSearch } from '../../reduxStore/actions/auth';
import { useForm } from '../../hooks/useForm';

import Avatar from '../Avatar';

const NavUserSearch = (props) => {
	const {
		searchUsers,
		clearSearch,
		auth: { searchedUsers }
	} = props;

	const submitSearch = (e) => {
		e.preventDefault();
		searchUsers(formData.user);
	};

	const submitClear = () => {
		clearSearch();
		resetForm();
	};

	const { formData, onChange, resetForm } = useForm({ user: '' });

	return (
		<div className="navbar__user-search">
			<form className="" onSubmit={submitSearch}>
				<input
					type="text"
					name="user"
					value={formData.user}
					onChange={onChange}
					className="text-field text-field--sm text-normal-R"
					placeholder="search people"
				/>
				<span
					className="material-symbols-outlined symbol--sm btn-clear-search"
					onClick={submitClear}
				>
					close
				</span>
				<ul className="users-list">
					{searchedUsers.length > 0 ? (
						searchedUsers.map((user) => (
							<li key={user.user}>
								<Link to={`/profile/${user.user}`}>
									<Avatar imageId={user.imageId} classType="avatar" />
									<div className="text-medium-SB">{user.username}</div>
									<div className="name text-normal-R">{user.name}</div>
								</Link>
							</li>
						))
					) : (
						<div className="text-normal-R">No recent searches</div>
					)}
				</ul>
			</form>
		</div>
	);
};

NavUserSearch.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearSearch: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { searchUsers, clearSearch })(NavUserSearch);
