import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addComment } from '../../reduxStore/actions/post';
import { useForm } from '../../hooks/useForm';
import { isEmpty } from '../../utils/validator';

const CommentInput = (props) => {
	const { addComment, postId } = props;

	const submitComment = (e) => {
		e.preventDefault();

		addComment(newComment.comment.trim(), postId);
		resetForm();
	};

	const { formData: newComment, onChange, resetForm } = useForm({ comment: '' });

	return (
		<div className="comment-input">
			<form className="comment-input__form">
				<input
					type="text"
					name="comment"
					value={newComment.comment}
					onChange={onChange}
					placeholder="Add a comment ..."
					className="text-field text-field--lg text-medium-R"
				/>
				<div className="comment-input__btn-post-container">
					<button
						className="btn text-small-R comment-input__btn-post"
						onClick={submitComment}
						disabled={isEmpty(newComment)}
					>
						POST
					</button>
				</div>
			</form>
		</div>
	);
};

CommentInput.propTypes = {
	addComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired
};

export default connect(null, { addComment })(CommentInput);
