import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { timestampInWords } from '../../utils/timestampFormatter';
import { notificationMessage } from '../../utils/notificationMessage';
import { updateNotification } from '../../reduxStore/actions/notification';

import Avatar from '../Avatar';

const NavNotifications = (props) => {
	const { updateNotification, notifications } = props;

	return (
		<ul className="navbar__notifications padded">
			<div className="indicator"> </div>
			{notifications.map((notification) => {
				return (
					<li
						className="individual-notification"
						key={notification.id}
						onClick={() => updateNotification(notification.id)}
					>
						<Link
							to={
								notification.nType === 'follow'
									? `/profile/${notification.user._id}`
									: `/post/${notification.post}`
							}
							className={!notification.read ? 'unread' : ''}
						>
							<Avatar imageId={notification.user.profileImageId} classType="avatar" />
							<div className="username-p-message">
								<div className="username text-medium-SB">{notification.user.username}</div>
								<div className="message text-normal-R">
									{notificationMessage(notification.nType)}
								</div>
							</div>
							<div className="elapsed text-small-R">
								{timestampInWords(notification.createdAt, 'short')}
							</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

NavNotifications.propTypes = {
	updateNotification: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	notifications: state.notification
});

export default connect(mapStateToProps, { updateNotification })(NavNotifications);
