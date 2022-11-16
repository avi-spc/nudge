import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { publishPost, discardPostImage } from '../../../reduxStore/actions/post';
import { useForm } from '../../../hooks/useForm';
import { isEmpty } from '../../../utils/validator';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';
import Avatar from '../../Avatar';

const PublishPost = (props) => {
	const {
		publishPost,
		discardPostImage,
		profile: { personalProfile },
		newPostImageId
	} = props;

	const navigate = useNavigate();

	useEffect(() => {
		if (!newPostImageId) {
			navigate('/feed');
		}
	}, [newPostImageId]);

	const { formData: newPost, onChange } = useForm({ caption: '', imageId: newPostImageId });

	return (
		<div className="container-medium padded create-post">
			<TitleHeaderBar
				title="create new post"
				action={() => discardPostImage(newPostImageId)}
			/>
			<div className="create-post__image-p-caption">
				<div className="create-post__image">
					<img src={`http://localhost:5000/api/posts/image/${newPostImageId}`}></img>
				</div>
				<div className="create-post__user-p-caption">
					<div className="user-details">
						<Avatar imageId={personalProfile.imageId} classType="avatar" />
						<div className="username text-medium-SB">{personalProfile.username}</div>
					</div>
					<textarea
						className="text-medium-R create-post__caption-text"
						name="caption"
						value={newPost.caption}
						onChange={onChange}
						cols="25"
						rows="10"
						placeholder="write a caption ..."
					></textarea>
					<button
						className="btn btn--rect-sm text-medium-R create-post__btn-publish"
						onClick={() => publishPost(newPost)}
						disabled={isEmpty(newPost)}
					>
						Publish
					</button>
				</div>
			</div>
		</div>
	);
};

PublishPost.propTypes = {
	publishPost: PropTypes.func.isRequired,
	discardPostImage: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	newPostImageId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	newPostImageId: state.post.newPostImageId
});

export default connect(mapStateToProps, { publishPost, discardPostImage })(PublishPost);
