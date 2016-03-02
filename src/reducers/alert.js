import { USER_EXISTS, WRONG_PASSWORD } from '../actions/auth';

  function setAlert(state, action) {
   return action.payload;
 }

 export default function alertReducer(state = '', action) {
    switch (action.type) {
      case USER_EXISTS:
        return setAlert(state, action);
      case WRONG_PASSWORD:
        return setAlert(state, action);
      default:
				return state;
    }
 }
