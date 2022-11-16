import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserPostGallery = (props) => {
	const { posts } = props;

	return (
		<div className="posts-gallery">
			{posts.length > 0 &&
				posts.map((post) => (
					<Link to={`/post/${post.post}`} key={post.post}>
						<img
							src={`http://localhost:5000/api/posts/image/${post.imageId}`}
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
