import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from '../actions/types';

const initialState = [];

const notificationReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_NOTIFICATIONS:
			return payload.notifications;
		case UPDATE_NOTIFICATIONS:
			return state.map((notification) => {
				return notification.id === payload ? { ...notification, read: true } : notification;
			});
		default:
			return state;
	}
};

export default notificationReducer;
