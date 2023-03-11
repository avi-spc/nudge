import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { uploadPostImage } from '../../../reduxStore/actions/post';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';
import { useDocumentTitle } from '../../../hooks/useDcoumentTitle';

const ImageUpload = (props) => {
	const { uploadPostImage, newPostImageId } = props;

	const navigate = useNavigate();
	const postImageForm = useRef();

	useEffect(() => {
		if (newPostImageId) {
			navigate('/create/publish');
		}
	}, [newPostImageId]);

	useDocumentTitle('New post');

	return (
		<div className="container-medium padded image-upload">
			<TitleHeaderBar title="create new post" action={() => navigate('/feed')} />
			<div className="image-upload__buttons">
				<form ref={postImageForm}>
					<label htmlFor="file" className="btn btn--rect-sm text-medium-R">
						Select from device
					</label>
					<input type="file" id="file" name="file" className="hidden" />
				</form>
				<button
					className="btn btn--cir text-medium-R image-upload__btn-next"
					onClick={() => uploadPostImage(postImageForm.current)}
				>
					<span className="material-symbols-outlined symbol--md">arrow_forward</span>
				</button>
			</div>
		</div>
	);
};

ImageUpload.propTypes = {
	uploadPostImage: PropTypes.func.isRequired,
	newPostImageId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	newPostImageId: state.post.newPostImageId
});

export default connect(mapStateToProps, { uploadPostImage })(ImageUpload);
