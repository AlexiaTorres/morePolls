import { SET_WATCHED_PEOPLE } from '../actions/people';

const setWatchedPeople = users => [].concat(users);

export default function (state = [], action) {
  switch (action.type) {
    case SET_WATCHED_PEOPLE:
      return setWatchedPeople(action.users);
    default:
      return state;
  }
}
