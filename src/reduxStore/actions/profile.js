import axios from '../../utils/axiosInstance';

import { setAlert } from './alert';
import { setLoading } from './auth';
import { getNotifications } from './notification';

import {
	CREATE_PROFILE,
	GET_PERSONAL_PROFILE,
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_ERROR,
	UPDATE_PROFILE
} from './types';

export const getPersonalProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({ type: GET_PERSONAL_PROFILE, payload: res.data });
		dispatch(getNotifications());
		dispatch(setLoading(false));
	} catch (err) {
		console.log(err.response.data.errors);
		dispatch(setLoading(false));
	}
};

export const getUserProfile = (userId) => async (dispatch) => {
	try {
		const resProfile = await axios.get(`/api/profile/user/${userId}`);
		const resFollows = await axios.get(`/api/users/follows/${userId}`);

		dispatch({
			type: GET_USER_PROFILE_SUCCESS,
			payload: { profile: resProfile.data.profile, follows: resFollows.data.follows }
		});
		// dispatch(setLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: GET_USER_PROFILE_ERROR });
		// dispatch(setLoading(false));
	}
};

export const createProfile = (profile) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(profile);

	try {
		const res = await axios.post('/api/profile', body, config);

		dispatch({ type: CREATE_PROFILE, payload: res.data });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});
	}
};

export const updateProfile = (profile) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(profile);

	try {
		const res = await axios.put('/api/profile', body, config);

		dispatch({ type: UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});
	}
};

export const uploadProfileImage = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'multipart/formdata',
			'x-bucket-type': 'profile'
		}
	};

	const body = new FormData(formData);

	try {
		const res = await axios.put('/api/profile/image', body, config);

		dispatch({ type: UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});
	}
};

export const removeProfileImage = () => async (dispatch) => {
	try {
		const res = await axios.delete('/api/profile/image');

		dispatch({ type: UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};
