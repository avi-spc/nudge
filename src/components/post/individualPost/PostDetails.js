import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { timestampInWords } from '../../../utils/timestampFormatter';

import Avatar from '../../Avatar';
import CommentInput from '../CommentInput';

const PostDetails = (props) => {
	const { setShowPopup, post } = props;

	return (
		<div className="individual-post__post-details">
			<div className="avatars-p-meta">
				<div className="liked-avatars">
					{post.likes.slice(0, 3).map((like) => (
						<Avatar imageId={like.user.profileImageId} classType="avatar" key={like.user._id} />
					))}
				</div>
				<div className="meta">
					<div className="likes-info text-medium-R" onClick={() => setShowPopup(true)}>
						{post.likes.length > 0 && (
							<Fragment>
								Liked by <span className="text-medium-SB">{post.likes[0].user.username} </span>
							</Fragment>
						)}
						{post.likes.length > 1 && (
							<Fragment>
								and <span className="text-medium-SB">{post.likes.length - 1} others</span>
							</Fragment>
						)}
					</div>
					<div className="post-date text-small-R">{timestampInWords(post.createdAt)}</div>
				</div>
			</div>
			<CommentInput postId={post._id} />
		</div>
	);
};

PostDetails.propTypes = {
	setShowPopup: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

export default PostDetails;
