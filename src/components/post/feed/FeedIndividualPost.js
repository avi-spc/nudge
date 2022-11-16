import PropTypes from 'prop-types';

import PostActions from '../PostActions';
import PostDetails from './PostDetails';
import PostVisual from './PostVisual';

const FeedIndividualPost = (props) => {
	const { post } = props;

	return (
		<div className="feed-individual-post">
			<PostVisual post={post} />
			<PostActions post={post} type="feed-individual-post" />
			<PostDetails post={post} />
		</div>
	);
};

FeedIndividualPost.propTypes = {
	post: PropTypes.object.isRequired
};

export default FeedIndividualPost;
