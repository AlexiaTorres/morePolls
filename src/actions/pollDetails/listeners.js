import { SET_POLL, RESET_POLL } from './action-types';
import { pushState } from 'redux-router';

export function registerListeners(params) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child(`polls/${params.idPoll}`);
    ref.on('value', snapshot => {
      const newPoll = snapshot.val();
      dispatch(snapshot.exists() ?
        {
          type: SET_POLL,
          poll: Object.assign({}, { id: params.idPoll }, newPoll)
        } :
        pushState(null, '/')
      );
    });
  };
}

export function unregisterListeners(params) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${params.idPoll}`).off();
    dispatch({
      type: RESET_POLL
    });
  };
}
