import { WRONG_PASSWORD } from '../actions/auth';

  function setLoginAlert(state, action) {
   return action.payload;
  }

 export default function alertReducer(state = '', action) {
    switch (action.type) {
      case WRONG_PASSWORD:
        return setLoginAlert(state, action);
      default:
				return state;
    }
 }
