import PropTypes from 'prop-types';

import UserHeaderBar from '../../headerBars/UserHeaderBar';

const PostVisual = (props) => {
	const { post } = props;

	return (
		<div className="padded feed-individual-post__post-visual">
			<UserHeaderBar postId={post._id} user={post.user} />
			<img
				src={`http://localhost:5000/api/posts/image/${post.imageId}`}
				className="image"
			></img>
		</div>
	);
};

PostVisual.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostVisual;
