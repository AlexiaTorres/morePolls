import { SET_POLL, RESET_POLL, SET_VOTED_STATUS } from './action-types';
import { pushState } from 'redux-router';

export function registerListeners(params) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
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
    const userVotesRef = firebase.child(`userVotes/${auth.id}/${params.idPoll}`);
    userVotesRef.on('value', snap => {
      dispatch(snap.exists() ?
        {
          type: SET_VOTED_STATUS,
          status: true,
          entry: snap.val()
        } :
        {
          type: SET_VOTED_STATUS,
          status: false,
          entry: ''
        }
      );
    });
  };
}

export function unregisterListeners(params) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`polls/${params.idPoll}`).off();
    firebase.child(`userVotes/${auth.id}/${params.idPoll}`).off();
    dispatch({
      type: RESET_POLL
    });
   dispatch({
      type: SET_VOTED_STATUS,
      status: false,
      entry: ''
    });
  };
}
