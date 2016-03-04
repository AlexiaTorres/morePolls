import { SET_WATCHED_POLLS } from '../actions/people';

function setWatchedPolls(state, watchedPolls) {
  return watchedPolls.slice();
}

export default function watchedPollReducer(state = [], action) {
  switch (action.type) {
    case SET_WATCHED_POLLS:
      return setWatchedPolls(state, action.watchedPolls);
    default:
      return state;
    }
}
