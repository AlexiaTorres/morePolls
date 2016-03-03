import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import polls from './poll';
import pollDetails from './pollDetails';
import pollSearch from './pollSearch';
import messages from './notify';
import actionsPending from './confirm';
import menu from './menu';
import firebase from './firebase';
import auth from './auth';
import settings from './settings';
import loginAlert from './loginAlert';
import registerAlert from './registerAlert';
import watchedPeople from './watchedPeople';
import followers from './followers';
import following from './following';
import watchedUserFollowers from './watchedUserFollowers';
import watchedUserFollowing from './watchedUserFollowing';
import user from './user';

const pollApp = combineReducers({
  following,
  followers,
  watchedUserFollowing,
  watchedUserFollowers,
  watchedPeople,
  auth,
  settings,
  polls,
  pollDetails,
  pollSearch,
  router,
  messages,
  actionsPending,
  menu,
  firebase,
  loginAlert,
  registerAlert,
  user
});

export default pollApp;
