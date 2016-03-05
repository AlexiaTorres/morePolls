import { SET_WATCHED_POLLS } from './action-types';

export function registerListeners(userId) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child(`myPolls/${userId}`);
    ref.on('value', myPollsSnapshot => {
      const promises = Object.keys(myPollsSnapshot.val() || []).map( pollId => new Promise(
        resolve => firebase.child(`polls/${pollId}`).once('value', snapshot => resolve({ id: pollId, title: snapshot.val().title, createdAt:snapshot.val().createdAt, state: myPollsSnapshot.val()[pollId].state } ))
      ));

      Promise.all(promises).then(function(watchedPolls) {
        dispatch({
          type: SET_WATCHED_POLLS,
          watchedPolls
        });
      });
    });

  };
}

export function unregisterListeners(userId) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child(`myPolls/${userId}`);
    ref.off();
    dispatch({
      type: SET_WATCHED_POLLS,
      watchedPolls: []
    });
  };
}
