import { SET_NOTIFICATIONS } from './action-types';

export function registerListeners() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    if (auth.authenticated) {
      const userId = auth.id;
      const ref = firebase.child(`notifications/${userId}`);
      ref.on('value', snapshot => {
        const notifications = snapshot.val() !== null ? snapshot.val() : [];
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications
        });
      });
    } else {
      dispatch({
        type: SET_NOTIFICATIONS,
      });
    }
  };
}
