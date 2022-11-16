import { Link, useOutletContext, useLocation, useNavigate } from 'react-router-dom';

import TitleHeaderBar from '../../headerBars/TitleHeaderBar';
import Avatar from '../../Avatar';

const Follows = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { user, userProfileFollows } = useOutletContext();

	const followsType = location.pathname.split('/')[3];
	const follows =
		location.pathname.split('/')[3] === 'followers'
			? userProfileFollows.followers
			: userProfileFollows.following;

	return (
		<div className="popup">
			<div className="padded user-profile__follows">
				<TitleHeaderBar title={followsType} action={() => navigate(`/profile/${user}`)} />
				<ul className="follows-list">
					{follows.map((follow) => (
						<li key={follow.user._id}>
							<Link to={`/profile/${follow.user._id}`}>
								<Avatar imageId={follow.user.profileImageId} classType="avatar" />
								<div className="text-medium-SB">{follow.user.username}</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Follows;
