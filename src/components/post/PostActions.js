import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../reduxStore/actions/alert';
import { likePost, unlikePost, savePost, unsavePost } from '../../reduxStore/actions/post';

const PostActions = (props) => {
	const { setAlert, likePost, unlikePost, savePost, unsavePost, post, user, type } = props;

	useEffect(() => {
		setAlready({
			liked: post.likes.find((like) => like.user === user._id || like.user._id === user._id)
				? true
				: false,
			saved: user.savedPosts.find((savedPost) => savedPost.post === post._id) ? true : false
		});
	}, []);

	const updateLiked = () => {
		if (already.liked) {
			unlikePost(post._id);
		} else {
			likePost(post._id);
		}

		setAlready({ ...already, liked: !already.liked });
	};

	const updateSaved = () => {
		if (already.saved) {
			unsavePost(post._id);
		} else {
			savePost(post._id);
		}

		setAlready({ ...already, saved: !already.saved });
	};

	const sharePostLink = async (postLink) => {
		await navigator.clipboard.writeText(postLink);
		setAlert('post link copied', 'success');
	};

	const [already, setAlready] = useState({
		liked: false,
		saved: false
	});

	return (
		<div className={`${type}__post-actions`}>
			<span
				className={`material-symbols-outlined symbol--lg ${already.liked ? 'filled' : ''}`}
				onClick={updateLiked}
			>
				favorite
			</span>
			<span
				className="material-symbols-outlined symbol--lg"
				onClick={() => sharePostLink(`localhost:3000/post/${post._id}`)}
			>
				share
			</span>
			<span
				className={`material-symbols-outlined symbol--lg ${
					already.saved ? 'filled' : ''
				} btn-save`}
				onClick={updateSaved}
			>
				bookmark
			</span>
		</div>
	);
};

PostActions.propTypes = {
	setAlert: PropTypes.func.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	savePost: PropTypes.func.isRequired,
	unsavePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	user: state.auth.user
});

export default connect(mapStateToProps, { setAlert, likePost, unlikePost, savePost, unsavePost })(
	PostActions
);
