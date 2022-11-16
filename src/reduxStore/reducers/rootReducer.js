import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import notification from './notification';
import profile from './profile';
import post from './post';

export default combineReducers({ alert, auth, notification, profile, post });
