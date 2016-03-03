import { setUser } from './action-types';

export function registerListeners(id) {
	return (dispatch, getState) => {
		const { firebase } = getState();
  const ref = firebase.child(`users/${id}`);
  ref.on('value', snap => {
    const user = snap.val();
    dispatch(setUser(user));
  });
};
}

export function unregisterListeners(id) {
	return (dispatch, getState) => {
		const { firebase } = getState();
  const ref = firebase.child(`users/${id}`);
  ref.off();
  dispatch(setUser({}));
};
}
