import {
  SET_POLLS,
  ADD_POLL_ERROR,
  REMOVE_POLL_ERROR,
  POLL_STATES,
  SET_STATE_POLL_ERROR
} from './action-types';

import { createActionConfirmation } from '../confirm';

export function setPolls(polls) {
  return { type: SET_POLLS, polls };
}

export function addPoll(title) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const createdAt = Date.now();
    const newPollRef = firebase.child('polls')
      .push({ title, createdAt }, error => {
        if (error) {
          console.error('ERROR @ addPoll :', error); // eslint-disable-line no-console
          dispatch({
            type: ADD_POLL_ERROR,
            payload: error,
        });
      } else {
        const pollId = newPollRef.key();
        const userId = auth.id;
        firebase.child(`myPolls/${userId}/${pollId}`).set({ state: 'locked', createdAt });
      }
    });
  };
}

export function removePoll(pollId, pollTitle) {
  return (dispatch, getState) => {
    dispatch(createActionConfirmation(`Are you sure you want to delete de poll with title "${pollTitle}"?`, () => {
      const { firebase, auth } = getState();
      firebase.child(`polls/${pollId}`)
        .remove(error => {
          if (error) {
            console.error('ERROR @ removePoll :', error); // eslint-disable-line no-console
            dispatch({
              type: REMOVE_POLL_ERROR,
              payload: error,
            });
          } else {
            const userId = auth.id;
            firebase.child(`myPolls/${userId}/${pollId}`).remove();
          }
        });
    }));
  };
}

export function setNextState(idPoll, actualState) {
  const nextState = POLL_STATES[actualState];
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`myPolls/${auth.id}/${idPoll}`)
      .update({state: nextState}, error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: SET_STATE_POLL_ERROR,
            payload: error,
        });
      } else {
        firebase.child(`polls/${idPoll}`).update({state: nextState});
      }
    });
  };
}
