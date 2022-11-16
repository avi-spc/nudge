import {
	CREATE_PROFILE,
	GET_PERSONAL_PROFILE,
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE
} from '../actions/types';

const initialState = {
	personalProfile: null,
	userProfile: null,
	userProfileFollows: null
};

const profileReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case CREATE_PROFILE:
		case GET_PERSONAL_PROFILE:
		case UPDATE_PROFILE:
			return { ...state, personalProfile: payload.profile };
		case GET_USER_PROFILE_SUCCESS:
			return { ...state, userProfile: payload.profile, userProfileFollows: payload.follows };
		case GET_USER_PROFILE_ERROR:
			return { ...state, userProfile: null };
		case CLEAR_PROFILE:
			return { ...state, personalProfile: null, userProfile: null };
		default:
			return state;
	}
};

export default profileReducer;
