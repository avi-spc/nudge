import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllPosts, discardPostImage } from '../../../reduxStore/actions/post';

import FeedIndividualPost from './FeedIndividualPost';
import PostOptions from '../PostOptions';
import { useDocumentTitle } from '../../../hooks/useDcoumentTitle';

const PostFeed = (props) => {
	const {
		getAllPosts,
		discardPostImage,
		post: { posts, newPostImageId, postOptions }
	} = props;

	useEffect(() => {
		getAllPosts();

		if (newPostImageId) {
			discardPostImage(newPostImageId);
		}
	}, []);

	useDocumentTitle('');

	return (
		posts && (
			<div className="container-normal feed">
				{posts.map((post) => {
					return <FeedIndividualPost post={post} key={post._id} />;
				})}
				{postOptions.isVisible && <PostOptions postIsMine={postOptions.isMine} />}
			</div>
		)
	);
};

PostFeed.propTypes = {
	getAllPosts: PropTypes.func.isRequired,
	discardPostImage: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getAllPosts, discardPostImage })(PostFeed);
