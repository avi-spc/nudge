import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updatePostOptions } from '../../reduxStore/actions/post';

import Avatar from '../Avatar';

const UserHeaderBar = (props) => {
	const { updatePostOptions, postId, user } = props;

	return (
		<div className="user-header-bar">
			<Avatar imageId={user.profileImageId} classType="avatar" />
			<Link to={`/profile/${user._id}`}>
				<div className="text-medium-SB">{user.username}</div>
			</Link>
			<span
				className="material-symbols-outlined symbol--md user-header-bar__btn-more"
				onClick={() =>
					updatePostOptions({
						isVisible: true,
						postId,
						userId: user._id
					})
				}
			>
				more_horiz
			</span>
		</div>
	);
};

UserHeaderBar.propTypes = {
	updatePostOptions: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired
};

export default connect(null, { updatePostOptions })(UserHeaderBar);
