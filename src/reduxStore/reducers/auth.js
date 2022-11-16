import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	AUTH_SUCCESS,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT,
	GET_SAVED_POSTS,
	UPDATE_SAVED_POSTS,
	UPDATE_FOLLOWS,
	USER_SEARCH,
	CLEAR_SEARCH,
	SET_LOADING
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	savedPosts: [],
	searchedUsers: [],
	loading: true
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case AUTH_SUCCESS:
			return { ...state, isAuthenticated: true, user: payload.user };
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, token: payload.token, isAuthenticated: true };
		case REGISTER_ERROR:
		case AUTH_ERROR:
		case LOGIN_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				savedPosts: [],
				searchedUsers: [],
				loading: false
			};
		case GET_SAVED_POSTS:
			return { ...state, savedPosts: payload.savedPosts };
		case UPDATE_FOLLOWS:
			return { ...state, user: { ...state.user, follows: payload.follows } };
		case UPDATE_SAVED_POSTS:
			return { ...state, user: { ...state.user, savedPosts: payload.savedPosts } };
		case USER_SEARCH:
			return { ...state, searchedUsers: payload.users };
		case CLEAR_SEARCH:
			return { ...state, searchedUsers: [] };
		case SET_LOADING:
			return { ...state, loading: payload };
		default:
			return state;
	}
};

export default authReducer;
