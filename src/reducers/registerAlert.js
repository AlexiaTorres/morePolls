import { USER_EXISTS } from '../actions/auth';

 function setRegisterAlert(state, action) {
  return action.payload;
  }

 export default function alertReducer(state = '', action) {
    switch (action.type) {
      case USER_EXISTS:
        return setRegisterAlert(state, action);
      default:
				return state;
    }
 }
