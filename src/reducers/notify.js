import { SET_NOTIFICATIONS } from '../actions/notify';

function setNotifications(state, notifications) {
 return notifications.slice();
}

export default function notifyReducer(state = [], action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return setNotifications(state, action.notifications);
    default:
      return state;
  }
}
