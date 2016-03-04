import { SET_PEOPLE_SEARCH, RESET_PEOPLE_SEARCH } from '../actions/people';

function setPeople(state, users) {
  return users.slice();
}

export default function peopleSeachReducer(state = [], action) {
  switch (action.type) {
    case SET_PEOPLE_SEARCH:
      return setPeople(state, action.users);
    case RESET_PEOPLE_SEARCH:
      return [];
    default:
      return state;
    }
}
