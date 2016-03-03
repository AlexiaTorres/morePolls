import { SET_WATCHED_PEOPLE, CLEAR_WATCHED_PEOPLE, SET_FOLLOWER_USERS, SET_FOLLOWING_USERS, CLEAR_FOLLOWERS, CLEAR_FOLLOWING } from './action-types';
import { MIN_SEARCH_STRING_LENGTH } from './constants';

export function searchPeople(startAt) {
 return (dispatch, getState) => {
  if (startAt.length < MIN_SEARCH_STRING_LENGTH) {
    return dispatch({
      type: CLEAR_WATCHED_PEOPLE
    });
  }
   const { firebase } = getState();
   const ref = firebase.child('users');
   ref.orderByChild('name').startAt(startAt).endAt(`${startAt}\uf8ff`).once('value', snapshot => dispatch({
     type: SET_WATCHED_PEOPLE,
     people: Object.keys(snapshot.val() || []).map( id => ({id, name: snapshot.val()[id].name, state: snapshot.val()[id].state}))
   }));
  };
}

export function clearWatchedPeople() {
  return dispatch => {
    return dispatch({
      type: CLEAR_WATCHED_PEOPLE
    });
  };
}

export const setFollowerUsers = users => ({type: SET_FOLLOWER_USERS, users});
export const setFollowingUsers = users => ({type: SET_FOLLOWING_USERS, users});
export const clearFollowers = () => ({type: CLEAR_FOLLOWERS});
export const clearFollowing = () => ({type: CLEAR_FOLLOWING});
export const setWatchedPeople = users => ({type: SET_WATCHED_PEOPLE, users});
