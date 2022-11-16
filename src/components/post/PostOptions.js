import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { followUser, unfollowUser } from '../../reduxStore/actions/auth';
import { deletePost, updatePostOptions } from '../../reduxStore/actions/post';

const PostOptions = (props) => {
	const {
		deletePost,
		updatePostOptions,
		followUser,
		unfollowUser,
		postOptions,
		personalProfile,
		user
	} = props;

	const followUnfollowButton = user.follows.following.find(
		(follow) => follow.user === postOptions.userId
	) ? (
		<button
			className="btn btn--rect-sm expand text-medium-R"
			onClick={() => unfollowUser(postOptions.userId)}
		>
			Unfollow
		</button>
	) : (
		<button
			className="btn btn--rect-sm expand text-medium-R"
			onClick={() => followUser(postOptions.userId)}
		>
			Follow
		</button>
	);

	return (
		<div className="popup">
			<div className="post-options">
				<ul className="text-medium-R">
					<li>
						<button
							className="btn btn--cir"
							onClick={() => updatePostOptions({ isVisible: false })}
						>
							<span className="material-symbols-outlined">close</span>
						</button>
					</li>
					{postOptions.userId === personalProfile.user ? (
						<li>
							<button
								className="btn--danger text-medium-R"
								onClick={() => deletePost(postOptions.postId)}
							>
								Delete Post
							</button>
						</li>
					) : (
						<li>{followUnfollowButton}</li>
					)}
				</ul>
			</div>
		</div>
	);
};

PostOptions.propTypes = {
	deletePost: PropTypes.func.isRequired,
	updatePostOptions: PropTypes.func.isRequired,
	postOptions: PropTypes.object.isRequired,
	personalProfile: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	postOptions: state.post.postOptions,
	personalProfile: state.profile.personalProfile,
	user: state.auth.user
});

export default connect(mapStateToProps, {
	deletePost,
	updatePostOptions,
	followUser,
	unfollowUser
})(PostOptions);
