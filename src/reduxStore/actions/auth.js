import axios from '../../utils/axiosInstance';
import NProgress from 'nprogress';

import { setAuthToken } from '../../utils/setAuthToken';
import { setAlert } from './alert';
import { getPersonalProfile, getUserProfile } from './profile';

import {
	AUTH_SUCCESS,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT,
	CLEAR_PROFILE,
	GET_SAVED_POSTS,
	UPDATE_FOLLOWS,
	USER_SEARCH,
	CLEAR_SEARCH,
	SET_LOADING
} from './types';

export const retrieveUser = () => async (dispatch) => {
	dispatch(setLoading(true));

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({ type: AUTH_SUCCESS, payload: res.data });
		dispatch(getPersonalProfile());
	} catch (err) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const register = (user) => async (dispatch) => {
	NProgress.start();

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(user);

	try {
		const res = await axios.post('/api/users', body, config);

		dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		dispatch(retrieveUser());

		NProgress.done();
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: REGISTER_ERROR });

		NProgress.done();
	}
};

export const login = (user) => async (dispatch) => {
	NProgress.start();

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(user);

	try {
		const res = await axios.post('/api/auth', body, config);

		dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		dispatch(retrieveUser());
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: LOGIN_ERROR });

		NProgress.done();
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};

export const getSavedPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/users/save/me');

		dispatch({ type: GET_SAVED_POSTS, payload: res.data });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const followUser = (userId) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/users/follow/${userId}`);

		dispatch({ type: UPDATE_FOLLOWS, payload: res.data });
		dispatch(getUserProfile(userId));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const unfollowUser = (userId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/users/unfollow/${userId}`);

		dispatch({ type: UPDATE_FOLLOWS, payload: res.data });
		dispatch(getUserProfile(userId));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const searchUsers = (user) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/users/${user}`);

		dispatch({ type: USER_SEARCH, payload: res.data });
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const clearSearch = () => (dispatch) => {
	dispatch({ type: CLEAR_SEARCH });
};

export const setLoading = (isLoading) => (dispatch) => {
	dispatch({ type: SET_LOADING, payload: isLoading });
};
