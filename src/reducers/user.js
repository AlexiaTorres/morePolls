import { SET_USER } from '../actions/app/action-types';

const setUser = user => Object.assign({}, user);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return setUser(action.user);
    default:
      return state;
  }
}
