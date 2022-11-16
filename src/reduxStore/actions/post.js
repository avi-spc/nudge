import axios from '../../utils/axiosInstance';

import { setAlert } from './alert';
import { setLoading } from './auth';

import {
	GET_ALL_POSTS,
	GET_INDIVIDUAL_POST_SUCCESS,
	GET_INDIVIDUAL_POST_ERROR,
	POST_IMAGE_UPLOAD_SUCCESS,
	POST_UPLOAD_SUCCESS,
	POST_UPLOAD_ERROR,
	UPDATE_COMMENTS,
	UPDATE_LIKES,
	UPDATE_SAVED_POSTS,
	UPDATE_POST_OPTIONS,
	UPDATE_ALL_POSTS
} from './types';

export const getAllPosts = () => async (dispatch) => {
	// dispatch(setLoading(true));

	try {
		const res = await axios.get('/api/posts');

		dispatch({ type: GET_ALL_POSTS, payload: res.data });
		// dispatch(setLoading(false));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const getIndividualPost = (postId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${postId}`);

		dispatch({ type: GET_INDIVIDUAL_POST_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: GET_INDIVIDUAL_POST_ERROR });
	}
};

export const likePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/posts/like/${postId}`);

		dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data.likes } });
		dispatch(getIndividualPost(postId));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const unlikePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/unlike/${postId}`);

		dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data.likes } });
		dispatch(getIndividualPost(postId));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const savePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/posts/save/${postId}`);

		dispatch({ type: UPDATE_SAVED_POSTS, payload: res.data });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const unsavePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/unsave/${postId}`);

		dispatch({ type: UPDATE_SAVED_POSTS, payload: res.data });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const addComment = (comment, postId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ comment });

	try {
		const res = await axios.post(`/api/posts/comment/${postId}`, body, config);

		dispatch({
			type: UPDATE_COMMENTS,
			payload: { postId, comments: res.data.comments }
		});
		dispatch(getIndividualPost(postId));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const removeComment = (postId, commentId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

		dispatch({ type: UPDATE_COMMENTS, payload: { postId, comments: res.data.comments } });
		dispatch(getIndividualPost(postId));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const uploadPostImage = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'multipart/formdata',
			'x-bucket-type': 'post'
		}
	};

	const body = new FormData(formData);

	try {
		const res = await axios.post('/api/posts/image', body, config);

		dispatch({ type: POST_IMAGE_UPLOAD_SUCCESS, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});
	}
};

export const discardPostImage = (imageId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/image/${imageId}`);

		dispatch({ type: POST_UPLOAD_ERROR });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const publishPost = (newPost) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(newPost);

	try {
		const res = await axios.post('/api/posts', body, config);

		dispatch({ type: POST_UPLOAD_SUCCESS });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});
	}
};

export const deletePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/${postId}`);

		dispatch({ type: UPDATE_ALL_POSTS, payload: postId });
		dispatch(setAlert(res.data.msg, res.data.type));
	} catch (err) {
		console.log(err.response.data.errors);
	}
};

export const updatePostOptions = (postOptions) => (dispatch) => {
	dispatch({ type: UPDATE_POST_OPTIONS, payload: postOptions });
};
