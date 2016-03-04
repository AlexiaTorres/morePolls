import { SET_PEOPLE_SEARCH, CLEAR_PEOPLE_SEARCH } from './action-types';
import { MIN_SEARCH_STRING_LENGTH } from './constants';

export function peopleSearch(startAt) {
 return (dispatch, getState) => {
  if (startAt.length < MIN_SEARCH_STRING_LENGTH) {
    return dispatch({
      type: CLEAR_PEOPLE_SEARCH
    });
  }
   const { firebase } = getState();
   const ref = firebase.child('users');
   ref.orderByChild('name').startAt(startAt).endAt(`${startAt}\uf8ff`).once('value', snapshot => dispatch({
     type: SET_PEOPLE_SEARCH,
     users: Object.keys(snapshot.val() || []).map( id => ({id, name:snapshot.val()[id].name}))
   }));
  };
}

export function clearPeopleSearch() {
  return dispatch => {
    return dispatch({
      type: CLEAR_PEOPLE_SEARCH
    });
  };
}
