import PropTypes from 'prop-types';

import { baseUrl } from '../../../utils/env';

import UserHeaderBar from '../../headerBars/UserHeaderBar';

const PostVisual = (props) => {
	const { post } = props;

	return (
		<div className="padded feed-individual-post__post-visual">
			<UserHeaderBar postId={post._id} user={post.user} />
			<img src={`${baseUrl}/api/posts/image/${post.imageId}`} className="image"></img>
		</div>
	);
};

PostVisual.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostVisual;
