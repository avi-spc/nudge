import PropTypes from 'prop-types';

import { timestampInWords } from '../../../utils/timestampFormatter';

import UserHeaderBar from '../../headerBars/UserHeaderBar';

const PostCaption = (props) => {
	const { post } = props;

	return (
		<div className="individual-post__header-p-caption">
			<UserHeaderBar postId={post._id} user={post.user} />
			<div className="individual-post__caption-p-elapsed">
				<p className="text-medium-R">{post.caption}</p>
				<span className="elapsed absolute bordered text-small-R">
					{timestampInWords(post.createdAt, 'short')}
				</span>
			</div>
		</div>
	);
};

PostCaption.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostCaption;
