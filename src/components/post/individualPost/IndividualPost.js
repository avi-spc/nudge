import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getIndividualPost } from '../../../reduxStore/actions/post';

import IndividualComment from './IndividualComment';
import PostActions from '../PostActions';
import PostCaption from './PostCaption';
import PostDetails from './PostDetails';
import PostLikedUsers from './PostLikedUsers';
import PostOptions from '../PostOptions';

const IndividualPost = (props) => {
	const {
		getIndividualPost,
		post: { individualPost, postOptions }
	} = props;

	const { post_id } = useParams();

	useEffect(() => {
		getIndividualPost(post_id);
	}, [post_id]);

	const [showPopup, setShowPopup] = useState(false);

	return (
		individualPost && (
			<div className="container-large">
				<div className="padded individual-post">
					<div className="individual-post__image">
						<img
							src={`http://localhost:5000/api/posts/image/${individualPost.imageId}`}
						></img>
					</div>
					<PostCaption post={individualPost} />
					<div className="individual-post__comments-list">
						{individualPost.comments.map((comment) => (
							<IndividualComment
								post={individualPost}
								commentDetails={comment}
								key={comment._id}
							/>
						))}
					</div>
					<PostActions post={individualPost} type="individual-post" />
				</div>
				<PostDetails post={individualPost} setShowPopup={setShowPopup} />
				{showPopup && <PostLikedUsers post={individualPost} setShowPopup={setShowPopup} />}
				{postOptions.isVisible && <PostOptions postIsMine={postOptions.isMine} />}
			</div>
		)
	);
};

IndividualPost.propTypes = {
	getIndividualPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getIndividualPost })(IndividualPost);
