import { SET_POLL, RESET_POLL } from './action-types';
import { pushState } from 'redux-router';
import { addNotification } from '../notify/actions';

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

    ref.child('entries').orderByChild('createdAt').startAt(Date.now()).on('child_added', snapshot => {
      const newEntry = snapshot.val();
      addNotification(`Added new entry, "${newEntry.title}", to the poll "${params.idPoll}"`, snapshot.val().createdAt)(dispatch, getState);    });

    ref.child('entries').on('child_removed', snapshot => {
      const entry = snapshot.val();
      addNotification(`Entry removed: "${entry.title}"`, snapshot.val().createdAt)(dispatch, getState);    });

  };
}

export function unregisterListeners(params) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${params.idPoll}`).off();
    firebase.child(`polls/${params.idPoll}/entries`).off();
    dispatch({
      type: RESET_POLL
    });
  };
}
