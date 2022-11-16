import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Avatar from '../../Avatar';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';

const PostLikedUsers = (props) => {
	const { setShowPopup, post } = props;

	return (
		<div className="popup">
			<div className="padded individual-post__liked-users">
				<TitleHeaderBar title="Likes" action={() => setShowPopup(false)} />
				<ul className="users-list">
					{post.likes.map((like) => (
						<li key={like.user._id}>
							<Link to={`/profile/${like.user._id}`}>
								<Avatar imageId={like.user.profileImageId} classType="avatar" />
								<div className="text-medium-SB">{like.user.username}</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

PostLikedUsers.propTypes = {
	setShowPopup: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

export default PostLikedUsers;
