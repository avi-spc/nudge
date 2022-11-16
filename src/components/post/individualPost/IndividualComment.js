import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeComment } from '../../../reduxStore/actions/post';
import { timestampInWords } from '../../../utils/timestampFormatter';

import Avatar from '../../Avatar';

const IndividualComment = (props) => {
	const { removeComment, personalProfile, post, commentDetails } = props;

	return (
		<div className="individual-post__individual-comment">
			<Avatar imageId={commentDetails.user.profileImageId} classType="avatar" />
			<Link to={`/profile/${commentDetails.user._id}`}>
				<div className="text-medium-SB">{commentDetails.user.username}</div>
			</Link>
			<span className="elapsed bordered text-small-R">
				{timestampInWords(commentDetails.createdAt, 'short')}
			</span>
			<p className="comment-text text-medium-R">{commentDetails.comment}</p>
			{(post.user._id === personalProfile.user ||
				commentDetails.user._id === personalProfile.user) && (
				<span
					className="material-symbols-outlined symbol--sm bordered btn-remove"
					onClick={() => removeComment(post._id, commentDetails._id)}
				>
					close
				</span>
			)}
			{/* <span className="material-symbols-outlined symbol--sm btn-like">favorite</span>
			<div className="btn-reply text-small-R">Reply</div> */}
		</div>
	);
};

IndividualComment.propTypes = {
	removeComment: PropTypes.func.isRequired,
	personalProfile: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	commentDetails: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	personalProfile: state.profile.personalProfile
});

export default connect(mapStateToProps, { removeComment })(IndividualComment);
