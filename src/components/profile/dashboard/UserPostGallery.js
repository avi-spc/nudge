import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { baseUrl } from '../../../utils/env';

const UserPostGallery = (props) => {
	const { posts } = props;

	return (
		<div className="posts-gallery">
			{posts.length > 0 &&
				posts.map((post) => (
					<Link to={`/post/${post.post}`} key={post.post}>
						<img
							src={`${baseUrl}/api/posts/image/${post.imageId}`}
							className="gallery-post"
						></img>
					</Link>
				))}
		</div>
	);
};

UserPostGallery.propTypes = {
	posts: PropTypes.array.isRequired
};

export default UserPostGallery;
