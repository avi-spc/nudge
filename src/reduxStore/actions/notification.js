import axios from '../../utils/axiosInstance';

import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from './types';

export const getNotifications = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/notifications');

		dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const updateNotification = (notificationId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/notifications/${notificationId}`);

		dispatch({ type: UPDATE_NOTIFICATIONS, payload: notificationId });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};
